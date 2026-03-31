#!/bin/bash
export PATH="$HOME/.bun/bin:$PATH"
cd /home/axel-lenovo/Escritorio/claude-code
bun --preload ./scripts/bun-plugin-shims.ts src/entrypoints/cli.tsx "$@"
