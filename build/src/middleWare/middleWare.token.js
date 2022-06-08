"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envinfo_1 = __importDefault(require("../../envinfo"));
const tokenAuthenticate = (req, res, next) => {
    try {
        // const authorizationHeader:string = (req.headers.authorization) as string;
        const token = req.headers['authorization'];
        jsonwebtoken_1.default.verify(token, String(envinfo_1.default.token));
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.default = tokenAuthenticate;
