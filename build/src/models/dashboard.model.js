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
    //add values to dashboard
    addDashboard(D) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'INSERT INTO dashboard (product_id, order_id) VALUES ($1, $2)';
                yield connect.query(sql, [D.product_id, D.order_id]);
                connect.release();
                return 'values was added';
            }
            catch (error) {
                throw new Error(`can't add values ${error}`);
            }
        });
    }
    retrieveDashboardData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `SELECT p.productname, p.product_price,
                         o.orderdate, o.order_status FROM products p JOIN dashboard d
                         ON p.productid = d.product_id JOIN orders o ON o.orderid = d.order_id`;
                const res = yield connect.query(sql);
                connect.release();
                return res.rows;
            }
            catch (error) {
                throw new Error(`can't retrieve data from dashboard ${error}`);
            }
        });
    }
}
exports.dashboardClass = dashboardClass;
