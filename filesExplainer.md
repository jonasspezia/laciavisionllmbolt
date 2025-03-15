# Project Files Structure

## Root Directory
- `App.tsx` 🟢 - Main application component that defines routing and global providers
- `main.tsx` 🟢 - Entry point of the application

## src/pages
- `Index.tsx` 🟢 - Landing page component
- `NotFound.tsx` 🔴 - 404 error page
- `PrivacyPolicy.tsx` 🔴 - Privacy policy page
- `TermsOfService.tsx` 🔴 - Terms of service page
- `Documents.tsx` 🔴 - Document management page
- `Sitemap.tsx` 🔴 - Site navigation structure page

### src/pages/auth
- `Login.tsx` 🟡 - User authentication login page
- `Signup.tsx` 🟡 - New user registration page
- `ResetPassword.tsx` 🔴 - Password recovery page
- `UpdatePassword.tsx` 🔴 - Password update page

### src/pages/dashboard
- `DashboardIndex.tsx` 🟡 - Main dashboard landing page
- `Videos.tsx` 🟡 - Video management interface
- `Analytics.tsx` 🟡 - Analytics and reporting interface
- `Checklists.tsx` 🟡 - Checklist management page
- `Settings.tsx` 🔴 - User and application settings

## src/components
### src/components/auth
- `ProtectedRoute.tsx` 🟢 - Authentication wrapper for protected routes
- `TermsDialog.tsx` 🔴 - Terms and conditions dialog component

### src/components/dashboard
- `DashboardSidebar.tsx` 🟢 - Main navigation sidebar for dashboard
- `DashboardCards.tsx` 🟡 - Dashboard statistics and info cards

### src/components/checklists
- `ChecklistForm.tsx` 🟡 - Form for creating/editing checklists
- `ChecklistFormFields.tsx` 🟡 - Form fields for checklist data
- `ChecklistCard.tsx` 🟡 - Individual checklist display card
- `ChecklistsList.tsx` 🟡 - List view of all checklists
- `DeleteChecklistDialog.tsx` 🔴 - Confirmation dialog for checklist deletion

### src/components/videos
- `VideoCard.tsx` 🟡 - Individual video display card
- `VideoDialog.tsx` 🟡 - Video playback dialog
- `VideoUploadButton.tsx` 🟡 - Button component for video uploads
- `ErrorDialog.tsx` 🔴 - Error message dialog for video operations

## src/hooks
- `useAuth.tsx` 🟢 - Authentication state management hook
- `useChecklists.ts` 🟡 - Checklist data management hook
- `useStats.tsx` 🟡 - Dashboard statistics hook
- `use-mobile.tsx` 🟡 - Mobile device detection hook
- `use-toast.ts` 🟡 - Toast notification management hook

## src/integrations
### src/integrations/supabase
- `client.ts` 🟢 - Supabase client configuration
- `types.ts` 🟢 - TypeScript types for Supabase schema

## src/types
- `supabase.d.ts` 🟢 - TypeScript definitions for Supabase models
- `checklist.ts` 🟡 - Checklist-related type definitions
- `evaluation.ts` 🟡 - Evaluation-related type definitions

## src/lib
- `utils.ts` 🟢 - Common utility functions used throughout the app

## src/components/ui
- `button.tsx` 🟢 - Reusable button component
- `sidebar.tsx` 🟢 - Generic sidebar component structure
- `toast.tsx` 🟢 - Toast notification component
- `dialog.tsx` 🟢 - Modal dialog component
- `form.tsx` 🟢 - Form component with validation
- `input.tsx` 🟢 - Input field component
- `select.tsx` 🟢 - Dropdown select component
- `loading.tsx` 🟡 - Loading spinner component
- `card.tsx` 🟡 - Card container component

Note: This hierarchy represents the main files in the project. The importance indicators (🟢, 🟡, 🔴) are based on the file's integration with other components and its role in the application's core functionality.
