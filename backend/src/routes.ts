import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

import pointValidation from "./validations/pointValidation";

const routes = express.Router();
const uploads = multer(multerConfig);

routes.get("/items", ItemsController.index);

routes.post("/points", uploads.single("image"), PointsController.create);
routes.get("/points", PointsController.index);
routes.get("/points/:id", pointValidation, PointsController.show);

export default routes;
