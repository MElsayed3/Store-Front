import envinfo from '../../envinfo';
import client from '../database';

export type Dashboard = {
  dash_id?: number;
  product_id: number;
  order_id: number;
};

export class dashboardClass {
  //add values to dashboard
  async addDashboard(D: Dashboard): Promise<string> {
    try {
      const connect = await client.connect();
      const sql =
        'INSERT INTO dashboard (product_id, order_id) VALUES ($1, $2)';
      await connect.query(sql, [D.product_id, D.order_id]);
      connect.release();
      return 'values was added';
    } catch (error) {
      throw new Error(`can't add values ${error}`);
    }
  }

  async retrieveDashboardData(): Promise<Dashboard[]> {
    try {
      const connect = await client.connect();
      const sql = `SELECT p.productname, p.product_price,
                         o.orderdate, o.order_status FROM products p JOIN dashboard d
                         ON p.productid = d.product_id JOIN orders o ON o.orderid = d.order_id`;
      const res = await connect.query(sql);
      connect.release();
      return res.rows;
    } catch (error) {
      throw new Error(`can't retrieve data from dashboard ${error}`);
    }
  }
}
