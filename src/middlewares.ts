import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

const alreadyRegisteredProduct = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const products = request.body;
  products.forEach((element: any) => {
    const productsName = element.name;
    const nameExists: IProduct | undefined = market.find(
      (product) => product.name === productsName
    );
    if (nameExists) {
      return response.status(409).json({ error: "product already exists" });
    }
    return next();
  });

};

const verifyID = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: string = request.params.id;
  const validID: IProduct | undefined = market.find(
    (product) => product.id === (~~id)
  );

  if (!validID) {
    response.status(404).json({ error: "Product not found" });
  }

  return next();
};

export { alreadyRegisteredProduct, verifyID };
