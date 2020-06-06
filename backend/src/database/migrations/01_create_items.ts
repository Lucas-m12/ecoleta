import Knex from "knex";

const up = async (knex: Knex) =>
  knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("title").notNullable();
  });

const down = async (knex: Knex) => knex.schema.dropTable("items");

export { up, down };
