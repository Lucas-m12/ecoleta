import Knex from "knex";

const up = async (knex: Knex) =>
  knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable().references("id").inTable("points");
    table.integer("item_id").notNullable().references("id").inTable("items");
  });

const down = async (knex: Knex) => knex.schema.dropTable("point_items");

export { up, down };
