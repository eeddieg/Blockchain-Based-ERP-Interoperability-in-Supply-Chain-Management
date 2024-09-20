import { Router } from "express";
import { TokenController } from "../../controllers/token.controller";

const stakeholderRouter = Router();

stakeholderRouter.get("/count", TokenController.getNumberOfStakeholders);
stakeholderRouter.get("/token/:id", TokenController.getStakeholdersProductToken);
stakeholderRouter.get("/:id", TokenController.getStakeholder);
stakeholderRouter.patch("/update/product", TokenController.updateStakeholderWithProduct);
stakeholderRouter.post("/check", TokenController.checkStakeholder);
stakeholderRouter.post("/create", TokenController.createStakeholder);
stakeholderRouter.post("/createdStakeholder", TokenController.getStakeholderFromFile);
stakeholderRouter.post("/removeCreated", TokenController.removeCreatedStakeholderFile);

export default stakeholderRouter;
