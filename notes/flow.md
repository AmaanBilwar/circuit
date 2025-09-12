
# flow 

- user gives task 
- agent 1 prepares plan
- user accepts/declines plans
    - if user accepts: <br>
        agent 2 executes plans
    - else: 
        - what should change
- if user changes their mind, give an undo option

# how does it execute plans?
- search_web(query): Opens tab, executes search, collects snippets
- extract_content(url): Reads data from any open tab
- summarize_text(text): Uses Chrome Summarizer API
- translate_text(text, lang): Built-in translation
- fill_form(url, data): Automates routine web tasks
- take_action(action): Clicks, navigates, or triggers workflows

# what can it do (potentially)? 
- Opens new tab(s) and runs a Google search
- Visits the top links and extracts relevant article content
- Uses Chrome's built-in Summarizer or Gemini Nano to process/summarize the articles
- Returns the collected, summarized info back in the extension's UI, ready for user action (copy/share/save)
