import { Router } from "express";
import { TokenController } from "../../controllers/token.controller";

const mutableTokenRouter = Router();

mutableTokenRouter.get("/product/:id", TokenController.getProductById);
mutableTokenRouter.get("/token/generatedToken", TokenController.getGeneratedTokenFromFile);
mutableTokenRouter.get("/token/count", TokenController.getNumberOfTokens);
mutableTokenRouter.get("/token/removeToken", TokenController.removeTokenFile);
mutableTokenRouter.get("/token/:id", TokenController.getToken);
mutableTokenRouter.get("/pedigree/:id", TokenController.getPedigree);
mutableTokenRouter.patch("/token/update/process", TokenController.updateTokenWithProcess);
mutableTokenRouter.patch("/token/update/stakeholder", TokenController.updateTokenWithStakeholder);
mutableTokenRouter.patch("/token/update/token", TokenController.updateTokenInfo);
mutableTokenRouter.post("/pedigree/create/composite", TokenController.createCompoundPedigree);
mutableTokenRouter.post("/pedigree/create/elemental", TokenController.createElementalPedigree);
mutableTokenRouter.post("/pedigree/removePedigreeFile", TokenController.removeCreatedPedigreeFile);
mutableTokenRouter.post("/product/create", TokenController.createProduct);
mutableTokenRouter.post("/product/createdProduct", TokenController.getProductIdFromFile);
mutableTokenRouter.post("/product/removeProductFile", TokenController.removeCreatedProductFile);
mutableTokenRouter.post("/token/create", TokenController.createToken);
mutableTokenRouter.post("/token/event", TokenController.triggerTraceTokenUpdatedEvent);
mutableTokenRouter.post("/token/removeUpdatedToken", TokenController.removeUpdatedTokenFile);
mutableTokenRouter.post("/token/updatedTokenId", TokenController.getUpdatedTokenIdFromFile);

export default mutableTokenRouter;
