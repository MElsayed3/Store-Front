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
const supertest_1 = __importDefault(require("supertest"));
const dashboard_1 = require("../services/dashboard");
const server_1 = __importDefault(require("../server"));
const dash = new dashboard_1.dashboardClass();
const request = (0, supertest_1.default)(server_1.default);
describe('Testing dashboard defined functions', () => {
    it('testing addDashboard function if defined', () => {
        expect(dash.addDashboard).toBeDefined();
    });
    it('testing retrieveCutomerOrdersProducts function if defined', () => {
        expect(dash.retrieveCutomerOrdersProducts).toBeDefined();
    });
});
describe('Testing dashboard endpoint functions', () => {
    it(`testing addDashboard function expects product_id to equal to 3
        and order_id to equal to 1 and status is 200`, () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/dashboard')
            .set('Content-type', 'application/json')
            .send({
            product_id: 3,
            order_id: 1,
        });
        expect(result.body.data.product_id).toEqual(3);
        expect(result.body.data.order_id).toEqual(1);
        expect(result.status).toEqual(200);
    }));
    it(`testing retrieveCutomerOrdersProducts function expects 
        customername to equal to test1 and status is 200`, () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .get('/dashboard');
        const customerName = yield result.body.data[0].customername;
        expect(customerName).toEqual('test1');
        expect(result.status).toEqual(200);
    }));
});
