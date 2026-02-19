## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

* Fixed database client auto-detection for recipe-based services [#223](https://github.com/lando/php/pull/223)

## v1.10.0 - [February 18, 2026](https://github.com/lando/php/releases/tag/v1.10.0)

* Added database client auto-detection and version matching [#212](https://github.com/lando/php/pull/212)
* Added Docker image build status badge to README
* Added GD AVIF support verification for PHP 8.3+ [#219](https://github.com/lando/php/pull/219)
* Fixed composer install ordering to run before user build steps
* Fixed MariaDB wrapper script command names and test auto-detection [#212](https://github.com/lando/php/pull/212)
* Fixed typo in documentation
* Updated Docker image base version to Debian 13
* Updated Docker image tags from -6 to -7
* Updated Node.js 14.x to 20.x in test examples [#215](https://github.com/lando/php/pull/215)
* Updated `actions/cache` from 4 to 5
* Updated `actions/checkout` from 4 to 6

## v1.9.0 - [December 5, 2025](https://github.com/lando/php/releases/tag/v1.9.0)

* Added support for PHP 8.5
* Added Debian 13 (trixie) base images for PHP 8.3-8.5
* Changed PHP 7.4 and 8.0 images to use MariaDB `archive.mariadb.org` apt repository
* Fixed expired keys preventing stretch-based images from building

## v1.8.0 - [September 2, 2025](https://github.com/lando/php/releases/tag/v1.8.0)

* Removed automatic installation of `hirak/prestissimo` for `composer:1`
* Switched images to [bitnamilegacy](https://github.com/bitnami/containers/issues/83267) namespace
* Updated to [@lando/nginx@1.5.0](https://github.com/lando/nginx/releases/tag/v1.5.0)

## v1.7.1 - [January 15, 2025](https://github.com/lando/php/releases/tag/v1.7.1)

* Improved the `php` service builder to mount a unique scripts directory per service to prevent version conflicts.

## v1.7.0 - [January 8, 2025](https://github.com/lando/php/releases/tag/v1.7.0)

* Added logic to allow default `composer` version to be set based on PHP version.
* Added `2.2` and `2.2-latest` shorthand options to install the latest stable 2.2 LTS version of `composer`.
* Set default `composer` version to `2-latest`
* Set default `composer` version to `2.2-latest` for PHP 5.3-7.2
* Set default `composer` version to `1-latest` for PHP <= 5.2
* Removed `composer` installation from images to prefer installing during app build
* Fixed bug causing `composer` 2.2.x to be installed when `composer_version` was set to a single digit version such as `1`
* Fixed mismatched `libsqlite3-dev` and `libsqlite3-0` versions in PHP 8.3 and 8.4 images
* Fixed regression causing ImageMagick `convert` to not be available in images with `imagick` extension enabled

## v1.6.4 - [December 14, 2024](https://github.com/lando/php/releases/tag/v1.6.4)

* Fixed issue causing `xdebug` extension to not be disabled by default in PHP 8.3 and 8.4 images.
* Added `install-php-extensions` script to PHP 7.4-8.2 images.
* Added MariaDB client tools to PHP 7.4-8.4 images [#120](https://github.com/lando/php/issues/120).
* Added `xhprof` extension to PHP 7.4-8.4 images.
* Updated `sqlite3` to 3.45.1 in PHP 8.3-8.4 images.

## v1.6.3 - [December 7, 2024](https://github.com/lando/php/releases/tag/v1.6.3)

* Optimized for `midcore`

## v1.6.2 - [December 6, 2024](https://github.com/lando/php/releases/tag/v1.6.2)

* Updated PHP 8.1-8.3 base images to Debian 12 (bookworm).
* Added `install-php-extensions` script to PHP 8.3 and 8.4 images.
* Added `imagick` extension to PHP 8.3 and 8.4 images.
* Updated 8.4RC image to 8.4 stable.
* Added `xdebug` extension to PHP 8.4 images.
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


