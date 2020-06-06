import { Request, Response } from "express";

import PointsModel from "../models/PointsModel";

const index = async (req: Request, res: Response) => {
  const { city, uf, items } = req.query;

  const parsedItems = String(items)
    .split(",")
    .map((item) => Number(item.trim()));

  try {
    const points = await PointsModel.getAll({ city, uf, parsedItems });

    return res.status(200).json(points);
  } catch (error) {
    return res.status(error.code).json({ error: error.message });
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const point = await PointsModel.get(parseInt(id));

    return res.status(200).json(point);
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  const { filename } = req.file;

  const pointData = { image: filename, ...req.body };

  const resultQuery = await PointsModel.create(pointData);

  return res.status(201).json(resultQuery);
};

export default { create, show, index };
