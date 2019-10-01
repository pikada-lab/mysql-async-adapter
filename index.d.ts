/**
 * The adapter for working with the MySQL database through promises
 */
export default class MySQLAsyncAdapter {
  /**
   * Create new adapter
   * @param config
   */
  constructor(config: {
    host: string;
    port?: number;
    user: string;
    password: string;
    database: string;
  });

  /**
   * The function is intended for the message broker. 2 parameters come to the call back - error and request text.
   * @example db.setBrokerCallBackError((err, sql) => { redisClient.publish('docService.mysql.error', err.toString() + ' ' + sql) })
   * @param {Function} brockerCallBackError - Sends an error message
   * @param {Function} brockerCallBackError - Sends an query message for metric or debag
   */
  setBrokerCallBackError(
    brockerCallBackError: Function,
    brokerCallBackQuery: Function
  );

  connect(): Promise<MySQLAsyncAdapter>;
  query<T>(sql, values): Promise<T[]>;
  query(sql, values): Promise<any[]>;

  state(): Promise<'connected' | 'authenticated' | 'disconnected' | 'protocol_error' | string>;
  disconnect(): void;
}
