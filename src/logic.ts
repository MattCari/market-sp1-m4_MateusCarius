import { Request, Response } from "express";
import { market } from "./database";
import { IfoodProduct, IProduct } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  request.body.forEach((element: any) => {
    const newId = market.reduce((max, order) => Math.max(max, order.id), 0);
    if (element.section === "food") {
      const foodProduct: IfoodProduct = {
        id: newId + 1,
        name: element.name,
        price: element.price,
        weight: element.weight,
        section: element.section,
        calories: element.calories,
        expirationDate: new Date(),
      };
      market.push(foodProduct);
    } else {
      const product: IProduct = {
        id: newId + 1,
        name: element.name,
        price: element.price,
        weight: element.weight,
        section: element.section,
        expirationDate: new Date(),
      };
      market.push(product);
    }
  });

  return response.status(201).json({ total: 0, marketProducts: market });
};

const updateProduct = (request: Request, response: Response): Response => {
  const id: string = request.params.id;

  const findProductIndex: number = market.findIndex(
    (product) => product.id === ~~id
  );

  const newProduct: IProduct = {
    ...market[findProductIndex],
    ...request.body,
  };

  market[findProductIndex] = newProduct;

  return response.status(201).json(newProduct);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const id: string = request.params.id;

  const findProductIndex: number = market.findIndex(
    (product) => product.id === ~~id
  );

  market.splice(findProductIndex, 1);
  return response.status(204).send();
};

const readProduct = (request: Request, response: Response): Response => {
  return response.status(200).json({total: 0, marketProducts:market});
};

export { createProduct, updateProduct, deleteProduct, readProduct };
