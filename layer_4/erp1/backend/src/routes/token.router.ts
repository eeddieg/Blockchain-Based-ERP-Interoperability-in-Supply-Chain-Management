import { Router } from "express";
import TokenController from "../controllers/token.controller";
import authMiddleware from "../middleware/auth.middleware";
const tokenRouter = Router();

// verify
// tokenRouter.post("/verify", authMiddleware.verify, TokenController.refresh);
// refresh JWT
tokenRouter.post("/verify", authMiddleware.verify, TokenController.verify);
// refresh JWT
tokenRouter.post("/refresh", authMiddleware.verify, TokenController.refresh);
// generate MFA token and QR
tokenRouter.post("/generateQR", authMiddleware.verify, TokenController.generateTwoFactorAuth);
// check MFA status
tokenRouter.post("/mfaStatus", authMiddleware.verify, TokenController.checkMFAStatus);
// verify user token against QR
tokenRouter.post("/verifyQR", authMiddleware.verify, TokenController.verifyTwoFactorAuth);
// clear MFA entries
tokenRouter.post("/reset", authMiddleware.verify, TokenController.reset);
// TraceToken
tokenRouter.post("/storeTraceToken", authMiddleware.verify, TokenController.storeTraceToken);


export default tokenRouter;
