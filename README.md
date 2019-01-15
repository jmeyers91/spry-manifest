# spry-manifest

Utilities for creating and using [Spry](https://github.com/jmeyers91/spry-core) app manifest files.

## Install

```bash
npm install @simplej/spry-manifest
```

## API

`createManifest(root: string) -> Promise<Manifest>`

Takes project root path and resolves a manifest object for the project.

`hydrateManifest(root: string, manifest: Manifest) -> HydratedManifest`

Takes a project root path and a manifest object and returns a hydrated manifest with absolute file paths and loaded modules.

`manifestToOptions(manifest: HydratedManifest) -> SpryOptions`

Takes a hydrated manifest and returns an options object that can be passed to a Spry constructor.
