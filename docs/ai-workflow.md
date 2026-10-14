# AI-Assisted Development Workflow

## Tools Used

- **Gemini** — UI/UX design mockups
- **Grok** — Frontend code generation from UI mockups
- **AI Coding Assistant** — Backend scaffolding, package selection, folder structure, patterns

## Where AI Was Used

| Area          | AI Role                                                | Human Role                                                       |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| UI Design     | Generated mockups from prompt                          | Reviewed, refined, approved                                      |
| Frontend      | Generated components from design                       | Fixed errors, added debounce for search, role-based rendering    |
| Backend       | Generated NestJS modules, TypeORM entities, migrations | Reviewed architecture, enforced PDF requirements                 |
| Auth          | Generated Passport strategies, JWT flow                | Verified HttpOnly cookies, disabled-user check, refresh rotation |
| Documentation | Generated initial drafts                               | Edited for accuracy and clarity                                  |

## How AI Output Was Reviewed

- All generated code was manually reviewed for security and correctness.
- Specific fixes made by human:
  - Added debounce for search input (AI omitted it)
  - Added role-based conditional rendering on frontend (AI forgot it)
  - Fixed TypeScript type conflicts in form schemas
  - Verified refresh token rotation and disabled-user handling
- Every AI-generated file was read line by line before committing.

## Prompts / Rules

- Project-specific instructions were given to the AI assistant:
  - Use Headless UI for all interactive components
  - Enforce authorization in NestJS, not just UI
  - Store TipTap JSON in jsonb, not HTML
  - Use HttpOnly cookies for tokens
  - Create schema only through migrations
- AI was instructed to reject unknown fields in DTOs and validate TipTap node types.

## Key Decisions Made by Human

- Chose Headless UI over shadcn/Radix (PDF explicitly required Headless UI)
- Chose Passport over manual JWT implementation
- Decided refresh logic in Route Handler + proxy.ts, not in client
- Rejected AI-generated color palette, chose warm orange-red + purple accent
- Enforced "last active owner" rule in both service and UI
