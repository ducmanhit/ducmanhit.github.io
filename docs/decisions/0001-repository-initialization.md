# 0001: Repository Initialization

## Status

Accepted

## Context

The repository already contains a live static GitHub Pages portfolio and several standalone utility pages at the root. The new Chinese Learning Platform needs a scalable foundation without disrupting the existing site.

## Decision

Initialize the production platform inside `platform/` and keep documentation at the repository root in `docs/`.

The root static pages remain untouched. Future implementation work should happen inside `platform/` unless a migration task explicitly changes the repository boundary.

## Consequences

- Existing public pages remain stable.
- New platform work has a clear namespace.
- Future apps, services, shared packages, learning content, tests, and infrastructure can grow without colliding with legacy static pages.
- A later migration can decide whether the platform becomes the primary root application.
