import { Request, Response } from "express";

import ItemsModel from "../models/ItemsModel";

const index = async (req: Request, res: Response) => {
  try {
    const items = await ItemsModel.getAll();

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://192.168.0.105:3333/uploads/${item.image}`,
    }));

    return res.status(200).json(serializedItems);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { index };
