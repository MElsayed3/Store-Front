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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.retrieveOrdersByCustomerID = exports.retrieveOrdersByCustomerID_Status = exports.retrieveOrdersData = exports.addOrder = void 0;
const orders_model_1 = require("../models/orders.model");
//add one order
const order = new orders_model_1.ordersClass();
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.addOrder(req.body);
        res.json({
            statusCode: 201,
            data: req.body,
            result: result,
            message: 'order was added successflly',
        });
    }
    catch (error) {
        throw new Error(`can't add a new order ${error}`);
    }
});
exports.addOrder = addOrder;
//retrieve all orders function
const retrieveOrdersData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.retrieveOrdersData();
        res.json({
            data: result,
            message: 'Data was retrieved successfully',
        });
    }
    catch (error) {
        throw new Error(`can't retrieve all data ${error}`);
    }
});
exports.retrieveOrdersData = retrieveOrdersData;
//retrieve orders by customerID and order_status
const retrieveOrdersByCustomerID_Status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.retrieveOrdersByCustomerID_Status(req.body);
        res.json({
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        throw new Error(`couldn't retrieve orders data ${error}`);
    }
});
exports.retrieveOrdersByCustomerID_Status = retrieveOrdersByCustomerID_Status;
//retrieve orders function
const retrieveOrdersByCustomerID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.retrieveOrdersByCustomerID(Number(req.params.id));
        res.json({
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        throw new Error(`can't find this order or id is invalid ${error}`);
    }
});
exports.retrieveOrdersByCustomerID = retrieveOrdersByCustomerID;
//update order function
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.updateOrderData(req.body);
        res.json({
            statusCode: 201,
            data: result,
            message: 'updated successfully',
        });
    }
    catch (error) {
        throw new Error(`can't update the order ${error}`);
    }
});
exports.updateOrder = updateOrder;
//delete one order function
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order.deleteOrder(Number(req.params.id));
        res.json({
            statusCode: 201,
            data: result,
            message: 'deleted successfully',
        });
    }
    catch (error) {
        throw new Error(`can't delete the order ${error}`);
    }
});
exports.deleteOrder = deleteOrder;
