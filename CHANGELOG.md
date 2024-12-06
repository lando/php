## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

* Updated the version index.md to get Docuverse page to build correctly.

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.24](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.24).
* Updated GitHub Actions to build images only on changes to images or workflows.

## v1.6.1 - [November 4, 2024](https://github.com/lando/php/releases/tag/v1.6.1)

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.18](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.18).

## v1.6.0 - [October 25, 2024](https://github.com/lando/php/releases/tag/v1.6.0)

* Updated release process to generate an edge release when stable releases are created.

## v1.5.0 - [October 18, 2024](https://github.com/lando/php/releases/tag/v1.5.0)

* Added preliminary support for PHP 8.4RC2

## v1.4.0 - [October 17, 2024](https://github.com/lando/php/releases/tag/v1.4.0)

* Fixed bug causing `CA` and `certs` to not be appropriately installed in the `appserver` when using `nginx`
* Updated to [@lando/nginx@1.3.0](https://github.com/lando/nginx/releases/tag/v1.3.0) [#131](https://github.com/lando/php/issues/131)
* Updated all images `>=5.6` to `gen4`

## v1.3.0 - [March 8, 2024](https://github.com/lando/php/releases/tag/v1.3.0)

* Updated to latest database services.

## v1.2.0 - [February 16, 2024](https://github.com/lando/php/releases/tag/v1.2.0)

* Get PHP image builds working to make PHP 8.3 images available. **Note Imagick is [temporarily unavailable](https://github.com/Imagick/imagick/pull/641)!**
* Stable version of xdebug for PHP 8.3. [#91](https://github.com/lando/php/pull/91)

## v1.1.0 - [January 29, 2024](https://github.com/lando/php/releases/tag/v1.1.0)

* Add support for PHP 8.3. [#77](https://github.com/lando/php/issues/77)

## v1.0.0 - [December 7, 2023](https://github.com/lando/php/releases/tag/v1.0.0)

* Dialed fully for `lando update`

## v0.10.2 - [November 28, 2023](https://github.com/lando/php/releases/tag/v0.10.2)

* Added option to override the image powering the service.
* Removed apparmor step from image building.

## v0.10.1 - [November 27, 2023](https://github.com/lando/php/releases/tag/v0.10.1)

* Removed relative references to dependencies.
* Added nginxServiceType option so other services can override the default `php-nginx` service with their own.

## v0.10.0 - [November 21, 2023](https://github.com/lando/php/releases/tag/v0.10.0)

* Removed MultiViews from Apache config. [#66](https://github.com/lando/php/issues/66)
* Isolated PHP to work as a standalone service. [#78](https://github.com/lando/php/pull/78)

## v0.9.0 - [July 3, 2023](https://github.com/lando/php/releases/tag/v0.9.0)

* Removed bundle-dependencies and version-bump-prompt from plugin.
* Updated package to use prepare-release-action.
* Updated documentation to reflect new release process.

## v0.8.0 - [April 17th, 2023](https://github.com/lando/php/releases/tag/v0.8.0)

* Bumped Redis plugin to redis-5.3.7. [#57](https://github.com/lando/php/pull/57)

## v0.7.1 - [January 6th, 2023](https://github.com/lando/php/releases/tag/v0.7.1)

* Added support for PHP 8.2 [#51](https://github.com/lando/php/pull/51)

## v0.7.0 - [December 12, 2022](https://github.com/lando/php/releases/tag/v0.7.0)

* Added bundle-dependencies to release process.
* Fixed bug in plugin dogfooding test.

## v0.6.0 - [September 7, 2022](https://github.com/lando/php/releases/tag/v0.6.0)

* HYPERDRIVED

## v0.5.4 - [April 21, 2022](https://github.com/lando/php/releases/tag/v0.5.4)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Clean up unused dependencies

## v0.5.3 - [April 19, 2022](https://github.com/lando/php/releases/tag/v0.5.3)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Update default composer version (Addresses [CVE-2022-24828](https://blog.packagist.com/cve-2022-24828-composer-command-injection-vulnerability/)) [PR #33](https://github.com/lando/php/pull/33)

## v0.5.2 - [March 2, 2022](https://github.com/lando/php/releases/tag/v0.5.2)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Update php 7.4+ to Composer 2.2.6 [PR #25](https://github.com/lando/php/pull/25)

## v0.5.1 - [February 2, 2022](https://github.com/lando/php/releases/tag/v0.5.1)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Add the no-interaction flag to composer global require commands [#19](https://github.com/lando/php/issues/19)

## v0.5.0 - [November 9, 2021](https://github.com/lando/php/releases/tag/v0.5.0)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Initial Release


