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
const customer_model_1 = require("../models/customer.model");
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const customer = new customer_model_1.CustomerClass();
describe('customer model tests', () => {
    it('expect the createCustomer function to be defined', () => {
        expect(customer.createCustomer).toBeDefined();
    });
    it('expect the retrieveCustomerData function to be defined', () => {
        expect(customer.retrieveCustomerData).toBeDefined();
    });
    it('expect the retrieveOneCustomer function to be defined', () => {
        expect(customer.retrieveOneCustomer).toBeDefined();
    });
});
const cust = {
    customerName: 'test150',
    customerEmail: 'test150@yahoo',
    customerPassword: '1234',
};
describe('Testing customer functions createCustomer, authenticate, retrieveCustomerData retrieveOneCustomer', () => {
    it('Testing createCustomer returns customerEmail test150@yahoo', () => __awaiter(void 0, void 0, void 0, function* () {
        yield customer.createCustomer(cust).then((data) => {
            expect(data[1]).toBe(cust.customerEmail);
        });
    }));
    it('expects customer email to equal test150@yahoo', () => __awaiter(void 0, void 0, void 0, function* () {
        yield customer.authenticate('test150@yahoo', '1234').then((data) => {
            const email = Object.values(data)[0];
            expect(email).toBe('test150@yahoo');
        });
    }));
    it('expect a value of first row from retrieveCustomerData to be 1,test1,test1@yahoo,1234', () => __awaiter(void 0, void 0, void 0, function* () {
        yield customer.retrieveCustomerData().then((data) => {
            const firstRow = Object.values(data[0]);
            expect(firstRow).toEqual([1, 'test1', 'test1@yahoo', '1234']);
        });
    }));
    it('expect to return customer name test1 from retrieveOneCustomer function', () => __awaiter(void 0, void 0, void 0, function* () {
        yield customer.retrieveOneCustomer(1).then((mydata) => {
            const row = Object.values(mydata);
            expect(row[1]).toEqual('test1');
        });
    }));
});
const request = (0, supertest_1.default)(server_1.default);
let tokenStr = '';
//testing endpoints
describe('Testing customer endpoints', () => {
    it('testing createCustomer endpoint function expects status to equal to 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/customer')
            .set('Content-type', 'application/json')
            .set('Authorization', tokenStr)
            .send(cust);
        tokenStr = yield result.body.token;
        expect(result.status).toEqual(200);
    }));
    it(`testing authenticate endpoint 
        function expects to return customerEmail test150@yahoo`, () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/customer/auth')
            .set('Content-type', 'application/json')
            .set('Authorization', tokenStr)
            .send(cust);
        expect(result.status).toEqual(201);
        expect(result.body.data.customerEmail).toEqual(cust.customerEmail);
    }));
    it(`testing retrieveCustomerData endpoint function 
        expects the message equals to Data was retrieved 
        successfully and customeremail equals to test1@yahoo`, () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .get('/customer')
            .set('Content-type', 'application/json')
            .set('Authorization', tokenStr);
        expect(result.body.message).toEqual('Data was retrieved successfully');
        expect(result.body.data[0].customeremail).toEqual('test1@yahoo');
    }));
    it(`testing retrieveOneCustomer endpoint function 
        expects the email to equal to test150@yahoo and the status to equal to 201`, () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/customer/4')
            .set('Content-type', 'application/json')
            .set('Authorization', tokenStr);
        expect(res.status).toEqual(200);
        expect(res.body.data.customeremail).toEqual(cust.customerEmail);
    }));
});
