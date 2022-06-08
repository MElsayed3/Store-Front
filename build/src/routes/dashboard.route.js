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
const dashboard_1 = require("../services/dashboard");
const express_1 = require("express");
const dashboard = new dashboard_1.dashboardClass();
const dashboardRouter = (0, express_1.Router)();
const addDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dashboard.addDashboard(req.body);
        res.json({
            message: 'dashboard added',
            data: req.body,
        });
    }
    catch (error) {
        throw new Error(`can't add a dashboard ${error}`);
    }
});
// const retrieveCustomerOrdersData = async (req: Request, res: Response) => {
//   try {
//     const result = await dashboard.retrieveCustomerOrdersData(
//       Number(req.params.id)
//     );
//     res.json({
//       statusCode: 201,
//       data: result,
//       message: 'Data was retrieved successfully',
//     });
//   } catch (error) {
//     throw new Error(`couldn't retrieve customer orders data ${error}`);
//   }
// };
const retrieveCutomerOrdersProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dashboard.retrieveCutomerOrdersProducts();
        res.json({
            statusCode: 201,
            data: result,
            message: 'retrieved successflly',
        });
    }
    catch (error) {
        throw new Error(`couldn't retrieve all data ${error}`);
    }
});
dashboardRouter
    .route('/')
    .get(retrieveCutomerOrdersProducts)
    .post(addDashboard);
exports.default = dashboardRouter;
