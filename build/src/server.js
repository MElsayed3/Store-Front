"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const orders_route_1 = __importDefault(require("./routes/orders.route"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/customer', customer_route_1.default);
app.use('/orders', orders_route_1.default);
app.use('/products', products_route_1.default);
app.use('/dashboard', dashboard_route_1.default);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
exports.default = app;
