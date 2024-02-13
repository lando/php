---
title: PHP Lando Plugin
description: Add a highly configurable php service to Lando for local development with all the power of Docker and Docker Compose; comes with composer, xdebug and multiple versions for lols.
next: ./config.html
---

# PHP

[PHP](https://www.php.net/) is a popular scripting language that is especially suited for web development. It is often served by either [apache](https://docs.lando.dev/plugins/apache/) or [nginx](https://docs.lando.dev/plugins/nginx/).

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/lando-service.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: php:8.0
    via: nginx
    webroot: www
```

## Supported versions

*   [8.3](https://hub.docker.com/r/devwithlando/php) (experimental)
*   [8.2](https://hub.docker.com/r/devwithlando/php)
*   [8.1](https://hub.docker.com/r/devwithlando/php)
*   [8.0](https://hub.docker.com/r/devwithlando/php)
*   **[7.4](https://hub.docker.com/r/devwithlando/php)** **(default)**
*   [7.3](https://hub.docker.com/r/devwithlando/php)
*   [custom](https://docs.lando.dev/core/v3/lando-service.html#overrides)

## Legacy versions

::: warning Using Unsupported PHP Versions!
While you can currently use some [EOL php version](https://www.php.net/supported-versions.php) with Lando, it's worth noting that we also do not support such versions, so your mileage may vary. If you are having issues with unsupported versions and open a ticket about it, the most likely response you will get is "upgrade to a supported version".
:::

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [7.2](https://hub.docker.com/r/devwithlando/php)
*   [7.1](https://hub.docker.com/r/devwithlando/php)
*   [7.0](https://hub.docker.com/r/devwithlando/php)
*   [5.6](https://hub.docker.com/r/devwithlando/php)
*   [5.5](https://hub.docker.com/r/devwithlando/php)
*   [5.4](https://hub.docker.com/r/devwithlando/php)
*   [5.3](https://hub.docker.com/r/devwithlando/php)

## Patch versions

Because we use our own custom images for `php`, specifying a patch version is not currently supported.

If you **really** need to lock down to a patch version, you could consider using either a [custom compose service](https://docs.lando.dev/plugins/compose) or a service [overrides](https://docs.lando.dev/core/v3/lando-service.html#overrides).

