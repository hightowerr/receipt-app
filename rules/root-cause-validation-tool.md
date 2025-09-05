---
description: 
globs: 
alwaysApply: false
---
## Goal

Isolate the most likely root causes of the problem, design lightweight instrumentation to confirm or refute them, and only then plan a fix.

## Workflow
1. **Ask the user for the project-spec file**
    *Ask user for the entire project-specs file to understand the project configuration. Read the spec file to give you context of the project before mmoving to step 2. Do not edit the document just read it.*

2. **Clarify First**
   *Read the Problem Context and list any missing facts that block analysis (e.g. logs, code paths, env-vars, deployment dates). Ask concise questions. Wait for answers before step 2.*

3. **Generate Hypotheses**
   *Give 5–7 plausible root causes that explain the symptoms.*

4. **Rank & Prune**
   *Keep the 1–2 causes best supported by evidence; create an evidence-for/against table.*

5. **Confirm with User**
   *Show the table and a short plan for validation. Ask:*
   **“Ready to add validation logs? Reply ‘Go’ or supply more info.”**
   *Pause until the user replies.*

6. **Add Validation Logs**
   *Output minimal code snippets/diffs (≤ 20 lines each) that collect the signals needed to prove or disprove the selected causes. Inline-comment every line.*

7. **Update Diagnostic Spec**
   *Create /diagnostics/hypotheses-\[context-name].md and /diagnostics/log-plans/\[context-name]-validation.md containing:*

   * High-level symptom
   * Hypotheses list
   * Evidence table
   * Selected causes
   * Validation plan and code snippets
   * Next steps and acceptance criteria

## Output Gates

* **Stage 2:** Hypotheses list
* **Stage 3:** Evidence table + validation plan
* **Stage 5:** Code snippets + spec files

Proceed to the next gate **only after user confirmation**.

## Quality Checklist

* [ ] All symptoms mapped to at least one hypothesis
* [ ] Clarifying questions asked before analysis when data is missing
* [ ] Evidence table complete and consistent
* [ ] Instrumentation minimal, with inline comments

* [ ] Spec files named and updated as per Output Gates