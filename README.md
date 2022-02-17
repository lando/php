# PHP Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [PHP](https://php.net). When installed it...

* Allows users to run various `php` versions
* Serves applications over `nginx` or `apache`
* Runs in `cli` mode
* Comes with easy `composer` support

Of course, once a user is running their PHP project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `php` service to your Landofile

```yaml
services:
  myservice:
    type: php:8.0
    via: nginx
    webroot: www
```

For more info you should check out the [docs](https://docs.lando.dev/php):

* [Getting Started](https://docs.lando.dev/php/getting-started.html)
* [Configuration](https://docs.lando.dev/php/config.html)
* [Tooling](https://docs.lando.dev/php/tooling.html)
* [Syncing](https://docs.lando.dev/php/syncing.html)
* [Guides](https://docs.lando.dev/php/adding-more-tooling.html)
* [Examples](https://github.com/lando/php/tree/main/examples)
* [Development](https://docs.lando.dev/php/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/php/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/php/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/php/releases).

## Contributors

<a href="https://github.com/lando/php/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/php" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/php/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)
