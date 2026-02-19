# Database Client Example

This example exists primarily to test database client configuration.

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# MySQL 8.4 client auto-detected for MySQL 8.4 database
lando exec php-mysql84 -- mysql --version | grep -q "mysql"
lando exec php-mysql84 -- mysql --version | grep -q "8.4"
lando exec php-mysql84 -- mysql --version | grep -qv "MariaDB"
```

```bash
# MySQL 8.0 client installed for MySQL 8.0 database
lando exec php-mysql80 -- mysql --version | grep -q "mysql"
lando exec php-mysql80 -- mysql --version | grep -q "8.0"
lando exec php-mysql80 -- mysql --version | grep -qv "MariaDB"
```

```bash
# MariaDB client with wrappers for MariaDB database
lando exec php-mariadb -- mariadb --version | grep -q "mariadb"
lando exec php-mariadb -- which mysql | grep -q "/usr/local/bin/mysql"
lando exec php-mariadb -- mysql --version | grep -q "mariadb"
```

```bash
# Explicit override works
lando exec php-override -- which mysql | grep -q "/usr/local/bin/mysql"
lando exec php-override -- mysql --version | grep -q "mariadb"
```

```bash
# Disabled db_client keeps image defaults
lando exec php-disabled -- which mysql | grep -q "/usr/bin/mysql"
```

```bash
# MySQL 8.4 client can connect to MySQL 8.4 database
lando exec php-mysql84 -- mysql -h mysql84 -u testuser -ptestpass testdb -e "SELECT 1"
```

```bash
# MySQL 8.0 client can connect to MySQL 8.0 database
lando exec php-mysql80 -- mysql -h mysql80 -u testuser -ptestpass testdb -e "SELECT 1"
```

```bash
# MariaDB client can connect without SSL errors (disable-ssl-verify-server-cert)
lando exec php-mariadb -- mysql -h mariadb -u testuser -ptestpass testdb -e "SELECT 1"
```

```bash
# mysqldump works without column-statistics errors (skip-column-statistics)
lando exec php-mysql84 -- mysqldump -h mysql84 -u testuser -ptestpass testdb --no-data 2>&1 | grep -qv "column-statistics"
```

```bash
# mysqldump works with MariaDB
lando exec php-mariadb -- mysqldump -h mariadb -u testuser -ptestpass testdb --no-data
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
