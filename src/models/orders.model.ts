import Client from '../database';

export type orders = {
  orderID?: number;
  orderDate: Date;
  customerID: number;

  productID: number;
  productQuantity: number;
  orderStatus: string;
};

export class ordersClass {
  async addOrder(o: orders): Promise<orders> {
    try {
      const connect = await Client.connect();
      const sql = `INSERT INTO orders
                        (orderdate, customerid, productid, product_quantity, order_status)
                        Values ($1, $2, $3, $4, $5)`;
      const result = await connect.query(sql, [
        o.orderDate,
        o.customerID,
        o.productID,
        o.productQuantity,
        o.orderStatus,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add a new order ${error}`);
    }
  }
  //retrieve ten orders data function
  async retrieveOrdersData(): Promise<orders[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM orders limit 10';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not retrieve all orders data ${error}`);
    }
  }

  //retrieve all orders data by customerID and order_status
  async retrieveOrdersByCustomerID_Status(o: orders): Promise<orders[]> {
    try {
      const connect = await Client.connect();
      const sql =
        'SELECT * FROM orders WHERE customerid =$1 AND order_status = $2';
      const result = await connect.query(sql, [o.customerID, o.orderStatus]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't retrieve the data ${error}`);
    }
  }

  //retrieve orders by a customerID function
  async retrieveOrdersByCustomerID(customerId: number): Promise<orders[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE customerid = $1';
      const result = await connect.query(sql, [customerId]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`The customer id you entered doesn't exist ${error}`);
    }
  }

  //update order function
  async updateOrderData(o: orders): Promise<orders> {
    try {
      const connect = await Client.connect();
      const sql = `UPDATE orders SET orderdate=$1, customerid=$2, productid=$3,
                        product_quantity=$4, order_status=$5
                        WHERE orderID=$6
                        RETURNING orderID, orderdate, customerID, productid, product_quantity, order_status`;
      const result = await connect.query(sql, [
        o.orderDate,
        o.customerID,
        o.productID,
        o.productQuantity,
        o.orderStatus,
        o.orderID,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update order data ${error}`);
    }
  }

  //delete one order function
  async deleteOrder(id: number): Promise<orders> {
    try {
      const connect = await Client.connect();
      const sql = `DELETE FROM orders WHERE orderid = ($1) RETURNING 
            orderid, orderdate, customerid`;
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't delete the order ${error}`);
    }
  }
}
