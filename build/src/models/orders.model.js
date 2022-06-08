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
exports.ordersClass = void 0;
const database_1 = __importDefault(require("../database"));
class ordersClass {
    addOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `INSERT INTO orders
                        (orderdate, customerid, productid, product_quantity, order_status)
                        Values ($1, $2, $3, $4, $5)`;
                const result = yield connect.query(sql, [
                    o.orderDate,
                    o.customerID,
                    o.productID,
                    o.productQuantity,
                    o.orderStatus,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add a new order ${error}`);
            }
        });
    }
    //retrieve ten orders data function
    retrieveOrdersData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders limit 10';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all orders data ${error}`);
            }
        });
    }
    //retrieve all orders data by customerID and order_status
    retrieveOrdersByCustomerID_Status(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE customerid =$1 AND order_status = $2';
                const result = yield connect.query(sql, [o.customerID, o.orderStatus]);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`couldn't retrieve the data ${error}`);
            }
        });
    }
    //retrieve orders by a customerID function
    retrieveOrdersByCustomerID(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE customerid = $1';
                const result = yield connect.query(sql, [customerId]);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`The customer id you entered doesn't exist ${error}`);
            }
        });
    }
    //update order function
    updateOrderData(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `UPDATE orders SET orderdate=$1, customerid=$2, productid=$3,
                        product_quantity=$4, order_status=$5
                        WHERE orderID=$6
                        RETURNING orderID, orderdate, customerID, productid, product_quantity, order_status`;
                const result = yield connect.query(sql, [
                    o.orderDate,
                    o.customerID,
                    o.productID,
                    o.productQuantity,
                    o.orderStatus,
                    o.orderID,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update order data ${error}`);
            }
        });
    }
    //delete one order function
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `DELETE FROM orders WHERE orderid = ($1) RETURNING 
            orderid, orderdate, customerid`;
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can't delete the order ${error}`);
            }
        });
    }
}
exports.ordersClass = ordersClass;
