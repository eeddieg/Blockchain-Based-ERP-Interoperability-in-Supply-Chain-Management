import { Router } from "express";
import mutableTokenRouter from "./token/token.mutableToken.router";
import processRouter from "./token/token.process.router";
import stakeholderRouter from "./token/token.stakeholder.router";

const tokenRouter = Router();

tokenRouter.use("/process", processRouter);
tokenRouter.use("/mutable", mutableTokenRouter);
tokenRouter.use("/stakeholder", stakeholderRouter);

export default tokenRouter;
