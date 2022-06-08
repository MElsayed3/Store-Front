import Client from '../database';

export type Dashboard = {
  dash_id?: number;
  product_id: number;
  order_id: number;
};

export class dashboardClass {
  async addDashboard(D: Dashboard): Promise<string> {
    try {
      const connect = await Client.connect();
      const sql =
        'INSERT INTO dashboard (product_id, order_id) VALUES ($1, $2)';
      await connect.query(sql, [D.product_id, D.order_id]);
      connect.release();
      return 'value was added';
    } catch (error) {
      throw new Error(`can't add values ${error}`);
    }
  }

  //returns data from customer and orders
  // async retrieveCustomerOrdersData(id: number): Promise<
  //   {
  //     custID: number;
  //     custName: string;
  //     custEmail: string;
  //     ordID: number;
  //     ordDate: Date;
  //   }[]
  // > {
  //   try {
  //     const connect = await Client.connect();
  //     const sql = `SELECT c.customerID, c.customerName, c.customerEmail,
  //            o.orderID, o.orderDate FROM
  //           customer as c JOIN orders as o
  //           ON c.customerID = o.customerID WHERE c.customerID=$1`;
  //     const result = await connect.query(sql, [id]);
  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`Please Enter a Valid ID ${error}`);
  //   }
  // }

  //returns data from customer, order and products all joined together
  async retrieveCutomerOrdersProducts(): Promise<
    {
      productName: string;
      productPrice: number;
      orderDate: Date;
      productQuantity: number;
      customerName: string;
    }[]
  > {
    try {
      const connect = await Client.connect();
      const sql = `SELECT c.customerName, p.productName, p.product_price, o.product_quantity, o.orderdate
                   FROM products p JOIN dashboard d
                   ON p.productid = d.product_id
                   JOIN orders o ON o.orderID = d.order_id
                   JOIN customer c ON c.customerID = o.customerID`;
      const result = await connect.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't retrieve all data ${error}`);
    }
  }
}
