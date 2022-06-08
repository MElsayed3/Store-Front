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
exports.authenticate = exports.deleteCustomer = exports.updateCustomer = exports.retrieveOneCustomer = exports.retrieveCustomerData = exports.createCustomer = void 0;
const customer_model_1 = require("../models/customer.model");
const envinfo_1 = __importDefault(require("../../envinfo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer = new customer_model_1.CustomerClass();
//create customer function
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer.createCustomer(req.body);
        const token = jsonwebtoken_1.default.sign(req.body, String(envinfo_1.default.token));
        res.json({
            status: 'success',
            data: req.body,
            result: result,
            message: 'customer created successfully',
            token: token,
        });
    }
    catch (error) {
        throw new Error(`can't add a customer ${error}`);
    }
});
exports.createCustomer = createCustomer;
//retrieve all customers function
const retrieveCustomerData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer.retrieveCustomerData();
        res.json({
            data: result,
            message: 'Data was retrieved successfully',
        });
    }
    catch (error) {
        throw new Error(`can't retrieve all data ${error}`);
    }
});
exports.retrieveCustomerData = retrieveCustomerData;
//retrieve one customer function
const retrieveOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer.retrieveOneCustomer(Number(req.params.id));
        if (result.statusCode === 401) {
            res.json({
                statusCode: result.statusCode,
                warningMessage: `oops!!this id doesn't exist 
                please enter a valid customer id`,
            });
        }
        else {
            res.json({
                statusCode: 201,
                data: result,
            });
        }
    }
    catch (error) {
        throw new Error(`can't find this customer or id is invalid ${error}`);
    }
});
exports.retrieveOneCustomer = retrieveOneCustomer;
//update customer function
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer.updataCustomerData(req.body);
        res.json({
            statusCode: 201,
            data: result,
            message: 'updated successfully',
        });
    }
    catch (error) {
        throw new Error(`can't update the customer ${error}`);
    }
});
exports.updateCustomer = updateCustomer;
//delete one customer function
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer.deleteCustomer(Number(req.params.id));
        res.json({
            statusCode: 201,
            data: result,
            message: 'deleted successfully',
        });
    }
    catch (error) {
        throw new Error(`can't delete the customer ${error}`);
    }
});
exports.deleteCustomer = deleteCustomer;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail, customerPassword } = req.body;
        const result = yield customer.authenticate(customerEmail, customerPassword);
        if (result !== null) {
            res.status(201).json({
                message: `Welcome ${customerEmail}`,
                data: result,
            });
        }
        else {
            res.json({
                message: 'please enter a valid email and password',
                data: result,
            });
        }
    }
    catch (error) {
        throw new Error(`something went wrong ${error}`);
    }
});
exports.authenticate = authenticate;
