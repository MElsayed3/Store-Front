"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsClass = void 0;
const database_1 = __importDefault(require("../database"));
class productsClass {
    //add new product function
    addProduct(P) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `INSERT INTO products 
            (productName, productQuantity, product_price, product_category) Values ($1, $2, $3, $4)`;
                const result = yield connect.query(sql, [
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
            }
            catch (error) {
                throw new Error(`Could not create a new customer ${error}`);
            }
        });
    }
    //retrieve all products data function
    retrieveProductsData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all products data ${error}`);
            }
        });
    }
    //retrieve one product function
    retrieveOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE productid = $1';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`The id you entered doesn't exist ${error}`);
            }
        });
    }
    //Top 5 most popular products
    retrieveTopPopularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `select p.productname, p.product_price from products p
            join orders o on p.productid = o.productid order by o.product_quantity desc limit 1`;
                const result = yield connect.query(sql);
                return result.rows;
            }
            catch (error) {
                throw new Error(`couldn't find top products ${error}`);
            }
        });
    }
    //update product function
    updateProductData(P) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `UPDATE products SET productname=$1, productquantity=$2,
                   product_price=$3, product_category=$4
                   WHERE productID=$5
                   RETURNING productid, productname, productquantity,
                   product_price, product_category`;
                const result = yield connect.query(sql, [
                    P.productName,
                    P.productQuantity,
                    P.productPrice,
                    P.productCategory,
                    P.productID,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update product data ${error}`);
            }
        });
    }
    //delete one product function
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `DELETE FROM products WHERE productid = ($1) RETURNING 
            productid, productname, productquantity, product_price, product_category`;
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can't delete the product ${error}`);
            }
        });
    }
}
exports.productsClass = productsClass;
