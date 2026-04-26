# Frontend Solution Notes

## Folder Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── submissions/
│   │   │   ├── SubmissionsFilters.tsx      # Filter controls
│   │   │   ├── SubmissionsList.tsx         # Submission cards + pagination
│   │   │   └── index.ts                    # Barrel export
│   │   ├── submission-detail/
│   │   │   ├── InfoItem.tsx                # Atom: label/value/sub with email icon
│   │   │   ├── SubmissionHeroCard.tsx      # Hero card: name, chips, 6-col info grid
│   │   │   ├── SubmissionContactsCard.tsx  # Contacts: 2-col grid, avatar, icons
│   │   │   ├── SubmissionDocumentsCard.tsx # Documents: bordered rows, docType chip
│   │   │   ├── SubmissionNotesSection.tsx  # Notes: 3-col grid, left-border accent
│   │   │   └── index.ts                    # Barrel export
│   │   └── ui/
│   │       ├── pagination/
│   │       │   ├── SubmissionsPagination.tsx
│   │       │   └── index.ts
│   │       ├── errors/
│   │       │   ├── ApiErrorState.tsx
│   │       │   ├── ValidationErrorSnackbar.tsx
│   │       │   └── index.ts
│   │       ├── skeletons/
│   │       │   ├── SubmissionCardSkeleton.tsx
│   │       │   ├── SubmissionDetailSkeleton.tsx
│   │       │   └── index.ts
│   │       └── index.ts                    # UI barrel export
│   ├── submissions/
│   │   ├── page.tsx                        # List page (filters + submissions)
│   │   └── [id]/
│   │       └── page.tsx                    # Detail page
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
│
├── lib/
│   ├── api-client.ts                       # Axios instance + helper functions
│   ├── types.ts                            # TypeScript interfaces (Broker, Submission, etc.)
│   ├── theme-types.ts                      # MUI theme augmentation: customShadows, customGradients, customBgColors
│   ├── hooks/
│   │   ├── useSubmissions.ts               # React Query for fetching submissions
│   │   └── useBrokerOptions.ts             # React Query for broker autocomplete
│   ├── utils/
│   │   ├── date-utils.ts                   # formatDateTime() - US locale date formatting
│   │   └── submission-utils.ts             # Status/priority helpers & color mappings
│   ├── constants/
│   │   └── pagination.ts                   # PAGINATION.PAGE_SIZE constant
│
├── .env.local                              # Local config (NEXT_PUBLIC_API_BASE_URL)
├── .env.example                            # Config template
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Module Descriptions

### Components: Submissions Domain

**SubmissionsFilters.tsx**
- All filter controls: status dropdown, broker autocomplete, company search, date range pickers, checkboxes
- Date range validation with error snackbar
- Memoized to prevent unnecessary re-renders

**SubmissionsList.tsx**
- Renders paginated submission cards
- Shows company info, status/priority chips, created date
- Memoized for performance
- Handles loading/error/empty states

### Components: Submission Detail

**InfoItem.tsx**
- Atom component: uppercase label, bold value, optional icon sub-line
- `sub` prop renders EmailIcon + caption text for broker email
- Used in the 6-column info grid inside `SubmissionHeroCard`

**SubmissionHeroCard.tsx**
- Premium hero card (Stripe/Linear aesthetic)
- Top section: `customGradients.heroHeader` background; company name (h5, fw700) + summary left; Status label + Chip, Priority label + Chip right
- Divider separates top from info strip
- Bottom: 6-column CSS grid (`1.5fr 1fr 1fr 1fr 0.75fr 0.75fr`): Broker, Owner, Industry, Head Quarter, Created, Updated
- `customBgColors.infoStrip` background on info strip; vertical dividers between items on md+
- Hover: `customShadows.cardElevated` → `customShadows.heroHover`

**SubmissionContactsCard.tsx**
- Header: "CONTACTS" overline + count Chip
- 2-column CSS grid of contact rows
- Each contact: `customGradients.avatar` circular Avatar, name (fw600), role (text.disabled), EmailIcon + email (primary.main), PhoneIcon + phone (text.secondary)
- Hover: `customShadows.card` → `customShadows.cardHover`

**SubmissionDocumentsCard.tsx**
- Header: "DOCUMENTS" overline + count Chip
- Each doc: bordered row with `customBgColors.documentHover` on hover; title as MuiLink, docType as `<Chip variant="outlined" size="small">`, upload date
- Hover: `customShadows.card` → `customShadows.cardHover`

**SubmissionNotesSection.tsx**
- Full-width card; header: NotesIcon + "NOTES" overline + count Chip
- 3-column grid (xs:12, md:6, lg:4)
- Each note: `3px solid primary.main` left-border accent, `customGradients.avatar` avatar, author + date, body text below Divider
- Note hover: `customShadows.noteHover`

