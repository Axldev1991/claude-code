// scripts/bun-plugin-shims.ts
// Bun preload plugin — intercepts `bun:bundle` imports at runtime
// and resolves them to our local shim so the CLI can run without
// the production Bun bundler pass.

import { plugin } from 'bun'
import { resolve } from 'path'

plugin({
  name: 'bun-bundle-shim',
  setup(build) {
    const bundleShimPath = resolve(import.meta.dir, '../src/shims/bun-bundle.ts')
    const antStubPath = resolve(import.meta.dir, '../src/shims/ant-stub.ts')
    const mdStubPath = resolve(import.meta.dir, '../src/shims/md-stub.ts')
    const colorDiffStubPath = resolve(import.meta.dir, '../src/shims/color-diff-stub.ts')

    build.onResolve({ filter: /^bun:bundle$/ }, () => ({
      path: bundleShimPath,
    }))

    // Resolve @ant/* internal packages to our mock stub
    build.onResolve({ filter: /^@ant\// }, () => ({
      path: antStubPath,
    }))

    // Resolve all .md imports to our mock stub to fix missing Skill docs
    build.onResolve({ filter: /\.md$/ }, () => ({
      path: mdStubPath,
    }))

    // Use our TS mock for the native color-diff-napi module
    build.onResolve({ filter: /^color-diff-napi$/ }, () => ({
      path: colorDiffStubPath,
    }))
  },
})
