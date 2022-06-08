import Client from '../database';

export type Products = {
  productID?: number;
  productName: string;
  productQuantity: number;

  productPrice: number;
  productCategory: string;
};

export class productsClass {
  //add new product function
  async addProduct(P: Products): Promise<[string, number, number, string]> {
    try {
      const connect = await Client.connect();
      const sql = `INSERT INTO products 
            (productName, productQuantity, product_price, product_category) Values ($1, $2, $3, $4)`;
      const result = await connect.query(sql, [
        P.productName,
        P.productQuantity,
        P.productPrice,
        P.productCategory,
      ]);
      connect.release();
      return [
        P.productName,
        P.productQuantity,
        P.productPrice,
        P.productCategory,
      ];
    } catch (error) {
      throw new Error(`Could not create a new customer ${error}`);
    }
  }

  //retrieve all products data function
  async retrieveProductsData(): Promise<Products[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not retrieve all products data ${error}`);
    }
  }

  //retrieve one product function
  async retrieveOneProduct(id: number): Promise<Products> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM products WHERE productid = $1';
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`The id you entered doesn't exist ${error}`);
    }
  }

  //Top 5 most popular products
  async retrieveTopPopularProducts(): Promise<Products[]> {
    try {
      const connect = await Client.connect();
      const sql = `select p.productname, p.product_price from products p
            join orders o on p.productid = o.productid order by o.product_quantity desc limit 1`;
      const result = await connect.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't find top products ${error}`);
    }
  }

  //update product function
  async updateProductData(P: Products): Promise<Products> {
    try {
      const connect = await Client.connect();
      const sql = `UPDATE products SET productname=$1, productquantity=$2,
                   product_price=$3, product_category=$4
                   WHERE productID=$5
                   RETURNING productid, productname, productquantity,
                   product_price, product_category`;
      const result = await connect.query(sql, [
        P.productName,
        P.productQuantity,
        P.productPrice,
        P.productCategory,
        P.productID,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product data ${error}`);
    }
  }

  //delete one product function
  async deleteProduct(id: number): Promise<Products> {
    try {
      const connect = await Client.connect();
      const sql = `DELETE FROM products WHERE productid = ($1) RETURNING 
            productid, productname, productquantity, product_price, product_category`;
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't delete the product ${error}`);
    }
  }
}
