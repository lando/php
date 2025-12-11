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

### MySQL 8.4 client auto-detected for MySQL 8.4 database

```bash
lando exec php-mysql84 -- mysql --version | grep -q "mysql"
lando exec php-mysql84 -- mysql --version | grep -q "8.4"
lando exec php-mysql84 -- mysql --version | grep -qv "MariaDB"
```

### MySQL 8.0 client installed for MySQL 8.0 database

```bash
lando exec php-mysql80 -- mysql --version | grep -q "mysql"
lando exec php-mysql80 -- mysql --version | grep -q "8.0"
lando exec php-mysql80 -- mysql --version | grep -qv "MariaDB"
```

### MariaDB client with wrappers for MariaDB database

```bash
lando exec php-mariadb -- mariadb --version | grep -q "mariadb"
lando exec php-mariadb -- which mysql | grep -q "/usr/local/bin/mysql"
lando exec php-mariadb -- mysql --version | grep -q "mariadb"
```

### Explicit override works

```bash
lando exec php-override -- which mysql | grep -q "/usr/local/bin/mysql"
lando exec php-override -- mysql --version | grep -q "mariadb"
```

### Disabled db_client keeps image defaults

```bash
lando exec php-disabled -- which mysql | grep -q "/usr/bin/mysql"
```

### MySQL 8.4 client can connect to MySQL 8.4 database

```bash
lando exec php-mysql84 -- mysql -h mysql84 -u testuser -ptestpass testdb -e "SELECT 1"
```

### MySQL 8.0 client can connect to MySQL 8.0 database

```bash
lando exec php-mysql80 -- mysql -h mysql80 -u testuser -ptestpass testdb -e "SELECT 1"
```

### MariaDB client can connect without SSL errors (disable-ssl-verify-server-cert)

```bash
lando exec php-mariadb -- mysql -h mariadb -u testuser -ptestpass testdb -e "SELECT 1"
```

### mysqldump works without column-statistics errors (skip-column-statistics)

```bash
lando exec php-mysql84 -- mysqldump -h mysql84 -u testuser -ptestpass testdb --no-data 2>&1 | grep -qv "column-statistics"
```

### mysqldump works with MariaDB

```bash
lando exec php-mariadb -- mysqldump -h mariadb -u testuser -ptestpass testdb --no-data
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
