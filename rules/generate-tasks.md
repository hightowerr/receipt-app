---
description: 
globs: 
alwaysApply: false
---
# Streamlined PRD-to-Implementation Tool

## Goal
Guide AI in creating detailed implementation specifications from PRDs through automated analysis with interactive confirmation checkpoints.

## Process
1. **Analyze PRD:** Extract requirements, constraints, and success criteria
2. **Generate Structure:** Create high/mid-level objectives and implementation context
3. **Confirm with User:** Present structure and ask: *"Ready to generate detailed tasks? Respond with 'Go' to proceed."*
4. **Generate Tasks:** Create detailed low-level tasks with testing requirements
5. **Update Project Spec:** Maintain high-level project documentation

## Output Format
**Primary:** `/tasks/implementation-[prd-file-name].md`  
**Secondary:** `/project-specs/[project-name]-updated-spec.md`

```markdown
# Implementation: [Feature Name]
*From: [PRD filename] | Generated: [date]*

## High-Level Objective
[Overall business goal derived from PRD]

## Mid-Level Objectives
- [Concrete functional requirement with success criteria]
- [Another measurable requirement]
- [Continue as needed - typically 3-7 objectives]

## Implementation Notes
- **Technical Details:** [Algorithms, patterns, architectural approaches]
- **Dependencies:** [Libraries, frameworks, external services, prerequisites]
- **Standards:** [Coding conventions, documentation, testing requirements]
- **Constraints:** [Performance, security, accessibility requirements]

## Context
### Starting State
- **Relevant Files:** 
  - `path/to/file1.ts` - [Current purpose/functionality]
  - `path/to/file2.tsx` - [Current purpose/functionality]
- **Current Architecture:** [Brief description of existing relevant structure]

### Target State
- **Expected Files:**
  - `path/to/new-file.tsx` - [Intended purpose and functionality]
  - `path/to/modified-file.ts` - [Expected modifications]
- **Target Architecture:** [Expected structure after implementation]

## Low-Level Tasks
> Ordered implementation steps to fulfill Mid-Level Objectives

1. **[Task Description]**
   - **Action:** [Create File | Update Class | Add Method | Implement Logic]
   - **Target:** `file/path`, ClassName, methodName
   - **Details:** [Specific implementation requirements, parameters, logic]
- **Code:** [All code needed for easy copy and paste]
   - **Tests:** [Required test coverage for this task]

2. **[Next Task Description]**
   - **Action:** [Action type]
   - **Target:** [Specific targets]
   - **Details:** [Implementation specifics]
- **Code:** [All code or steps to complete]
   - **Tests:** [Testing requirements]

[Continue numbering tasks sequentially...]

## File Structure & Testing
**Implementation Files:**
- `path/to/component.tsx` - [Component description]
- `path/to/service.ts` - [Service/logic description]
- `path/to/utils.ts` - [Utilities description]

**Test Files:**
- `path/to/component.test.tsx` - Unit tests for component
- `path/to/service.test.ts` - Unit tests for service
- `__tests__/integration/feature.test.ts` - Integration tests

**Test Commands:**
- `npm test` - Run all tests
- `npx jest path/to/specific.test.ts` - Run specific test

## Acceptance Criteria
[Specific, measurable criteria from PRD for feature completion]

---
*Auto-generated specification. Updated: [timestamp]*
```

## AI Assistant Guidelines

### Analysis Requirements
- Extract all functional requirements and constraints from PRD
- Identify existing codebase patterns and integration points
- Determine appropriate testing strategy (unit, integration, e2e)

### Task Generation Rules
- Each task completable in 2-4 hours by junior developer
- Tasks ordered by logical dependencies
- Every task includes specific implementation details and test requirements
- All tasks trace back to PRD requirements

### Interactive Workflow
1. Present high/mid-level structure first
2. Wait for user "Go" confirmation
3. Generate detailed tasks only after confirmation
4. Update project specifications automatically
5. Validate output completeness before finalizing

### Quality Checks
- [ ] All PRD requirements addressed
- [ ] Tasks logically sequenced
- [ ] Test coverage comprehensive
- [ ] Implementation details actionable




- [ ] Project specs updated consistently