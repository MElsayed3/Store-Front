import Client from '../database';
import envinfo from '../../envinfo';
import bcrypt from 'bcrypt';

export type Customer = {
  customerID?: number;
  customerName: string;
  customerEmail: string;
  customerPassword: string;
};

//function to encrypt the password
export const hash = (pass: string): string => {
  return bcrypt.hashSync(pass + envinfo.pepper, Number(envinfo.salt));
};

export class CustomerClass {
  //create a new customer function
  async createCustomer(
    C: Customer
  ): Promise<[string, string, string] | string> {
    try {
      const connect = await Client.connect();
      const sql = `INSERT INTO customer (customername, customeremail, customerpassword)
                         Values ($1, $2, $3)`;
      const result = await connect.query(sql, [
        C.customerName,
        C.customerEmail,
        hash(C.customerPassword),
      ]);
      connect.release();
      return [C.customerName, C.customerEmail, C.customerPassword];
    } catch (error) {
      throw new Error(`Could not create a new customer ${error}`);
    }
  }
  //retrieve all customers data function
  async retrieveCustomerData(): Promise<Customer[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM customer';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not retrieve all customer data ${error}`);
    }
  }

  //retrieve one customer function
  async retrieveOneCustomer(id: number) {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM customer WHERE customerid = $1';
      const result = await connect.query(sql, [id]);
      connect.release();
      if (result.rowCount > 0) {
        return result.rows[0];
      } else {
        return { statusCode: 401 };
      }
    } catch (error) {
      throw new Error(`The id you entered doesn't exist ${error}`);
    }
  }

  //update customer function
  async updataCustomerData(c: Customer): Promise<Customer> {
    try {
      const connect = await Client.connect();
      const sql = `UPDATE customer SET customername=$1, customeremail=$2, 
                        customerpassword=$3 
                        WHERE customerID=$4
                        RETURNING customerID, customername, customeremail`;
      const result = await connect.query(sql, [
        c.customerName,
        c.customerEmail,
        hash(c.customerPassword),
        c.customerID,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update customer data ${error}`);
    }
  }

  //delete one customer function
  async deleteCustomer(id: number): Promise<Customer> {
    try {
      const connect = await Client.connect();
      const sql = `DELETE FROM customer WHERE customerid = ($1) RETURNING 
            customerid, customername, customeremail`;
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't delete the customer ${error}`);
    }
  }

  async authenticate(email: string, password: string): Promise<object | null> {
    try {
      const connect = await Client.connect();
      const sql =
        'SELECT customerpassword FROM customer WHERE customeremail= $1';
      const result = await connect.query(sql, [email]);
      connect.release();
      if (result.rows.length) {
        const cust = await result.rows[0];
        if (
          bcrypt.compareSync(password + envinfo.pepper, cust.customerpassword)
        ) {
          return { customerEmail: email };
        }
      }
      return null;
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }
}
