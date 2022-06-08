import { Request, Response } from 'express';
import { productsClass } from '../models/products.model';

//add one product

const product = new productsClass();

export const addProduct = async (req: Request, res: Response) => {
  try {
    const result = await product.addProduct(req.body);
    res.json({
      statusCode: 201,
      data: req.body,
      result: result,
      message: 'product was added successflly',
    });
  } catch (error) {
    throw new Error(`can't add a new product ${error}`);
  }
};

//retrieve all products function
export const retrieveProductsData = async (req: Request, res: Response) => {
  try {
    const result = await product.retrieveProductsData();
    res.json({
      data: result,
      message: 'Data was retrieved successfully',
    });
  } catch (error) {
    throw new Error(`can't retrieve all data ${error}`);
  }
};

//retrieve one product function
export const retrieveOneProduct = async (req: Request, res: Response) => {
  try {
    const result = await product.retrieveOneProduct(Number(req.params.id));
    res.json({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    throw new Error(`can't find this product or id is invalid ${error}`);
  }
};

export const retrieveTopPopularProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const topData = await product.retrieveTopPopularProducts();
    res.json({
      statuCode: 201,
      data: topData,
    });
  } catch (error) {
    throw new Error(`couldn't retrieve top products ${error}`);
  }
};

//update order function
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await product.updateProductData(req.body);
    res.json({
      statusCode: 201,
      data: result,
      message: 'updated successfully',
    });
  } catch (error) {
    throw new Error(`can't update the product ${error}`);
  }
};

//delete one product function
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await product.deleteProduct(Number(req.params.id));

    res.json({
      statusCode: 201,
      data: result,
      message: 'deleted successfully',
    });
  } catch (error) {
    throw new Error(`can't delete the product ${error}`);
  }
};
