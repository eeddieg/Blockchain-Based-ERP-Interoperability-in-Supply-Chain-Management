import { Contract, ethers } from "ethers";
import { ContractUtils } from '../utils/contract.utils';
import dotenv from "dotenv";

export class TokenService {

  // smartContractName: from .env file -> 
  // { processesSmartContract | stakeholdersSmartContract | mutableTokensSmartContract }
  private static async fetchContractInstance(smartContract: string) {
    try{
      const utils = new ContractUtils();
      const provider = await utils.getProvider();
      const signer = await provider.getSigner();
      
      // const wallet = utils.getWallet(payload.address, provider);
      // const contract = await utils.getContractInstance(regUserContract, wallet);

      const contract = await utils.getContractInstance(smartContract, signer);
      const contrAddr = (contract.target as string).toLowerCase();

      console.log("\n\n-------------------------------------------------------");
      console.log(`New instance of ${smartContract} at address ${contrAddr}`);
      console.log("-------------------------------------------------------\n\n");
      return contract;
    } catch(error: any) {
        console.error(`Failed to get an instance of ${smartContract}`);
        return null;
    }
  };

  // PROCESSESS
  static async createProcess(data: any) {
    dotenv.config();
    const smartContract = process.env.processesSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);

    const name = data.name as string;
    const timestamp = data.timestamp as string;
    const description = data.description as string;
    const layer = data.layer as string;
   
    if (contract != null) {
      try {
        const transaction = await contract.createProcess(name, timestamp, description, layer);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.createProcess - Cannot get contract instance.");
      return null;
    }
  };

  static async addProductTokenToProcess(data: any) {
    dotenv.config();
    const smartContract = process.env.processesSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);

    const processId = data.processId as number;
    const productId = data.productId as number;
   
    if (contract != null) {
      try {
        const transaction = await contract.addProductTokenToProcess(processId, productId);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.addProductTokenToProcess - Cannot get contract instance.");
      return null;
    }
  };

