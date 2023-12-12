---
title: PHP Lando Plugin
description: Add a highly configurable php service to Lando for local development with all the power of Docker and Docker Compose; comes with composer, xdebug and multiple versions for lols.
next: ./config.html
---

# PHP

[PHP](http://php.net/) is a popular scripting language that is especially suited for web development. It is often served by either [apache](https://docs.lando.dev/config/apache.html) or [nginx](https://docs.lando.dev/config/nginx.html).

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config).

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
*   [custom](https://docs.lando.dev/config/services.html#advanced)

## Legacy versions

::: warning Using Unsupported PHP Versions!
While you can currently use some [EOL php version](http://php.net/supported-versions.php) with Lando, it's worth noting that we also do not support such versions, so your mileage may vary. If you are having issues with unsupported versions and open a ticket about it, the most likely response you will get is "upgrade to a supported version".
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

If you **really** need to lock down to a patch version, you could consider using either a [custom compose service](https://docs.lando.dev/compose) or a service [overrides](https://docs.lando.dev/config/services.html#overrides).

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/php
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/php
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/php" line to install a particular version eg
# npm install @lando/php@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:16-alpine sh -c \
  "npm init -y \
  && npm install @lando/php --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/php \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/php /plugins/@lando/php"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/php`. This command will also show you _where_ the plugin is being loaded from.
