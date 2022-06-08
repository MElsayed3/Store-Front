import database from '../database';
import { Customer } from '../models/customer.model';

const dbConnect = async (
  sqlCommand: string,
  arr: [number | string] | [],
  sqlCommandType: string
): Promise<Customer[]> => {
  const connect = await database.connect();
  const sql = sqlCommand;
  let resultRows;
  if (
    sqlCommandType === 'create' ||
    sqlCommandType === 'update' ||
    sqlCommandType === 'delete'
  ) {
    resultRows = await connect.query(sql, arr);
    connect.release();
    return resultRows.rows[0];
  } else {
    resultRows = await connect.query(sql);
    connect.release();
    return resultRows.rows;
  }
};

export default dbConnect;