### Components: UI (Reusable)

**SubmissionsPagination.tsx**
- Previous/Next buttons, page numbers, "Go to page" input
- Form validation for page input
- useMemo for page calculation efficiency

**ValidationErrorSnackbar.tsx**
- Reusable error notification component
- Props: open, onClose, message, severity, autoHideDuration
- Configured with 4-second auto-hide at bottom-left

**ApiErrorState.tsx**
- Generic error display component

**Loading Skeletons**
- `SubmissionCardSkeleton.tsx`: Mirrors real submission card layout.
- `SubmissionDetailSkeleton.tsx`: Mirrors real submission detail page.

### Pages

**submissions/page.tsx (List Page)**
- URL-based filter state management
- Integrates SubmissionsFilters + SubmissionsList
- Responsive grid layout

**submissions/[id]/page.tsx (Detail Page)**
- ~75 lines; assembles modular components: `SubmissionHeroCard`, `SubmissionContactsCard`, `SubmissionDocumentsCard`, `SubmissionNotesSection`
- React Query via `useSubmission` hook; shows `SubmissionDetailSkeleton` while loading
- Semantic back button, secure external links

### Theme Design Tokens

All design tokens are centralized in `lib/theme-types.ts` (type declarations) and `app/providers.tsx` (values). No hardcoded colors or shadows in components.

**`customShadows`**
| Token | Value |
|---|---|
| `card` | `0 1px 3px rgba(0,0,0,0.04)` |
| `cardElevated` | `0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)` |
| `cardHover` | `0 4px 12px rgba(0,0,0,0.07)` |
| `heroHover` | `0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)` |
| `noteHover` | `0 3px 12px rgba(0,0,0,0.07)` |

**`customGradients`**
| Token | Value |
|---|---|
| `heroHeader` | `linear-gradient(160deg, rgba(15,98,254,0.06) 0%, rgba(255,255,255,0) 60%)` |
| `avatar` | `linear-gradient(135deg, #0f62fe 0%, #0043ce 100%)` |

**`customBgColors`**
| Token | Value |
|---|---|
| `infoStrip` | `rgba(0,0,0,0.015)` |
| `documentHover` | `rgba(15,98,254,0.03)` |

Primary color: `#0f62fe` (IBM Blue), dark: `#0043ce`

### Data Management

**lib/hooks/useSubmissions.ts**
- React Query hook for fetching paginated submissions
- Includes filtering by status, broker, company, date range, documents/notes

**lib/hooks/useBrokerOptions.ts**
- React Query hook for broker autocomplete

**lib/api-client.ts**
- Axios instance configured with base URL
- Helper functions for API calls

### Type Definitions

**lib/types.ts**
- TypeScript interfaces: `Broker`, `Submission`, `SubmissionListItem`, `Contact`, `Document`, `Note`, `TeamMember`, etc.

**lib/theme-types.ts**
- MUI theme module augmentation — declares `CustomShadows`, `CustomGradients`, `CustomBgColors` interfaces
- Extends `Theme` and `ThemeOptions` so all tokens are fully typed via `useTheme()`

### Utilities

**lib/utils/date-utils.ts**
- `formatDateTime()` - Formats date as US locale string (e.g., "Apr 26, 2026")
- Centralized date formatting throughout app

**lib/utils/submission-utils.ts**
- `STATUS_OPTIONS` - Dropdown options for submission status filter
- `getStatusColor()` - Maps status to MUI color variant
- `getStatusLabel()` - Maps status value to display label
- `getPriorityColor()` - Maps priority to MUI color variant

**lib/constants/pagination.ts**
- `PAGINATION.PAGE_SIZE = 10` - Single source of truth for pagination config

### Configuration

**.env.local** (git-ignored)
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api`

**.env.example** (committed)
- Template showing required environment variables
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api`

## Key Features

- **State Management**: URL-driven filters (searchParams) + React Query caching
- **Performance**: React.memo on components, useMemo on calculations, 1000ms debounced search
- **Validation**: Date range validation, page input validation with error feedback
- **Null Safety**: Optional chaining (?.) and fallback values throughout
- **Layout**: Responsive grid (300px/flexible on lg+, stacked on smaller screens)
- **Consistency**: Centralized date formatting and pagination constants
- **Design System**: All shadows, gradients, and background colors centralized as typed MUI theme tokens — no hardcoded values in components
- **Modularization**: Detail page split into 5 focused components under `submission-detail/`; page.tsx reduced to ~75 lines
- **Skeleton Fidelity**: Both skeleton components (`SubmissionCardSkeleton`, `SubmissionDetailSkeleton`) structurally mirror their real counterparts
