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
exports.deleteProduct = exports.updateProduct = exports.retrieveTopPopularProducts = exports.retrieveOneProduct = exports.retrieveProductsData = exports.addProduct = void 0;
const products_model_1 = require("../models/products.model");
//add one product
const product = new products_model_1.productsClass();
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.addProduct(req.body);
        res.json({
            statusCode: 201,
            data: req.body,
            result: result,
            message: 'product was added successflly',
        });
    }
    catch (error) {
        throw new Error(`can't add a new product ${error}`);
    }
});
exports.addProduct = addProduct;
//retrieve all products function
const retrieveProductsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.retrieveProductsData();
        res.json({
            data: result,
            message: 'Data was retrieved successfully',
        });
    }
    catch (error) {
        throw new Error(`can't retrieve all data ${error}`);
    }
});
exports.retrieveProductsData = retrieveProductsData;
//retrieve one product function
const retrieveOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.retrieveOneProduct(Number(req.params.id));
        res.json({
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        throw new Error(`can't find this product or id is invalid ${error}`);
    }
});
exports.retrieveOneProduct = retrieveOneProduct;
const retrieveTopPopularProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topData = yield product.retrieveTopPopularProducts();
        res.json({
            statuCode: 201,
            data: topData,
        });
    }
    catch (error) {
        throw new Error(`couldn't retrieve top products ${error}`);
    }
});
exports.retrieveTopPopularProducts = retrieveTopPopularProducts;
//update order function
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.updateProductData(req.body);
        res.json({
            statusCode: 201,
            data: result,
            message: 'updated successfully',
        });
    }
    catch (error) {
        throw new Error(`can't update the product ${error}`);
    }
});
exports.updateProduct = updateProduct;
//delete one product function
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.deleteProduct(Number(req.params.id));
        res.json({
            statusCode: 201,
            data: result,
            message: 'deleted successfully',
        });
    }
    catch (error) {
        throw new Error(`can't delete the product ${error}`);
    }
});
exports.deleteProduct = deleteProduct;
