import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import envinfo from '../../envinfo';

const tokenAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const authorizationHeader:string = (req.headers.authorization) as string;
    const token = req.headers['authorization'] as string;
    jwt.verify(token, String(envinfo.token));
    next();
  } catch (error) {
    res.status(401);
  }
};

export default tokenAuthenticate;
