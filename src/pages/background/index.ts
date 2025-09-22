console.log('background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  // Optional: set the default side panel page for all sites
  if (chrome.sidePanel && chrome.sidePanel.setOptions) {
    chrome.sidePanel.setOptions({ path: 'src/pages/panel/index.html', enabled: true })
      .then(() => console.log('[sidePanel] default setOptions applied'))
      .catch((e) => console.warn('[sidePanel] setOptions failed', e));
  }
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .then(() => console.log('[sidePanel] action click will open panel'))
      .catch((e) => console.warn('[sidePanel] setPanelBehavior failed', e));
  }
  chrome.commands.getAll?.((cmds) => console.log('[commands] registered:', cmds));
});

chrome.runtime.onStartup?.addListener(() => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .then(() => console.log('[sidePanel] action click will open panel (startup)'))
      .catch((e) => console.warn('[sidePanel] setPanelBehavior failed (startup)', e));
  }
  chrome.commands.getAll?.((cmds) => console.log('[commands] registered (startup):', cmds));
});

chrome.commands.onCommand.addListener(async (command) => {
  console.log('[commands] onCommand:', command);
  // We only define _execute_action now; treat any command as a trigger
  try {
    // Try to open for the current tab
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab && chrome.sidePanel && chrome.sidePanel.open) {
      // Ensure the panel is enabled and points to our page for this tab
      if (chrome.sidePanel.setOptions) {
        await chrome.sidePanel.setOptions({ tabId: activeTab.id, path: 'src/pages/panel/index.html', enabled: true });
      }
      console.log('[sidePanel] opening for tab', { tabId: activeTab.id, windowId: activeTab.windowId });
      await chrome.sidePanel.open({ tabId: activeTab.id, windowId: activeTab.windowId });
      return;
    }
  } catch (err) {
    console.warn('Failed to open side panel via API', err);
  }
  // Deliberately do not fall back to action popup; user expects right-hand side panel
});

// Fallback trigger: clicking the extension icon should also open the side panel
chrome.action.onClicked.addListener(async (tab) => {
  try {
    if (chrome.sidePanel?.setOptions) {
      await chrome.sidePanel.setOptions({ tabId: tab.id, path: 'src/pages/panel/index.html', enabled: true });
    }
    if (chrome.sidePanel?.open) {
      console.log('[sidePanel] opening via action click for tab', { tabId: tab.id, windowId: tab.windowId });
      await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId });
    }
  } catch (e) {
    console.warn('[sidePanel] action click open failed', e);
  }
});

// AI chat streaming over a Chrome Port
// Panel connects with name 'ai-chat' and sends { type: 'chat', id, messages }
// We stream deltas back as { type: 'delta' | 'start' | 'done' | 'error', ... }
import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'ai-chat') return;

  port.onMessage.addListener(async (msg) => {
    if (!msg || msg.type !== 'chat') return;
    const { id, messages } = msg as { id: string; messages: unknown[] };

    try {
      port.postMessage({ type: 'start', id });

      const result = streamText({
        model: google('gemini-2.5-flash'),
        messages: convertToModelMessages(messages as any),
      });

      // Stream token deltas
      for await (const delta of result.textStream) {
        // forward partial text chunks
        port.postMessage({ type: 'delta', id, delta });
      }

      // Final full text and any extras
      const fullText = await result.text;
      port.postMessage({ type: 'done', id, text: fullText });
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);
      port.postMessage({ type: 'error', id, error: errorText });
    }
  });
});
