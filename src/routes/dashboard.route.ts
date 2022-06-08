import { dashboardClass } from '../services/dashboard';
import { Request, Response } from 'express';
import { Router } from 'express';

const dashboard = new dashboardClass();
const dashboardRouter = Router();

const addDashboard = async (req: Request, res: Response) => {
  try {
    await dashboard.addDashboard(req.body);
    res.json({
      message: 'dashboard added',
      data: req.body,
    });
  } catch (error) {
    throw new Error(`can't add a dashboard ${error}`);
  }
};

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

const retrieveCutomerOrdersProducts = async (req: Request, res: Response) => {
  try {
    const result = await dashboard.retrieveCutomerOrdersProducts();
    res.json({
      statusCode: 201,
      data: result,
      message: 'retrieved successflly',
    });
  } catch (error) {
    throw new Error(`couldn't retrieve all data ${error}`);
  }
};

dashboardRouter
  .route('/')
  .get(retrieveCutomerOrdersProducts)
  .post(addDashboard);



export default dashboardRouter;