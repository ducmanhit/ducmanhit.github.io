# System Overview

## Current Repository Boundary

The repository currently contains an existing static GitHub Pages site at the root. The production Chinese Learning Platform will be developed inside `platform/` so the current public site remains stable while the new product is planned.

## Planned Platform Boundary

The future platform is organized as a production monorepo:

- `platform/apps/` for deployable applications.
- `platform/services/` for backend service boundaries.
- `platform/packages/` for shared libraries.
- `platform/content/` for learning material source files.
- `platform/data/` for database and import planning.
- `platform/infrastructure/` for deployment and environment planning.
- `platform/tests/` for test suites.
- `platform/design/` for design system, research, and prototypes.

## Initial Domain Areas

The platform is expected to support these domain areas:

- Learner experience.
- Teacher and content editor workflows.
- Curriculum, lesson, and exercise management.
- Hanzi, vocabulary, grammar, and pronunciation content.
- Assessment, review, and progress tracking.
- Identity, authorization, analytics, and notifications.

These are architectural placeholders only. No product features have been implemented.
