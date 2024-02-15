---
title: Configuration
description: Learn how to configure the Lando PHP service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/core/v3/lando-service.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/core/v3/lando-service.html#build-steps) and [overrides](https://docs.lando.dev/core/v3/lando-service.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: php:7.4
    via: apache:2.4
    ssl: false
    webroot: .
    xdebug: false
    composer: []
    composer_version: '2.2.12'
    # Below only valid for via: cli
    command: tail -f /dev/null
    config:
      php: SEE BELOW
      server: SEE BELOW
      vhosts: SEE BELOW
```

[[toc]]

## Choosing a server (or not)

By default, `php` services will be served by the default version of our [apache](https://docs.lando.dev/plugins/apache/) service but you can switch this to either `nginx` or `cli`.

Like with `apache`, `nginx` will use the the default version of our [nginx](https://docs.lando.dev/plugins/nginx/) service while `cli` will just spin up a `php` container without a web server. The latter is useful if you just want to work on a CLI utility or lock down what version `composer` runs with.

#### With Apache (default)

```yaml
services:
  myservice:
    type: php
    via: apache
```

#### With nginx

```yaml
services:
  myservice:
    type: php
    via: nginx
```

#### As CLI

```yaml
services:
  myservice:
    type: php
    via: cli
```

In CLI mode you can optionally tell the php cli service to boot up with an arbitrary command, this is good for php worker services like queues.

```yaml
services:
  myservice:
    type: php
    via: cli
    command: php /app/src/artisan horizon
```

## Choosing a webroot

By default Lando will serve the app from the root of your repo. If you'd like to serve your application from a different directory then use `webroot`.

```yaml
services:
  myservice:
    type: php
    via: nginx
    webroot: docroot
```

## Using xdebug

You can enable the `xdebug` extension by setting `xdebug: true` and doing a `lando rebuild`. When the extension is enabled Lando will automatically set the needed configuration for remote debugging. This means that `xdebug` _should_ be ready to receive connections out of the box.

If you are using `xdebug` version 3, which is installed by default for `php` 7.2+ you can optionally specify the mode.

```yaml
services:
  myservice:
    type: php:7.4
    xdebug: "debug,develop"
```

For this version of `xdebug` setting `xdebug: true` will set `xdebug.mode=debug`. You can read more about `xdebug.mode` [here](https://xdebug.org/docs/all_settings#mode).

### Configuring xdebug

If you'd like to override Lando's out of the box `xdebug` config the easiest way to do that is by setting the `XDEBUG_CONFIG` environment variable as a service level override.

```yaml
services:
  myservice:
    type: php:7.4
    xdebug: "debug,develop"
    overrides:
      environment:
        XDEBUG_CONFIG: "discover_client_host=0 client_host=localhost"
```

Note that you cannot set _every_ `xdebug` configuration option via `XDEBUG_CONFIG`, see [this](https://xdebug.org/docs/all_settings). If you need to configure something outside of the scope of `XDEBUG_CONFIG` we recommend you use a custom `php.ini`.

You can also modify or unset `XDEBUG_MODE` in a similar way. For example if you wanted to manage `xdebug.mode` in your own `php.ini` you could so something like

```yaml
services:
  myservice:
    type: php:7.4
    xdebug: true
    overrides:
      environment:
        XDEBUG_MODE:
    config:
      php: config/php.ini
```

### Setting up your IDE for XDEBUG

While Lando will handle the server side configuration for you, there is often a considerable amount of pain lurking in the client side configuration. To that end, some helpful info about a few popular clients is shown below:

**PHPStorm**

[Lando + PhpStorm + Xdebug](https://docs.lando.dev/guides/lando-phpstorm.html)

**VSCODE**

[Setup XDebug in Visual Studio Code Guide](https://docs.lando.dev/guides/lando-with-vscode.html)

### Troubleshooting Xdebug

::: tip Problems starting XDEBUG
If you are visiting your site and xdebug is not triggering, it might be worth appending `?XDEBUG_SESSION_START=LANDO` to your request and seeing if that does the trick.
:::

If you have set `xdebug: true` in your recipe or service config and run `lando rebuild` but are still having issues getting `xdebug` to work correctly, we recommend that you remove `xdebug: true`, run `lando rebuild` and then set the relevant `xdebug` config directly using a custom a `php.ini` (see examples above on how to set a custom config file). Your config file should minimally include something as shown below:

```yaml
xdebug.max_nesting_level = 256
xdebug.show_exception_trace = 0
xdebug.collect_params = 0
xdebug.remote_enable = 1
xdebug.remote_host = YOUR HOST IP ADDRESS
```

You can use `lando info --deep | grep IPAddress` to help discover the correct host ip address but please note that this can change and will likely differ from dev to dev.

## Installing composer

As of Lando `3.0.17` you can configure the version of `composer` you would like to install. This _should_ respect any of the versions listed on the [Composer download page](https://getcomposer.org/download/) but it is required you specify down to the patch version.

```yaml
services:
  myservice:
    type: php
    composer_version: "1.10.1"
```

You can also choose to ignore the `composer` install step by setting `composer_version: false`. This will use whatever version of `composer` was last bundled with our `php` image. The following "convenience flags" are also available:

```yaml
# Install the latest stable 1.x version
composer_version: 1
composer_version: 1-latest

# Install the latest stable 2.x version
composer_version: 2
composer_version: 2-latest

# Install latest pre-release version
composer_version: preview

# Install latest commit
composer_version: snapshot
```

## Installing global dependencies

You can also use the `composer` key if you need to require any [global composer dependenices](https://getcomposer.org/doc/03-cli.md#require). This follows the same syntax as your normal [`composer.json`](https://getcomposer.org/doc/01-basic-usage.md#composer-json-project-setup) except written as YAML instead of JSON.

::: tip Use composer.json if you can
While there are some legitimate use cases to globally install a composer dependency, it is almost always preferred to install using your applications normal `composer.json` and then running either `lando composer install` or alternatively setting up a [build step](https://docs.lando.dev/core/v3/lando-service.html#build-steps) that will automatically run before your app starts up.

Note that `lando composer` is not provided out of the box by the `php` service and needs to be manually added by configuring your app's [tooling](https://docs.lando.dev/core/v3/tooling.html).
:::

An example of globally installing `phpunit/phpunit` `^6.5` is shown below:

```yaml
services:
  myservice:
    type: php
    composer:
      phpunit/phpunit: ^6.5
```

An example of using a [build step](https://docs.lando.dev/core/v3/lando-service.html#build-steps) to automatically `composer install` your dependencies before your app starts is shown below:

```yaml
services:
  myservice:
    type: php
    build:
      - composer install
```

## Using custom config files

You may need to override our [default php config](https://github.com/lando/php/tree/main/builders) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache/) and [nginx](https://docs.lando.dev/plugins/nginx/) if you plan to use a custom `vhosts` or `server` config.

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
    type: php
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

Lando tooling is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/core/v3/tooling.html) of its cool features.

## Adding routing

By default a service will not do any proxy routing for you but you can add your own.

```yaml
proxy:
  myservice:
    - myapp.lndo.site
    - something.else.local
```

Lando proxying is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/core/v3/proxy.html) of its cool features.
