# Chinese Learning Platform

This repository is being initialized for a long-term production software project: a scalable Chinese learning platform.

The repository already contains a GitHub Pages portfolio site and several standalone utility pages at the root. Those existing static assets are being preserved. New production platform work will live under `platform/` until a future migration plan is approved.

## Current Phase

Project initialization only.

No application features, screens, services, learning flows, or business logic have been implemented yet.

## Project Goals

- Build a maintainable Chinese learning platform for learners, teachers, content editors, and administrators.
- Support structured learning content such as lessons, Hanzi, vocabulary, grammar, audio, assessments, and progress tracking.
- Keep product, engineering, infrastructure, operations, and documentation concerns clearly separated.
- Create a foundation that can grow into a multi-app, multi-service production system.

## Repository Layout

```text
.
|-- docs/                  Project documentation and architecture notes
|-- platform/              Future production Chinese learning platform
|   |-- apps/              User-facing and internal applications
|   |-- services/          Backend service boundaries
|   |-- packages/          Shared libraries and reusable platform modules
|   |-- content/           Learning content source material
|   |-- data/              Database, seed, import, and fixture planning
|   |-- infrastructure/    Deployment, environment, and observability planning
|   |-- scripts/           Project automation entry points
|   |-- tests/             Cross-project testing strategy and future suites
|   |-- design/            Product design, brand, research, and prototypes
|   |-- config/            Shared configuration templates
|   `-- tools/             Internal developer/content tools
|-- CONTRIBUTING.md        Collaboration guidelines
|-- CHANGELOG.md           Project change history
|-- TASKS.md               Project task tracker
|-- LICENSE                MIT license
`-- existing static pages   Current GitHub Pages portfolio and utilities
```

## Existing Repository State

The root currently hosts static pages such as `index.html`, `404.html`, `styles.css`, `script.js`, `assets/`, and multiple standalone utility directories. These have not been moved or changed during initialization.

## Documentation

Start with:

- `docs/README.md` for the documentation map.
- `docs/architecture/system-overview.md` for the initial architectural boundary.
- `docs/decisions/0001-repository-initialization.md` for the first architecture decision record.

## Development Status

Implementation will begin only after product scope, technical stack, and first milestone are confirmed.
