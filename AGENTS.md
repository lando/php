# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-09
**Commit:** 355c304
**Branch:** main

## OVERVIEW

Lando PHP plugin - provides PHP services (5.3-8.5) via nginx/apache/cli with composer, xdebug support. Part of @lando ecosystem.

## STRUCTURE

```
lando--php/
├── builders/         # Service builders (php.js = main logic)
├── config/           # PHP/nginx config templates
├── utils/            # Helper functions
├── examples/         # Version-specific test fixtures (php-*)
├── test/             # Unit tests (placeholder)
├── docs/             # Project documentation markdown files and associated Vitepress site
├── scripts/          # Helper scripts for build/install/etc
└── images/           # Docker image definitions for various PHP versions
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| PHP version logic | `builders/php.js` | LandoPhp class, version detection |
| Nginx wrapper | `builders/php-nginx.js` | Extends @lando/nginx |
| Composer install | `builders/php.js:getDefaultComposerVersion()` | Version auto-detection |
| Xdebug config | `builders/php.js:xdebugConfig()` | Per-version handling |
| PHP config templates | `config/*.conf.tpl` | EJS templates |
| Add CLI/build steps | `utils/add-build-step.js` | Front/back insertion |
| Install command gen | `utils/get-install-commands.js` | Package manager abstraction |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `LandoPhp` | class | builders/php.js:18 | Main service builder |
| `getDefaultComposerVersion` | fn | builders/php.js | Composer version detection |
| `nginxConfig` | fn | builders/php.js | Nginx service config |
| `xdebugConfig` | fn | builders/php.js | Xdebug version handling |
| `parseApache/Cli/Nginx` | fns | builders/php.js | Via-specific parsing |
| `addBuildStep` | fn | utils/add-build-step.js | Build step insertion |
| `getInstallCommands` | fn | utils/get-install-commands.js | Install command gen |
| `cloneOverrides` | fn | utils/clone-overrides.js | Deep clone sans image/build |

## CONVENTIONS

- **ESLint**: Google style, max-len 140, JSDoc required for functions
- **Images**: `devwithlando/php:{version}-{via}` format
- **Versions**: Supported 5.3-8.5, legacy removed at 8.x
- **Via options**: apache (default), nginx, cli
- **Composer**: v1 for PHP <7.2, v2 otherwise

## ANTI-PATTERNS

- Don't modify `index.js` - intentionally empty placeholder
- Don't add dependencies without checking @lando/nginx compatibility
- examples/* are test fixtures - structured identically per version

## COMMANDS

```bash
# Development
npm run lint              # ESLint check
npm run test:unit         # Mocha unit tests
npm run test:leia         # Leia integration tests

# Coverage
nyc covers: lib/, recipes/, services/, types/
```

## NOTES

- `plugin.yml` has `legacy: true` for Lando v3 compatibility
- Root `.lando.yml` is for docs site (vitepress), not plugin testing
- Test file `test/auth.spec.js` is placeholder ("should have tests")
- PHP config uses EJS templates (`.conf.tpl` extension)
