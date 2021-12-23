# Docs

This is the subdirectory responsible for creating the documentation site.

- `build.js`: Builds the site and moves it to `/docs/`.
- `helpers.js`: Contains some helper functions for fs operations
- `site-map.json`: Tells the build script how to build the docs site
  - `type: page` means that this file has to be injected into a template
  - `type: assets` means that this file/folder just has to be copied over