  static async getNumberOfProcesses() {
    dotenv.config();
    const smartContract = process.env.processesSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getNumberOfProcesses();
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getNumberOfProcesses - Cannot get contract instance.");
      return null;
    }
  };

  static async getProcess(id: number) {
    dotenv.config();
    const smartContract = process.env.processesSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res =  await contract.getProcess(id);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getProcess - Cannot get contract instance.");
      return null;
    }
  };

  // STAKEHOLDERS
  static async checkStakeholder(data: any) {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);

    const companyName = data.companyName as string;
   
    if (contract != null) {
      try {
        const index = await contract.checkStakeholderByCompanyName(companyName);
        return Number(index);
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.checkStakeholder - Cannot get contract instance.");
      return null;
    }
  };

  static async createStakeholder(data: any) {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);

    const companyName = data.companyName as string;
    const name = data.name as string;
    const timestamp = data.timestamp as string;
    const description = data.description as string;
    const layer = data.layer as string;
   
    if (contract != null) {
      try {
        const transaction = await contract.createStakeholder(companyName, name, timestamp, description, layer);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.createStakeholder - Cannot get contract instance.");
      return null;
    }
  };

  static async getStakeholder(id: number) {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getStakeholder(id);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getStakeholder  - Cannot get contract instance.");
      return null;
    }
  };

  static async getStakeholdersProductToken(id: number) {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getStakeholdersProductToken(id);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getStakeholdersProductToken  - Cannot get contract instance.");
      return null;
    }
  };

  static async getNumberOfStakeholders() {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getNumberOfStakeholders();
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getNumberOfStakeholders  - Cannot get contract instance.");
      return null;
    }
  };

  static async updateStakeholderWithProduct(data: any) {
    dotenv.config();
    const smartContract = process.env.stakeholdersSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    const stakeholderId = data.stakeholderId as number;
    const productId = data.productId as number;
   
    if (contract != null) {
      try {
        const transaction  = await contract.addStakeholderProductToken(stakeholderId, productId);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
        if (error.code == "CALL_EXCEPTION") {
          return error.info.error;
        } 
      }
    } else {
      console.error("TokenService.updateStakeholderWithProduct - Cannot get contract instance.");
      return null;
    }
  };

  // TOKENS
  static async createElementalPedigree(data: any) {
      dotenv.config();
      const smartContract = process.env.mutableTokensSmartContract!;
      const contract = await TokenService.fetchContractInstance(smartContract);
      
      const tokenId = data.tokenId as number;
      const productId = data.productId as number;
      const quantity = data.quantity as number;
      const timestamp = String(data.timestamp);
      const layer = data.layer as string;
     
  
      if (contract != null) {
        try {
          const transaction = await contract.createElementalPedigree(tokenId, productId, quantity, timestamp, layer);
          const transactionReceipt = await transaction.wait();
          return transactionReceipt;
        } catch (error: any) {
          console.error(error);
        }
      } else {
        console.error("TokenService.createElementalPedigree - Cannot get contract instance.");
        return null;
      }
  };

  static async createCompoundPedigree(data: any) {
      dotenv.config();
      const smartContract = process.env.mutableTokensSmartContract!;
      const contract = await TokenService.fetchContractInstance(smartContract);
      
      const tokenId = data.tokenId as number;
      const pedigreeIdToken = data.pedigreeIdToken as number;
      const quantity = data.quantity as number;
      const timestamp = String(data.timestamp);
     
  
      if (contract != null) {
        try {
          const transaction = await contract.createPedigree(tokenId, pedigreeIdToken, quantity, timestamp);
          const transactionReceipt = await transaction.wait();
          return transactionReceipt;
        } catch (error: any) {
          console.error(error);
        }
      } else {
        console.error("TokenService.createCompoundPedigree - Cannot get contract instance.");
        return null;
      }
  };

  static async createProduct(data: any) {
      dotenv.config();
      const smartContract = process.env.mutableTokensSmartContract!;
      const contract = await TokenService.fetchContractInstance(smartContract);

      const name = data.name as string;
      const description = data.description as string;
      const timestamp = String(data.timestamp);
      const layer = data.layer as string;
     
      if (contract != null) {
        try {
          const transaction = await contract.createProduct(name, description, timestamp, layer);
          const transactionReceipt = await transaction.wait();
          return transactionReceipt;
        } catch (error: any) {
          console.error(error);
        }
      } else {
        console.error("TokenService.createProduct - Cannot get contract instance.");
        return null;
      }
  };

  static async createToken(data: any) {
      dotenv.config();
      const smartContract = process.env.mutableTokensSmartContract!;
      const contract = await TokenService.fetchContractInstance(smartContract);
      
      const name = data.name as string;
      const information = data.information as string;
      const timestamp = String(data.timestamp);
     
      if (contract != null) {
        try {
          const transaction  = await contract.createToken(name, information, timestamp);
          const transactionReceipt = await transaction.wait();
          return transactionReceipt;
        } catch (error: any) {
          console.error(error);
        }
      } else {
        console.error("TokenService.createToken - Cannot get contract instance.");
        return null;
      }
  };

  static async getNumberOfTokens() {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getNumberOfTokens();
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getNumberOfTokens - Cannot get contract instance.");
      return null;
    }
  };

  static async getPedigree(id: number) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getPedigree(id);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error.code);
        console.error(error);
        return error.code;
      }
    } else {
      console.error("TokenService.getNumberOfTokens - Cannot get contract instance.");
      return null;
    }
  };

  static async getProductById(productId: number) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getProduct(productId);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error("TokenService.getProductById  - Cannot get contract instance.");
      return null;
    }
  };

  static async getTokenById(id: number) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    if (contract != null) {
      try {
        const res = await contract.getTokenById(id);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error.code);
        console.error(error);
        return error.code;
      }
    } else {
      console.error("TokenService.getNumberOfTokens - Cannot get contract instance.");
      return null;
    }
  };

  static async updateTokenInfo(data: any) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    const tokenId = data.tokenId as number;
    const name = data.name as string;
    const information = data.information as string;
    const timestamp = data.timestamp as string;
   
    if (contract != null) {
      try {
        const transaction  = await contract.updateToken(tokenId, name, information, timestamp);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
        if (error.code == "CALL_EXCEPTION") {
          return error.info.error;
        } 
      }
    } else {
      console.error("TokenService.updateTokenInfo - Cannot get contract instance.");
      return null;
    }
  };
  static async updateTokenWithProcess(data: any) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    const tokenId = data.tokenId as number;
    const processId = data.processId as number;
   
    if (contract != null) {
      try {
        const transaction  = await contract.addProcess(tokenId, processId);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
        if (error.code == "CALL_EXCEPTION") {
          return error.info.error;
        } 
      }
    } else {
      console.error("TokenService.updateTokenWithStakeholder - Cannot get contract instance.");
      return null;
    }
  };
  
  static async updateTokenWithStakeholder(data: any) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);
    
    const tokenId = data.tokenId as number;
    const stakeholderId = data.stakeholderId as number;
   
    if (contract != null) {
      try {
        const transaction  = await contract.addStakeholder(tokenId, stakeholderId);
        const transactionReceipt = await transaction.wait();
        return transactionReceipt;
      } catch (error: any) {
        console.error(error);
        if (error.code == "CALL_EXCEPTION") {
          return error.info.error;
        } 
      }
    } else {
      console.error("TokenService.updateTokenWithStakeholder - Cannot get contract instance.");
      return null;
    }
  };

  // GENERAL
  static async fetchCreatedStakeholderFromFile(layer: string) {
    dotenv.config();
    const stName = "stakeholder";
    const stFile = layer + "_" + stName + "_" + process.env.updatedStakeholdersFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = await utils.readFromFileAsync(stFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.fetchCreatedStakeholderFromFile - ERROR");
      console.log("File could not be found.");
      console.log("-------------------------------------------------------\n\n");
    }
    return context;
  }

  static async fetchCreatedProcessFromFile(layer: string) {
    dotenv.config();
    const stName = "process";
    const stFile = layer + "_" + stName + "_" + process.env.createProcessFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = await utils.readFromFileAsync(stFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.fetchCreatedProcessFromFile - ERROR");
      console.log("File could not be found.");
      console.log("-------------------------------------------------------\n\n");
    }
    return context;
  }
  static async fetchCreatedProductFromFile(layer: string) {
    dotenv.config();
    const tokenName = "product";
    const productFile = layer + "_" + tokenName + "_" + process.env.updatedTokenFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = await utils.readFromFileAsync(productFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.fetchCreatedProductFromFile - ERROR");
      console.log("File could not be found.");
      console.log("-------------------------------------------------------\n\n");
    }
    return context;
  }

  static async fetchGeneratedTraceTokenFromFile() {
    dotenv.config();
    const tokenName = "traceToken"; 
    const tokenInfoFile = tokenName + "_" + process.env.updatedTokenFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = await utils.readFromFileAsync(tokenInfoFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.fetchGeneratedTraceToken - ERROR");
      console.log("File could not be found.");
      console.log("-------------------------------------------------------\n\n");
    }
    return context;
  }

  static async fetchUpdatedTraceTokenFromFile(layer: string) {
    dotenv.config();
    const tokenFile = layer + "_" + process.env.forwardedUpdatedTokenFile!;


    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = await utils.readFromFileAsync(tokenFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.fetchUpdatedTraceTokenFromFile - ERROR");
      console.log("File could not be found.");
      console.log("-------------------------------------------------------\n\n");
    }
    return context;
  }

  static async triggerTraceTokenUpdatedEvent(payload: any) {
    dotenv.config();
    const smartContract = process.env.mutableTokensSmartContract!;
    const contract = await TokenService.fetchContractInstance(smartContract);  
    
    const tokenId = payload.tokenId as number;
    const message = payload.message as string;
    const layer = payload.layer as string;

    if (contract != null) {
      try {
        const res = await contract.triggerTokenUpdatedEvent(tokenId, message, layer);
        if (res.code != "CALL_EXCEPTION") {
          return res;
        } else {
          return null;
        }
      } catch (error: any) {
        console.error(error.code);
        console.error(error);
        return error.code;
      }
    } else {
      console.error("TokenService.triggerTraceTokenUpdatedEvent - Cannot get contract instance.");
      return null;
    }
  }

  static deleteCreatedPedigreeFile(layer: string) {
    dotenv.config();

    const tokenName = "pedigree";
    const pedigreeFile = layer + "_" + tokenName + "_" + process.env.updatedTokenFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(pedigreeFile);

    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteCreatedPedigreeFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }

  static deleteCreatedStakeholderFile(layer: string) {
    dotenv.config();

    const stName = "stakeholder";
    const stFile = layer + "_" + stName + "_" + process.env.updatedStakeholdersFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(stFile);

    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteCreatedStakeholderFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }

  static deleteCreatedProcessFile(layer: string) {
    dotenv.config();
    const stName = "process";
    const stFile = layer + "_" + stName + "_" + process.env.createProcessFile!;

    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(stFile);

    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteCreatedProcessFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }

  static deleteCreatedProductFile(layer: string) {
    dotenv.config();
    const tokenName = "product";
    const productFile = layer + "_" + tokenName + "_" + process.env.updatedTokenFile!;

   const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(productFile);

    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteCreatedProductFromFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }

  static deleteTraceTokenFile() {
    dotenv.config();
    const tokenName = "traceToken";
    const tokenInfoFile = tokenName + "_" + process.env.updatedTokenFile!;


    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(tokenInfoFile);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteTraceTokenFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }

  static async deleteUpdatedTraceTokenFile(layer: string) {
    dotenv.config();
    const updatedTokenFile = layer + "_" + process.env.forwardedUpdatedTokenFile!;


    const utils = new ContractUtils();
    let context: any = null;
    try {
      context = utils.removeFile(updatedTokenFile);

    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("TokenService.deleteUpdatedTraceTokenFile - ERROR");
      console.log("-------------------------------------------------------\n\n");
      context = error.code;
    }
    return context;
  }
};
