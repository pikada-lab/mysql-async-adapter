const mysql = require('mysql')

/**
 * The adapter for working with the MySQL database through promises
 */
class MySQLAsyncAdapter {
    constructor(config) {
        this.config = config
        this.brockerCallBackError = null
        this.brokerCallBackQuery = null
    }

    /**
     * The function is intended for the message broker. 2 parameters come to the call back - error and request text.
     * @example db.setBrokerCallBackError((err, sql) => { redisClient.publish('docService.mysql.error', err.toString() + ' ' + sql) })
     * @param {Function} brockerCallBackError - Sends an error message  
     * @param {Function} brockerCallBackError - Sends an query message for metric or debag
     */
    setBrokerCallBackError(brockerCallBackError, brokerCallBackQuery) {
        this.brockerCallBackError = brockerCallBackError;
        this.brokerCallBackQuery = brokerCallBackQuery;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.db = mysql.createConnection(this.config)
            this.db.connect((err) => {
                if (err) {
                    console.log('[ ] MySQL session error')
                    if (typeof this.brockerCallBackError === "function") this.brockerCallBackError(err, "")
                    reject(new Error(err))
                } else {
                    console.log(`[*] MySQL session start  ${this.config.host}:${this.config.port}`)
                    this._reConnectEvent(this.config)
                    resolve(this)
                }
            })
        })
    }

    _reConnectEvent(config) {
        this.db.on('error', (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                setTimeout(() => { this.connect(config) }, 1000)
            } else {
                if (typeof this.brockerCallBackError === "function") this.brockerCallBackError(err, "")
                throw err
            }
        })
    }

    async query(sql, values) {
        return new Promise((resolve, reject) => {
            if (typeof this.brokerCallBackQuery === "function") this.brokerCallBackQuery(sql)
            this.db.query(sql, values, function(err, rows) {
                if (err) {
                    if (typeof this.brockerCallBackError === "function") this.brockerCallBackError(err, sql)
                    reject(new Error(err))
                } else {
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = MySQLAsyncAdapter