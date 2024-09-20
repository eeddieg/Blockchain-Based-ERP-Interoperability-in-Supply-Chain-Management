import { NextFunction, Request, Response } from "express";
import { TokenService } from './../services/token.service';
import { Pedigree, Token, Process, Product, Stakeholder } from "../model/token.model";
import { ContractUtils } from "../utils/contract.utils";

export class TokenController {

  // PROCESSESS
  public static async createProcess(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        name: req.body.name as string,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
        description: req.body.description as string,
        layer: req.body.layer as string,
      };

      const processToken = await TokenService.createProcess(payload);

      res.status(200).json({
        status: true,
        message: "Add process to the blockchain",
        processToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async addProductTokenToProcess(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        processId: req.body.processId as number,
        productId: req.body.productId as number,
      };

      const processToken = await TokenService.addProductTokenToProcess(payload);

      res.status(200).json({
        status: true,
        message: `"Product with ID: ${payload.productId} added successfully to the process with ID: ${payload.processId} on the blockchain`,
        processToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getNumberOfProcesses(req: Request, res: Response, next: NextFunction) {
    try {
      const counter = await TokenService.getNumberOfProcesses();

      res.status(200).json({
        status: true,
        message: "Number of Processes from blockchain",
        counter: Number(counter),
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getProcess(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const processArray = await TokenService.getProcess(id);
      console.log(processArray);
      
      
      if (processArray !== "CALL_EXCEPTION") {
        const involvedtokensTemp: number[] = [];

        if (processArray.length > 0) {
          for (const index in processArray[3]) {
            involvedtokensTemp.push(Number(processArray[3][index]));
          }
        }
        
        const process = {
          id: Number(processArray[0]),
          name: processArray[1] as string,
          description: processArray[2] as string,
          involvedtoken: involvedtokensTemp as number[],
          timestamp: Number(processArray[4]).toString(),
          maker: processArray[5] as string,
          active: processArray[6] as boolean,
          hashIPFS: processArray[7]  as string,
        };

        res.status(200).json({
          status: true,
          message: "Process from blockchain",
          process
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Could not find any process on blockchain",
          process: null
        });
      }
      } catch (error: any) {
        // next(createHttpError(error.statusCode, error.message));
        res.status(200).json({
          status: false,
          statusCode: error.statusCode,
          message: error.message,
        });
      }
    };

  // STAKEHOLDERS
  public static async checkStakeholder(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        companyName: req.body.companyName as string,
      };

      const index = await TokenService.checkStakeholder(payload);

      if (index === -1) {
        res.status(200).json({
          status: true,
          message: `Stakeholder with company name: ${payload.companyName} could not be found on the blockchain`,
          index,
        });
      } else {
        res.status(200).json({
          status: true,
          message: `Index of stakeholder with company name: ${payload.companyName} on the blockchain`,
          index,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async createStakeholder(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        companyName: req.body.companyName as string,
        name: req.body.name as string,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
        description: req.body.description as string,
        layer: req.body.layer as string,
      };

      const stakeholderToken = await TokenService.createStakeholder(payload);

      res.status(200).json({
        status: true,
        message: "Add stakeholder to the blockchain",
        stakeholderToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getNumberOfStakeholders(req: Request, res: Response, next: NextFunction) {
    try {
      const counter = await TokenService.getNumberOfStakeholders();

      res.status(200).json({
        status: true,
        message: "Number of Stakeholders from blockchain",
        counter: Number(counter),
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getStakeholder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const stakeholderArray = await TokenService.getStakeholder(id);

      if (stakeholderArray != null) {
        const temp: number[] = [];
        if (stakeholderArray.involvedtokens.length > 0) {
          for (const index in stakeholderArray.involvedtokens) {
            temp.push(Number(stakeholderArray.involvedtokens[index]));
          }
        }

        const stakeholder = {
          id: Number(stakeholderArray[0]),
          company: stakeholderArray[1] as string,
          name: stakeholderArray[2] as string,
          timestamp: stakeholderArray[3] as string,
          involvedtokens: temp as number[],
          description: stakeholderArray[5] as string,
          maker: stakeholderArray[6] as string,
          active: stakeholderArray[7] as boolean,
          hashIPFS: stakeholderArray[8] as string,
        };

        res.status(200).json({
          status: true,
          message: `Stakeholder with id: ${id} from blockchain`,
          stakeholder,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No registered stakeholders found on the blockchain.",
          stakeholder: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getStakeholdersProductToken(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const stakeholderTokenArray = await TokenService.getStakeholdersProductToken(id);

      if (stakeholderTokenArray != null) {
        const temp: number[] = [];
        if (stakeholderTokenArray.length > 0) {
          for (const index in stakeholderTokenArray) {
            temp.push(Number(stakeholderTokenArray[index]));
          }
        }

        res.status(200).json({
          status: true,
          message: `Product tokens used by stakeholder with id: ${id} from blockchain`,
          stakeholderToken: temp,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No registered stakeholders found on the blockchain.",
          stakeholderToken: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async updateStakeholderWithProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        stakeholderId: req.body.stakeholderId as number,
        productId: req.body.productId as number,
      };

      const transactionReceipt = await TokenService.updateStakeholderWithProduct(payload);

      if (!transactionReceipt.code) {
        res.status(200).json({
          status: true,
          message: `Update stakeholder with ID: ${payload.stakeholderId} on the blockchain`,
          tokenUpdated: transactionReceipt,
        });
      } else {
        res.status(200).json({
          status: false,
          message: transactionReceipt.message,
          tokenUpdated: transactionReceipt.data,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };


  // TOKENS
  public static async createCompoundPedigree(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        tokenId: req.body.tokenId as number,
        pedigreeIdToken: req.body.pedigreeIdToken as number,
        quantity: req.body.quantity as number,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
      };

      const pedigreeToken = await TokenService.createCompoundPedigree(payload);

      res.status(200).json({
        status: true,
        message: "Add pedigree to the blockchain",
        pedigreeToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async createElementalPedigree(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        tokenId: req.body.tokenId as number,
        productId: req.body.productId as number,
        quantity: req.body.quantity as number,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
        layer: req.body.layer as string,
      };

      const elementalPedigreeToken = await TokenService.createElementalPedigree(payload);

      res.status(200).json({
        status: true,
        message: "Add elemental pedigree to the blockchain",
        elementalPedigreeToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        name: req.body.name as string,
        description: req.body.description as string,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
        layer: req.body.layer as string,
      };

      const productToken = await TokenService.createProduct(payload);

      res.status(200).json({
        status: true,
        message: "Add product to the blockchain",
        productToken,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async createToken(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        name: req.body.name as string,
        information: req.body.information as string,
        timestamp: req.body.timestamp != 0 ? String(req.body.timestamp) : Date.now().toString(),
      };

      const transactionReceipt = await TokenService.createToken(payload);

      res.status(200).json({
        status: true,
        message: "Add token to the blockchain",
        tokenAdded: transactionReceipt,
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getNumberOfTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const counter = await TokenService.getNumberOfTokens();

      res.status(200).json({
        status: true,
        message: "Number of Tokens from blockchain",
        tokens: Number(counter),
      });
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getPedigree(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const pedigreeArray = await TokenService.getPedigree(id);

      const pedigree = {
        id: Number(pedigreeArray[0]),
        pedigreeIdToken: Number(pedigreeArray[1]), // as productID
        quantity: Number(pedigreeArray[2]),
        timestamp: pedigreeArray[3] as string,
        maker: pedigreeArray[4] as string,
        hashIPFS: pedigreeArray[5] as string,
      } as Pedigree;

      if (pedigreeArray !== "CALL_EXCEPTION") {
        res.status(200).json({
          status: true,
          message: "Pedigree from blockchain",
          pedigree,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Could not find any pedigree from blockchain",
          pedigree: null
        });
      }
    } catch (error: any) {
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.id);
      const productArray = await TokenService.getProductById(productId);

      if (productArray !== undefined) {
        const product = {
          id: Number(productArray[0]),
          name: productArray[1] as string,
          description: productArray[2] as string,
          timestamp: productArray[3] as string,
          maker: productArray[4] as string,
          hashIPFS: productArray[5] as string,
        } as Product;

        res.status(200).json({
          status: true,
          message: `Product eith ID: ${product.id} from blockchain`,
          product,
        });
      } else {
        res.status(200).json({
          status: false,
          message: `Could not find any product with ID: ${productId} from blockchain`,
          product: null
        });
      }
    } catch (error: any) {
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tokenArray = await TokenService.getTokenById(id);

      if (tokenArray !== "CALL_EXCEPTION") {
        const pedigreeTokenTemp: number[] = [];
        const processesTokenTemp: number[] = [];
        const stakeholdersTokenTemp: number[] = [];
        const timestampTemp: string[] = [];

        if (tokenArray.length > 0) {
          for (const index in tokenArray[4]) {
            timestampTemp.push(tokenArray[4][index]);
          }
          for (const index in tokenArray[5]) {
            pedigreeTokenTemp.push(Number(tokenArray[5][index]));
          }
          for (const index in tokenArray[6]) {
            processesTokenTemp.push(Number(tokenArray[6][index]));
          }
          for (const index in tokenArray[7]) {
            stakeholdersTokenTemp.push(Number(tokenArray[7][index]));
          }
        }

        const token = {
          id: Number(tokenArray[0]),
          mutable: tokenArray[1] as boolean,
          name: tokenArray[2] as string,
          information: tokenArray[3] as string,
          timestamp: timestampTemp as string[],
          pedigreeToken: pedigreeTokenTemp as number[],
          processesToken: processesTokenTemp as number[],
          stakeholdersToken: stakeholdersTokenTemp as number[],
          owner: tokenArray[8] as string,
          active: tokenArray[9] as boolean,
          hashIPFS: tokenArray[10] as string,
        } as Token;


        res.status(200).json({
          status: true,
          message: `Token with id: ${id} from blockchain`,
          token,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Could not find any token from blockchain",
          token: null
        });
      }
    } catch (error: any) {
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async updateTokenInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        tokenId: req.body.tokenId as number,
        name: req.body.name as string,
        information: req.body.information as string,
        timestamp: req.body.timestamp as string,
      };

      const transactionReceipt = await TokenService.updateTokenInfo(payload);

      if (!transactionReceipt.code) {
        res.status(200).json({
          status: true,
          message: `Update token with ID: ${payload.tokenId} on the blockchain`,
          tokenUpdated: transactionReceipt,
        });
      } else {
        res.status(200).json({
          status: false,
          message: transactionReceipt.message,
          tokenUpdated: transactionReceipt.data,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async updateTokenWithProcess(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        tokenId: req.body.tokenId as number,
        processId: req.body.processId as number,
      };

      const transactionReceipt = await TokenService.updateTokenWithProcess(payload);

      if (!transactionReceipt.code) {
        res.status(200).json({
          status: true,
          message: `Update token with ID: ${payload.tokenId} on the blockchain`,
          tokenUpdated: transactionReceipt,
        });
      } else {
        res.status(200).json({
          status: false,
          message: transactionReceipt.message,
          tokenUpdated: transactionReceipt.data,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async updateTokenWithStakeholder(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        tokenId: req.body.tokenId as number,
        stakeholderId: req.body.stakeholderId as number,
      };

      const transactionReceipt = await TokenService.updateTokenWithStakeholder(payload);

      if (!transactionReceipt.code) {
        res.status(200).json({
          status: true,
          message: `Update token with ID: ${payload.tokenId} on the blockchain`,
          tokenUpdated: transactionReceipt,
        });
      } else {
        res.status(200).json({
          status: false,
          message: transactionReceipt.message,
          tokenUpdated: transactionReceipt.data,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  // GENERAL
  public static async getStakeholderFromFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer as string;
      const context = await TokenService.fetchCreatedStakeholderFromFile(layer);

      if (context != null) {
        res.status(200).json({
          status: true,
          message: `Created ${layer}-stakeholder from file`,
          info: JSON.parse(context),
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Created stakeholder could not be read from file.",
          info: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getProcessFromFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer as string;
      const context = await TokenService.fetchCreatedProcessFromFile(layer);

      if (context != null) {
        res.status(200).json({
          status: true,
          message: "Generated process token from file",
          tokenInfo: JSON.parse(context),
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Token could not be read from file.",
          tokenInfo: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getProductIdFromFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer as string;
      const context = await TokenService.fetchCreatedProductFromFile(layer);

      if (context != null) {
        res.status(200).json({
          status: true,
          message: "Product info from file",
          info: JSON.parse(context),
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Product info could not be read from file.",
          info: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };
  
  public static async getGeneratedTokenFromFile(req: Request, res: Response, next: NextFunction) {
    try {

      const context = await TokenService.fetchGeneratedTraceTokenFromFile();

      if (context != null) {
        res.status(200).json({
          status: true,
          message: "Generated token from file",
          tokenInfo: JSON.parse(context),
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Token could not be read from file.",
          tokenInfo: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async getUpdatedTokenIdFromFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer as string;
      const context = await TokenService.fetchUpdatedTraceTokenFromFile(layer);

      if (context != null) {
        const info = JSON.parse(context);

        res.status(200).json({
          status: true,
          message: "Updated tokenID from file",
          info,
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Updated tokenID from file",
          info: null,
        });
      }

    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeCreatedPedigreeFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer;
      const context = await TokenService.deleteCreatedPedigreeFile(layer);

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: `${layer}-Product file deleted successfully.`,
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Product file is missing.",
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeCreatedProcessFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer;
      const context = await TokenService.deleteCreatedProcessFile(layer);

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: `${layer}-Process file deleted successfully.`,
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Process file is missing.",
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeCreatedProductFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer;
      const context = await TokenService.deleteCreatedProductFile(layer);

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: `${layer}-Product file deleted successfully.`,
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Product file is missing.",
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeCreatedStakeholderFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer;
      const context = await TokenService.deleteCreatedStakeholderFile(layer);

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: `${layer}-Stakeholder file deleted successfully.`,
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Stakeholder file is missing.",
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeTokenFile(req: Request, res: Response, next: NextFunction) {
    try {
      const context = await TokenService.deleteTraceTokenFile();

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: "Trace token file deleted successfully.",
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Trace token file is missing.",
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async removeUpdatedTokenFile(req: Request, res: Response, next: NextFunction) {
    try {
      const layer = req.body.layer as string;
      const context = await TokenService.deleteUpdatedTraceTokenFile(layer);

      if (context == undefined) {
        res.status(200).json({
          status: true,
          message: "Updated trace token file deleted successfully.",
        });
      } else if (context == 'ENOENT') {
        res.status(200).json({
          status: false,
          message: "Updated trace token file is missing.",
        });
      }

    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  public static async triggerTraceTokenUpdatedEvent(req: Request, res: Response, next: NextFunction) {
    try {

      const payload = {
        tokenId: req.body.tokenId as number,
        message: req.body.message as string,
        layer: req.body.layer as string,
      };
      const context = await TokenService.triggerTraceTokenUpdatedEvent(payload);

      if (context != null) {
        res.status(200).json({
          status: true,
          message: "Event triggered successfully.",
          event: context
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Event could not be triggered successfully.",
          event: null,
        });
      }
    } catch (error: any) {
      // next(createHttpError(error.statusCode, error.message));
      res.status(200).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

};
