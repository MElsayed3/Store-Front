import { Request, Response } from 'express';
import { CustomerClass } from '../models/customer.model';
import envinfo from '../../envinfo';
import jwt from 'jsonwebtoken';

const customer = new CustomerClass();

//create customer function
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const result = await customer.createCustomer(req.body);
    const token = jwt.sign(req.body, String(envinfo.token));
    res.json({
      status: 'success',
      data: req.body,
      result: result,
      message: 'customer created successfully',
      token: token,
    });
  } catch (error) {
    throw new Error(`can't add a customer ${error}`);
  }
};

//retrieve all customers function
export const retrieveCustomerData = async (req: Request, res: Response) => {
  try {
    const result = await customer.retrieveCustomerData();
    res.json({
      data: result,
      message: 'Data was retrieved successfully',
    });
  } catch (error) {
    throw new Error(`can't retrieve all data ${error}`);
  }
};

//retrieve one customer function
export const retrieveOneCustomer = async (req: Request, res: Response) => {
  try {
    const result = await customer.retrieveOneCustomer(Number(req.params.id));
    if (result.statusCode === 401) {
      res.json({
        statusCode: result.statusCode,
        warningMessage: `oops!!this id doesn't exist 
                please enter a valid customer id`,
      });
    } else {
      res.json({
        statusCode: 201,
        data: result,
      });
    }
  } catch (error) {
    throw new Error(`can't find this customer or id is invalid ${error}`);
  }
};

//update customer function
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const result = await customer.updataCustomerData(req.body);
    res.json({
      statusCode: 201,
      data: result,
      message: 'updated successfully',
    });
  } catch (error) {
    throw new Error(`can't update the customer ${error}`);
  }
};

//delete one customer function
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const result = await customer.deleteCustomer(Number(req.params.id));

    res.json({
      statusCode: 201,
      data: result,
      message: 'deleted successfully',
    });
  } catch (error) {
    throw new Error(`can't delete the customer ${error}`);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { customerEmail, customerPassword } = req.body;
    const result = await customer.authenticate(customerEmail, customerPassword);
    if (result !== null) {
      res.status(201).json({
        message: `Welcome ${customerEmail}`,
        data: result,
      });
    } else {
      res.json({
        message: 'please enter a valid email and password',
        data: result,
      });
    }
  } catch (error) {
    throw new Error(`something went wrong ${error}`);
  }
};
