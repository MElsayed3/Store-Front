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
const database_1 = __importDefault(require("../database"));
const dbConnect = (sqlCommand, arr, sqlCommandType) => __awaiter(void 0, void 0, void 0, function* () {
    const connect = yield database_1.default.connect();
    const sql = sqlCommand;
    let resultRows;
    if (sqlCommandType === 'create' ||
        sqlCommandType === 'update' ||
        sqlCommandType === 'delete') {
        resultRows = yield connect.query(sql, arr);
        connect.release();
        return resultRows.rows[0];
    }
    else {
        resultRows = yield connect.query(sql);
        connect.release();
        return resultRows.rows;
    }
});
exports.default = dbConnect;
