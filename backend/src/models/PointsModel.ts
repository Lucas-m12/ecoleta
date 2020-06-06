import knex from "../database/connection";

export interface pointData {
  image: string;
  name: String;
  email: String;
  whatsapp: String;
  latitude: Number;
  longitude: Number;
  city: String;
  uf: String;
  items: string | string[] | number[];
}

export interface filterData {
  city: String;
  uf: String;
  parsedItems: Number[];
}

const create = async (data: pointData) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
    image,
  } = data;

  const trx = await knex.transaction();

  const point = {
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  };

  const insertedIds = await trx("points").insert(point);

  const point_id = insertedIds[0];

  const pointItem = String(items)
    .split(",")
    .map((item) => Number(item.trim()))
    .map((item_id: number) => ({
      item_id,
      point_id,
    }));

  await trx("point_items").insert(pointItem);

  await trx.commit();

  return { ...point, id: point_id };
};

const get = async (pointId: Number) => {
  const point = await knex("points").where({ id: pointId }).first();

  if (!point) throw { code: 400, message: "Point not found!" };

  const items = await knex("point_items")
    .select("items.title")
    .join("items", "items.id", "=", "point_items.item_id")
    .where("point_id", pointId);

  const serializedPoint = {
    ...point,
    image_url: `http://192.168.0.105:3333/uploads/${point.image}`,
  };

  return { point: serializedPoint, items };
};

const getAll = async (filterData: filterData) => {
  const { city, uf, parsedItems: items } = filterData;

  const points = await knex("points")
    .join("point_items", "points.id", "=", "point_items.point_id")
    .whereIn("point_items.item_id", items)
    .where("city", city)
    .where("uf", uf)
    .distinct()
    .select("points.*");

  const serializedPoints = points.map((point) => ({
    ...point,
    image_url: `http://192.168.0.105:3333/uploads/${point.image}`,
  }));

  return serializedPoints;
};

export default { create, get, getAll };
