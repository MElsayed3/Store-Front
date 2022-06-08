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
exports.retrieveDashboardData = exports.addDashboard = void 0;
const dashboard_model_1 = require("../models/dashboard.model");
const dash = new dashboard_model_1.dashboardClass();
const addDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dash.addDashboard(req.body);
        res.json({
            message: 'dashboard added',
            data: req.body
        });
    }
    catch (error) {
        throw new Error(`can't add a dashboard ${error}`);
    }
});
exports.addDashboard = addDashboard;
const retrieveDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dash.retrieveDashboardData();
        res.json({
            data: result,
            message: 'Data was retrieved successfully'
        });
    }
    catch (error) {
        throw new Error(`can't retrieve data ${error}`);
    }
});
exports.retrieveDashboardData = retrieveDashboardData;
