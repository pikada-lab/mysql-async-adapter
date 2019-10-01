# MySQL async adapter

The adapter for working with the MySQL database through promises

# Install

```
npm install mysql-async-adapter
```

# Usage

```
const MySQLAsyncAdapter = require('mysql-async-adapter')
```

---

The function Open is async.

```
this.db = await new MySQLAsyncAdapter({ ... }).open()
```

---

Use the following example to call a query to the database.

```
const res = await this.mysql.query('SELECT 1 as id')
assert(res[0].id == '1') 
```
