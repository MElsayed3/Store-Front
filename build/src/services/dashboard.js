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
exports.dashboardClass = void 0;
const database_1 = __importDefault(require("../database"));
class dashboardClass {
    addDashboard(D) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'INSERT INTO dashboard (product_id, order_id) VALUES ($1, $2)';
                yield connect.query(sql, [D.product_id, D.order_id]);
                connect.release();
                return 'value was added';
            }
            catch (error) {
                throw new Error(`can't add values ${error}`);
            }
        });
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
    retrieveCutomerOrdersProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `SELECT c.customerName, p.productName, p.product_price, o.product_quantity, o.orderdate
                   FROM products p JOIN dashboard d
                   ON p.productid = d.product_id
                   JOIN orders o ON o.orderID = d.order_id
                   JOIN customer c ON c.customerID = o.customerID`;
                const result = yield connect.query(sql);
                return result.rows;
            }
            catch (error) {
                throw new Error(`couldn't retrieve all data ${error}`);
            }
        });
    }
}
exports.dashboardClass = dashboardClass;
