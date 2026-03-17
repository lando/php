---
title: Configuration
description: Learn how to configure the Lando PHP service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/services/lando-3.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/services/lando-3.html#build-steps) and [overrides](https://docs.lando.dev/services/lando-3.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: php:7.4
    via: apache:2.4
    ssl: false
    webroot: .
    xdebug: false
    composer: []
    composer_version: '2'
    db_client: auto
    command: tail -f /dev/null
    config:
      php: SEE BELOW
      server: SEE BELOW
      vhosts: SEE BELOW
```

[[toc]]

## Choosing a server (or not)

By default, `php` services will be served by the default version of our [apache](https://docs.lando.dev/plugins/apache/index.html) service but you can switch this to either `nginx` or `cli`.

Like with `apache`, `nginx` will use the the default version of our [nginx](https://docs.lando.dev/plugins/nginx/index.html) service while `cli` will just spin up a `php` container without a web server. The latter is useful if you just want to work on a CLI utility or lock down what version `composer` runs with.

#### With Apache (default)

```yaml
services:
  myservice:
    type: php:8.4
    via: apache:2.4
```

#### With nginx

```yaml
services:
  myservice:
    type: php:8.4
    via: nginx:1.27
```

#### As CLI

```yaml
services:
  myservice:
    type: php:8.4
    via: cli
```

In CLI mode you can optionally tell the php cli service to boot up with an arbitrary command, this is good for php worker services like queues.

```yaml
services:
  myservice:
    type: php:8.4
    via: cli
    command: php /app/src/artisan horizon
```

## Choosing a webroot

By default Lando will serve the app from the root of your repo. If you'd like to serve your application from a different directory then use `webroot`.

```yaml
services:
  myservice:
    type: php:8.4
    via: nginx:1.27
    webroot: docroot
```

## Using Xdebug

Xdebug is pre-installed in all Lando PHP images but disabled by default for performance. You can enable it in several ways.

### Quick start

The simplest way to enable Xdebug is:

```yaml
services:
  myservice:
    type: php:8.4
    xdebug: true
```

This sets `xdebug.mode=debug` and configures Xdebug to connect back to your host machine automatically. Run `lando rebuild` after changing this setting.

You can also specify the [Xdebug mode](https://xdebug.org/docs/all_settings#mode) directly:

```yaml
services:
  myservice:
    type: php:8.4
    xdebug: "debug,develop"
```

### Toggling Xdebug without rebuilding

Xdebug adds overhead to every PHP request. Rather than leaving it on all the time, you can toggle it instantly:

```bash
# Enable step debugging
lando xdebug debug

# Enable debugging + development helpers
lando xdebug debug,develop

# Enable profiling
lando xdebug profile

# Disable Xdebug
lando xdebug off

# Check current status
lando xdebug
```

These commands take effect immediately — no rebuild required. They work by writing to an ini file and reloading the web server.

::: tip Performance tip
Set `xdebug: false` in your `.lando.yml` and use `lando xdebug debug` only when you need it. This gives you full speed by default and instant debugging when needed.
:::

### Advanced configuration

For fine-grained control, use the object format:

```yaml
services:
  myservice:
    type: php:8.4
    xdebug:
      mode: debug
      start_with_request: "yes"
      client_host: auto
      client_port: 9003
      log: /tmp/xdebug.log
      idekey: LANDO
      config:
        max_nesting_level: 256
```

| Option | Default | Description |
|--------|---------|-------------|
| `mode` | `off` | Xdebug mode(s). See [xdebug.mode](https://xdebug.org/docs/all_settings#mode). |
| `start_with_request` | `trigger` | When to start debugging. `trigger` requires a browser extension or `XDEBUG_SESSION` cookie. `yes` starts on every request. |
| `client_host` | `auto` | Host for Xdebug to connect to. `auto` uses `host.lando.internal` which works on all platforms including WSL2. |
| `client_port` | `9003` | Port your IDE listens on. |
| `log` | `/tmp/xdebug.log` | Log file path, or `false` to disable logging. |
| `idekey` | _(empty)_ | IDE key for filtering debug sessions. |
| `config` | `{}` | Pass-through for any [Xdebug setting](https://xdebug.org/docs/all_settings). Keys are prefixed with `xdebug.` automatically. |

All options are optional. Omitted keys use the defaults shown above.

::: tip Backward compatibility
The boolean (`true`/`false`) and string (`"debug,develop"`) formats continue to work exactly as before. The object format is additive.
:::

### Checking Xdebug configuration

You can view your Xdebug configuration in the `lando info` output:

```bash
lando info -s myservice --deep
```

This will show the current Xdebug mode, client host, client port, and other settings.

### Setting up your IDE

Lando configures Xdebug to connect to your host on port `9003` by default. Here's how to set up your IDE:

#### Visual Studio Code

Install the [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug) and add this to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "/app/": "${workspaceFolder}/"
      }
    }
  ]
}
```

