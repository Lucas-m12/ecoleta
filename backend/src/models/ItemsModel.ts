import knex from "../database/connection";

const getAll = async () => {
  const items = await knex("items").select("*");

  return items;
};

export default { getAll };
