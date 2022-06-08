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
const orders_model_1 = require("../models/orders.model");
const server_1 = __importDefault(require("../server"));
const envinfo_1 = __importDefault(require("../../envinfo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const order = new orders_model_1.ordersClass();
describe('orders model tests', () => {
    it('expect the retrieveOrdersByCustomerID function to be defined', () => {
        expect(order.retrieveOrdersByCustomerID).toBeDefined();
    });
    it('expect the retrieveOrdersByCustomerID_Status function to be defined', () => {
        expect(order.retrieveOrdersByCustomerID_Status).toBeDefined();
    });
    it('expect the addOrder function to be defined', () => {
        expect(order.addOrder).toBeDefined();
    });
});
describe('Testing orders endpoints', () => {
    it('test retrieveOrdersByCustomerID returns product quantity is greater than 5000 and order status is complete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield order.retrieveOrdersByCustomerID(1).then((data) => {
            const row = Object.values(data)[0];
            const productQuantityKey = 'product_quantity';
            const orderStatusKey = 'order_status';
            expect(row[productQuantityKey]).toBeGreaterThan(5000);
            expect(row[orderStatusKey]).toEqual('complete');
        });
    }));
    it('test retrieveOrdersByCustomerID_Status returns product quantity is equal to 500 and customer id is 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const oneOrder = {
            customerID: 2,
            orderStatus: 'complete',
        };
        yield order.retrieveOrdersByCustomerID_Status(oneOrder).then((data) => {
            const row = Object.values(data)[0];
            const productQuantityKey = 'product_quantity';
            const customerIdKey = 'customerid';
            expect(row[productQuantityKey]).toEqual(500);
            expect(row[customerIdKey]).toEqual(2);
        });
    }));
});
const request = (0, supertest_1.default)(server_1.default);
//testing orders endpoints
describe('testing orders endpoints', () => {
    it(`testing retrieveOrdersByCustomerID expects product quantity equals to 5200
      and order status equal to complete`, () => __awaiter(void 0, void 0, void 0, function* () {
        const cust = {
            customerName: 'test150',
            customerEmail: 'test150@yahoo',
            customerPassword: '1234',
        };
        const token = jsonwebtoken_1.default.sign(cust, String(envinfo_1.default.token));
        const res = yield request
            .get('/orders/1')
            .set('content-type', 'application/json')
            .set('authorization', token);
        expect(res.body.data[0].product_quantity).toEqual(5200);
        expect(res.body.data[0].order_status).toBe('complete');
    }));
});
