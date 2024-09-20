import { Router } from "express";
import { TokenController } from "../../controllers/token.controller";

const processRouter = Router();

// tokenRouter.post("/enroll", TokenController.enrollUser);
processRouter.get("/count", TokenController.getNumberOfProcesses);
processRouter.get("/:id", TokenController.getProcess);
processRouter.patch("/product/add", TokenController.addProductTokenToProcess);
processRouter.post("/create", TokenController.createProcess);
processRouter.post("/createdProcess", TokenController.getProcessFromFile);
processRouter.post("/removeProcess", TokenController.removeCreatedProcessFile);

export default processRouter;
