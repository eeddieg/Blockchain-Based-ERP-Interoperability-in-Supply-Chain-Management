import { TraceabilityToken } from "../model/token.model";
import db from "../utils/db.utils";

class TokenService {
  // Find token by orderID
  static async findTraceTokenByOrderId(orderId: number): Promise<TraceabilityToken | null> {
    return await db.traceabilityToken.findUnique({
      where: {
        orderId,
      }
    });
  };

  static async storeTraceToken(data: TraceabilityToken): Promise<any> {
    return await db.traceabilityToken.create({
      data: {
        orderId: data.orderId as number,
        bcTokenId: data.bcTokenId as number,
        token: data.token as string,
      },
      select: {
        id: true,
        orderId: true,
        bcTokenId: true,
        token: true,
      },
    });
  };


}

export default TokenService;
