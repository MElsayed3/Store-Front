import { Request, Response } from 'express';
import { ordersClass } from '../models/orders.model';

//add one order

const order = new ordersClass();

export const addOrder = async (req: Request, res: Response) => {
  try {
    const result = await order.addOrder(req.body);
    res.json({
      statusCode: 201,
      data: req.body,
      result: result,
      message: 'order was added successflly',
    });
  } catch (error) {
    throw new Error(`can't add a new order ${error}`);
  }
};

//retrieve all orders function
export const retrieveOrdersData = async (req: Request, res: Response) => {
  try {
    const result = await order.retrieveOrdersData();
    res.json({
      data: result,
      message: 'Data was retrieved successfully',
    });
  } catch (error) {
    throw new Error(`can't retrieve all data ${error}`);
  }
};

//retrieve orders by customerID and order_status
export const retrieveOrdersByCustomerID_Status = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await order.retrieveOrdersByCustomerID_Status(req.body);
    res.json({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    throw new Error(`couldn't retrieve orders data ${error}`);
  }
};

//retrieve orders function
export const retrieveOrdersByCustomerID = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await order.retrieveOrdersByCustomerID(
      Number(req.params.id)
    );
    res.json({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    throw new Error(`can't find this order or id is invalid ${error}`);
  }
};

//update order function
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const result = await order.updateOrderData(req.body);
    res.json({
      statusCode: 201,
      data: result,
      message: 'updated successfully',
    });
  } catch (error) {
    throw new Error(`can't update the order ${error}`);
  }
};

//delete one order function
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await order.deleteOrder(Number(req.params.id));

    res.json({
      statusCode: 201,
      data: result,
      message: 'deleted successfully',
    });
  } catch (error) {
    throw new Error(`can't delete the order ${error}`);
  }
};
