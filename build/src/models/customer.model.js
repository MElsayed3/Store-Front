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
exports.CustomerClass = exports.hash = void 0;
const database_1 = __importDefault(require("../database"));
const envinfo_1 = __importDefault(require("../../envinfo"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//function to encrypt the password
const hash = (pass) => {
    return bcrypt_1.default.hashSync(pass + envinfo_1.default.pepper, Number(envinfo_1.default.salt));
};
exports.hash = hash;
class CustomerClass {
    //create a new customer function
    createCustomer(C) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `INSERT INTO customer (customername, customeremail, customerpassword)
                         Values ($1, $2, $3)`;
                const result = yield connect.query(sql, [
                    C.customerName,
                    C.customerEmail,
                    (0, exports.hash)(C.customerPassword),
                ]);
                connect.release();
                return [C.customerName, C.customerEmail, C.customerPassword];
            }
            catch (error) {
                throw new Error(`Could not create a new customer ${error}`);
            }
        });
    }
    //retrieve all customers data function
    retrieveCustomerData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM customer';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve all customer data ${error}`);
            }
        });
    }
    //retrieve one customer function
    retrieveOneCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM customer WHERE customerid = $1';
                const result = yield connect.query(sql, [id]);
                connect.release();
                if (result.rowCount > 0) {
                    return result.rows[0];
                }
                else {
                    return { statusCode: 401 };
                }
            }
            catch (error) {
                throw new Error(`The id you entered doesn't exist ${error}`);
            }
        });
    }
    //update customer function
    updataCustomerData(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `UPDATE customer SET customername=$1, customeremail=$2, 
                        customerpassword=$3 
                        WHERE customerID=$4
                        RETURNING customerID, customername, customeremail`;
                const result = yield connect.query(sql, [
                    c.customerName,
                    c.customerEmail,
                    (0, exports.hash)(c.customerPassword),
                    c.customerID,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update customer data ${error}`);
            }
        });
    }
    //delete one customer function
    deleteCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `DELETE FROM customer WHERE customerid = ($1) RETURNING 
            customerid, customername, customeremail`;
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can't delete the customer ${error}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT customerpassword FROM customer WHERE customeremail= $1';
                const result = yield connect.query(sql, [email]);
                connect.release();
                if (result.rows.length) {
                    const cust = yield result.rows[0];
                    if (bcrypt_1.default.compareSync(password + envinfo_1.default.pepper, cust.customerpassword)) {
                        return { customerEmail: email };
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(` ${error}`);
            }
        });
    }
}
exports.CustomerClass = CustomerClass;
