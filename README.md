# MySQL async adapter

The adapter for working with the MySQL database through promises

# Install

<code> 
npm install mysql-async-adapter
</code>

# Usage

<code> 
const MySQLAsyncAdapter = require('mysql-async-adapter')
</code>

---

The function Open is async.

<code>
this.db = await new MySQLAsyncAdapter({ ... }).open()
</code>

---

Use the following example to call a query to the database.

<code>
 const res = await this.mysql.query('SELECT 1 as id')
 assert(res[0].id == '1') 
</code>