#### PhpStorm

1. Go to **Settings → PHP → Debug** and set the Xdebug port to `9003`
2. Go to **Settings → PHP → Servers**, add a server named `appserver` (or your service name)
3. Set the host to your Lando app URL and map your project root to `/app`
4. Click **Start Listening for PHP Debug Connections** in the toolbar

See also: [Lando + PhpStorm + Xdebug Guide](https://docs.lando.dev/guides/lando-phpstorm.html)

### Using with a browser extension

When `start_with_request` is set to `trigger` (the default), you need a browser extension to activate Xdebug:

- **Chrome/Edge:** [Xdebug Helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc)
- **Firefox:** [Xdebug Helper](https://addons.mozilla.org/en-US/firefox/addon/xdebug-helper-for-firefox/)

Alternatively, append `?XDEBUG_SESSION_START=LANDO` to any URL to start a debug session.

If you prefer Xdebug to activate on every request without a browser extension:

```yaml
services:
  myservice:
    type: php:8.4
    xdebug:
      mode: debug
      start_with_request: "yes"
```

### Overriding via environment variables

You can still override Xdebug settings using environment variables if needed:

```yaml
services:
  myservice:
    type: php:8.4
    xdebug: true
    overrides:
      environment:
        XDEBUG_CONFIG: "discover_client_host=0 client_host=localhost"
```

Note that you cannot set _every_ Xdebug configuration option via `XDEBUG_CONFIG`. See the [Xdebug documentation](https://xdebug.org/docs/all_settings) for details. For full control, use the object config format above or a custom `php.ini`.

### Troubleshooting

**Xdebug not triggering?**
- Check that your IDE is listening on port `9003`
- Try `lando xdebug` to verify Xdebug is enabled and check the current mode
- Try appending `?XDEBUG_SESSION_START=LANDO` to your URL
- Check `/tmp/xdebug.log` inside the container for connection errors: `lando exec myservice -- cat /tmp/xdebug.log`

**Connection refused?**
- Lando uses `host.lando.internal` to connect back to your host. This should work on macOS, Linux, and WSL2.
- If you're on an unusual setup, try setting `client_host` explicitly in the config object.

**Slow performance?**
- Use `lando xdebug off` when you're not actively debugging.
- Or set `xdebug: false` in your Landofile and toggle with `lando xdebug debug` only when needed.

## Installing composer

Lando automatically installs the latest compatible version of Composer based on your specified PHP version:

- PHP >= 7.3: Composer 2.x
- PHP >= 5.3.2 and < 7.3: Composer 2.2 LTS
- PHP < 5.3.2: Composer 1.x

You can customize the Composer version by specifying either a specific version number or using a channel alias:

```yaml
services:
  myservice:
    type: php:8.2
    composer_version: "2.6.5"  # Install specific version
```

The following channel aliases are available:

```yaml
# Install the latest stable 1.x version
composer_version: 1
composer_version: 1-latest

# Install the latest stable 2.x version
composer_version: 2
composer_version: 2-latest

# Install the latest stable 2.2 LTS version
composer_version: 2.2
composer_version: 2.2-latest

# Install latest pre-release version
composer_version: preview

# Install latest commit
composer_version: snapshot
```

You can disable Composer installation entirely by setting `composer_version: false`.

## Installing global dependencies

You can also use the `composer` key if you need to require any [global composer dependencies](https://getcomposer.org/doc/03-cli.md#require). This follows the same syntax as your normal [`composer.json`](https://getcomposer.org/doc/01-basic-usage.md#composer-json-project-setup) except written as YAML instead of JSON.

::: tip Use composer.json if you can
While there are some legitimate use cases to globally install a composer dependency, it is almost always preferred to install using your applications normal `composer.json` and then running either `lando composer install` or alternatively setting up a [build step](https://docs.lando.dev/services/lando-3.html#build-steps) that will automatically run before your app starts up.

Note that `lando composer` is not provided out of the box by the `php` service and needs to be manually added by configuring your app's [tooling](https://docs.lando.dev/landofile/tooling.html).
:::

An example of globally installing `phpunit/phpunit` `^6.5` is shown below:

```yaml
services:
  myservice:
    type: php:8.4
    composer:
      phpunit/phpunit: ^6.5
```

An example of using a [build step](https://docs.lando.dev/services/lando-3.html#build-steps) to automatically `composer install` your dependencies before your app starts is shown below:

```yaml
services:
  myservice:
    type: php:8.4
    build:
      - composer install
```

## Using custom config files

You may need to override our [default PHP config](https://github.com/lando/php/blob/main/config/php.ini) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache/index.html) and [nginx](https://docs.lando.dev/plugins/nginx/index.html) if you plan to use a custom `vhosts` or `server` config.

If you set `via: cli` then, as you might suspect, `vhosts` and/or `server` is not going to do anything.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- default.conf
   |-- nginx.conf
   |-- php.ini
|-- index.php
|-- .lando.yml
```

**Landofile using custom php config**

```yaml
services:
  myservice:
    type: php:8.4
    config:
      php: config/php.ini
      server: config/nginx.conf
      vhosts: config/default.conf
```

## Adding tooling commands

By default a service will not do any tooling routing for you but you can add helpful `lando` commands.

```yaml
tooling:
  php:
    service: myservice
  composer:
    service: myservice
```

You can then invoke them on the command line.

```bash
lando php
lando composer
```

Lando tooling is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/landofile/tooling.html) of its cool features.

## Adding routing

By default a service will not do any proxy routing for you but you can add your own.

```yaml
proxy:
  myservice:
    - myapp.lndo.site
    - something.else.local
```

Lando proxying is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/landofile/proxy.html) of its cool features.

## Database client

For PHP 8.3+, Lando automatically detects MySQL or MariaDB services in your app and installs a compatible database client.

| Database Detected | Client Installed |
|-------------------|------------------|
| MySQL 5.7/8.0/8.4 | MySQL community client |
| MariaDB 10.x/11.x | MariaDB client with compatibility wrappers |
| None | Default mariadb-client from image |

### Automatic detection

When you have a MySQL or MariaDB service in your Landofile, the PHP service will automatically install the appropriate client:

```yaml
services:
  appserver:
    type: php:8.4
  database:
    type: mysql:8.4
```

### Manual override

You can explicitly set the database client using the `db_client` option:

```yaml
services:
  appserver:
    type: php:8.4
    db_client: mysql:8.0
```

```yaml
services:
  appserver:
    type: php:8.4
    db_client: mariadb:11.4
```

### Disabling auto-detection

To keep the default mariadb-client from the image without any modifications:

```yaml
services:
  appserver:
    type: php:8.4
    db_client: false
```

### Supported versions

| Type | Versions | Client Used |
|------|----------|-------------|
| MySQL | 8.3+ | MySQL 8.4 client |
| MySQL | 5.7, 8.0 | MySQL 8.0 client |
| MariaDB | 10.x, 11.x | MariaDB client with wrappers |

::: tip PHP version requirement
The `db_client` feature is only available for PHP 8.3 and newer. Older PHP versions will continue to use the default mariadb-client from the image.
:::

::: warning Multiple database services
If your app has both MySQL and MariaDB services, auto-detection will prioritize MariaDB. Set `db_client` explicitly if you need a specific client.
:::

## Advanced Image Configuration
Starting with version 6 of our Docker images (eg devwithlando/php:8.3-fpm-6), we now use Debian 13 (trixie) as the base image. If you need to use the previous Debian 12-based images, you can set the `suffix` option to `5` to use those older image versions (eg devwithlando/php:8.3-fpm-5):

```yaml
services:
  myservice:
    type: php:8.3
    suffix: 5
```

Most users will never need to modify this setting, as it's primarily useful when specific dependency versions from Debian 12 are required.
