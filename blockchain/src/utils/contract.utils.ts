import path from "path";
import fs from "fs";
import * as fsExtra from "fs-extra";
import { Contract, ContractFactory, ethers, Transaction, TransactionDescription, Wallet } from "ethers";
import * as accountsInfo from "../../keys.json";
import dotenv from "dotenv";
import commandExists from "command-exists";

export class ContractUtils {
  private compiledFolder: any;
  private compiledPath: any;
  private contractsFolder: any;
  private contractsFolderPath: any;
  private contractInfoFile: string;
  private ownerAddress: string;
  private ownerPrivateKey: string;
  private provider: any;
  private rootFolder: any;
  private wallet: Wallet | null;


  constructor() {
    dotenv.config();
    this.rootFolder = "";
    this.contractsFolder = "contracts";
    this.compiledFolder = "compiled";
    this.contractsFolderPath = path.resolve(this.contractsFolder);
    this.compiledPath = path.resolve(this.contractsFolder, this.compiledFolder);
    this.contractInfoFile = ".info";
    this.wallet = null;

    this.provider = new ethers.JsonRpcProvider(process.env.PROVIDER!);

    // From ganache and the word list we provide. see package.json -> ganache script
    const owner = this.getLocalOwnerInfo();
    this.ownerAddress = owner.ownerAccount;
    this.ownerPrivateKey = owner.ownerPrivateKey;
    // this.ownerPrivateKey = this.getOwnerPrivateKey(this.ownerAddress) as string;

    this.log()
  }

  public async compile(contractName: string) {
    this.createComplileFolder();
    const contract = path.resolve(this.contractsFolder, contractName);
    const abiScript = `solc --overwrite --abi ${contract} -o ${this.compiledPath}`;
    const binScript = `solc --overwrite --bin ${contract} -o ${this.compiledPath}`;

    const util = require("node:util");
    const exec = util.promisify(require("node:child_process").exec);

    return await exec(abiScript + " | " + binScript);
  }

  private createComplileFolder() {
    const buildPath = path.resolve(this.contractsFolder, this.compiledFolder);
    fsExtra.ensureDirSync(buildPath);
  }

  public async createWalletFromSecretKey(privateKey: string, provider: any) {
    // return new Wallet(privateKey, provider);
    let wallet: Wallet | null = null;
    try {
      wallet = new Wallet(privateKey, provider);
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("ContractUtils.createWalletFromSecretKey");
      console.log(error);
      console.log("-------------------------------------------------------\n\n");
    }
    return wallet;
  }

  public async deploy(contractName: string) {
    const provider: any = this.provider;
    const compliledContractName = this.getContractName(contractName);

    const abiPath = path.resolve(
      this.compiledPath,
      compliledContractName + ".abi"
    );

    const binPath = path.resolve(
      this.compiledPath,
      compliledContractName + ".bin"
    );

    const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
    const bytecode = fs.readFileSync(binPath, "utf-8");

    const wallet = new Wallet(this.ownerPrivateKey, provider);
    const factory = new ContractFactory(abi, bytecode, wallet);

    const contract = await factory.deploy();
    await contract.waitForDeployment();
    //store contract info as JSON
    const filename = compliledContractName + this.contractInfoFile;
    this.writeToFile(filename, contract.target);
    return contract;
  }

  public async enableContracts() {
    const env = await this.setSolidityEnv();
    const regUserContract = process.env.regUserSmartContract!;
    const regOrderContract = process.env.regOrderSmartContract!;
    const regCompanyContract = process.env.regCompanySmartContract!;
    const processesSmartContract = process.env.processesSmartContract!;
    const stakeholdersSmartContract = process.env.stakeholdersSmartContract!;
    const mutableTokensSmartContract = process.env.mutableTokensSmartContract!;

    // Compile and deploy first contract
    // WARNING: the deployment MUST be nested
    // otherwise there is problem with tx nonce
    // await this.compile(regUserContract).then((resCompUser) => {
    //   if (resCompUser.stderr === "") {
    //     this.deploy(regUserContract).then((resDepUser) => {
    //       console.log("\n\n---------------------------------------------------------------------------------------------");
    //       console.log(`${regUserContract} has been deployed successfully at ${resDepUser.target}`);
    //       console.log("---------------------------------------------------------------------------------------------\n\n");

    //       // Compile and deploy second contract
    //       this.compile(regOrderContract).then((resCompOrder)=> {
    //         if (resCompOrder.stderr === "") {
    //           this.deploy(regOrderContract).then((resDepOrder) => {
    //             // Registering event from Order Smart Contract
    //             resDepOrder.on("emitCustomer", (id: number, name: string, email: string, company: string) => {
    //               const setEvent = {
    //                 id: id,
    //                 name: name,
    //                 email: email,
    //                 company: company,
    //               };
    //               // send event to VUE form to refresh values
    //               this.formatEmitCustomerEventData(setEvent).then((data) => {                          
    //                 const temp = JSON.parse(JSON.stringify(data));
    //                 const companyName = temp.name;

    //                 var buf = Buffer.from(JSON.stringify(data));
    //                 const buyerInfoFile = companyName + "_" + process.env.buyerInfoFile!;
    //                 this.writeToFile(buyerInfoFile, buf);
    //               });
    //             });
    //             // Registering event from Order Smart Contract
    //             resDepOrder.on("emitBindedResources", (company: string, amount: number) => {
    //               const setEvent = {
    //                 amount,
    //                 company,
    //               };
    //               // send event to VUE form to refresh values
    //               this.formatEmitBindedResourcesEventData(setEvent).then((data) => {                          
    //                 const temp = JSON.parse(JSON.stringify(data));
    //                 const company = temp.company;

    //                 var buf = Buffer.from(JSON.stringify(data));
    //                 const bindedResourcesInfoFile = company + "_" + process.env.bindedResourcesInfoFile!;
    //                 this.writeToFile(bindedResourcesInfoFile, buf);
    //               });
    //             });
    //             // Emit  event of Placed Order
    //             resDepOrder.on("emitPlacedOrderInfo", (seller: string, sellerEmail: string, buyer: string, buyerEmail: string, buyerAddress: string, amount: number, productBought: string) => {
    //               // send event to VUE form to refresh values
    //               const data = {
    //                 seller,
    //                 sellerEmail,
    //                 buyer,
    //                 buyerEmail,
    //                 buyerAddress,
    //                 amount: Number(amount),
    //                 productBought,
    //               }
    //               const temp = JSON.parse(JSON.stringify(data));

    //               var buf = Buffer.from(JSON.stringify(data));
    //               const orderPlacedInfoFile = temp.seller + "_" + process.env.placedOrderFile!;
    //               this.writeToFile(orderPlacedInfoFile, buf);
    //               // start actions to store customer + details
    //               this.receiveOrder();
    //             });

    //             console.log("\n\n-=====================================================-");
    //             console.log("Listeners from order related smart contract");
    //             console.log("-=====================================================-\n");
    //             resDepOrder.listenerCount(["emitCustomer"]).then((res) => {
    //               console.log("-------------------------------------------------------");
    //               console.log("emitCustomer");
    //               console.log("listenerCount: " + res);
    //               console.log("-------------------------------------------------------\n");
    //             });
    //             resDepOrder.listenerCount(["emitBindedResources"]).then((res) => {
    //               console.log("-------------------------------------------------------");
    //               console.log("emitBindedResources");
    //               console.log("listenerCount: " + res);
    //               console.log("-------------------------------------------------------\n");
    //             });
    //             resDepOrder.listenerCount(["emitPlacedOrderInfo"]).then((res) => {
    //               console.log("-------------------------------------------------------");
    //               console.log("emitPlacedOrderInfo");
    //               console.log("listenerCount: " + res);
    //               console.log("-------------------------------------------------------\n");
    //             });

    //             console.log("\n\n---------------------------------------------------------------------------------------------");
    //             console.log(`${regOrderContract} has been deployed successfully at ${resDepOrder.target}`);
    //             console.log("---------------------------------------------------------------------------------------------\n\n");
    //             // Compile and deploy third contract
    //             this.compile(regCompanyContract).then((resCompCompany) => {
    //               if (resCompCompany.stderr === "") {
    //                 this.deploy(regCompanyContract).then((resDepCompany) => {
    //                   console.log("\n\n-=====================================================-");
    //                   console.log("Listeners from company related smart contract");
    //                   console.log("-=====================================================-\n\n");
    //                   // Registering event from Company Smart Contract
    //                   resDepCompany.on("UpdatedResources", (name: string, resResources: number, avResources: number) => {
    //                     const setEvent = {
    //                       name: name,
    //                       reservedResources: resResources,
    //                       availableResources: avResources,
    //                     };
    //                     // write locally so VUE app gets updated values
    //                     this.formatUpdateEventData(setEvent).then((data) => {

    //                       const temp = JSON.parse(JSON.stringify(data));
    //                       const companyName = temp.name;

    //                       var buf = Buffer.from(JSON.stringify(data));
    //                       const updatedResourcesFile = companyName + "_" + process.env.updatedResourcesFile!;
    //                       this.writeToFile(updatedResourcesFile, buf);
    //                     });
    //                   });
    //                   resDepCompany.listenerCount(["UpdatedResources"]).then((res) => {
    //                     console.log("-------------------------------------------------------");
    //                     console.log("UpdatedResources");
    //                     console.log("listenerCount: " + res);
    //                     console.log("-------------------------------------------------------\n");
    //                   });

    //                   console.log("\n\n---------------------------------------------------------------------------------------------");
    //                   console.log(`${regCompanyContract} has been deployed successfully at ${resDepCompany.target}`);                
    //                   console.log("---------------------------------------------------------------------------------------------\n\n");
    //                 });
    //               }
    //             });
    //           });
    //         }
    //       });
    //     });
    //   }
    // });   

    // Compile and deploy smart contract
    
    const resCompUser = await this.compile(regUserContract);
    if (resCompUser.stderr === "") {
      const resDepUser = await this.deploy(regUserContract);

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${regUserContract} has been deployed successfully at ${resDepUser.target}`);
      console.log("---------------------------------------------------------------------------------------------\n\n");
    }

    // Compile and deploy smart contract
    const resCompOrder = await this.compile(regOrderContract);
    if (resCompOrder.stderr === "") {
      const resDepOrder = await this.deploy(regOrderContract);

      // Registering event from Order Smart Contract
      resDepOrder.on("emitCustomer", (id: number, name: string, email: string, company: string) => {
        const setEvent = {
          id: id,
          name: name,
          email: email,
          company: company,
        };
        // send event to VUE form to refresh values
        this.formatEmitCustomerEventData(setEvent).then((data) => {
          const temp = JSON.parse(JSON.stringify(data));
          const companyName = temp.name;

          var buf = Buffer.from(JSON.stringify(data));
          const buyerInfoFile = companyName + "_" + process.env.buyerInfoFile!;
          this.writeToFile(buyerInfoFile, buf);
        });
      });
      // Registering event from Order Smart Contract
      resDepOrder.on("emitBindedResources", (company: string, amount: number) => {
        const setEvent = {
          amount,
          company,
        };
        // send event to VUE form to refresh values
        this.formatEmitBindedResourcesEventData(setEvent).then((data) => {
          const temp = JSON.parse(JSON.stringify(data));
          const company = temp.company;

          var buf = Buffer.from(JSON.stringify(data));
          const bindedResourcesInfoFile = company + "_" + process.env.bindedResourcesInfoFile!;
          this.writeToFile(bindedResourcesInfoFile, buf);
        });
      });
      // Emit  event of Placed Order
      resDepOrder.on("emitPlacedOrderInfo", (seller: string, sellerEmail: string, buyer: string, buyerEmail: string, buyerAddress: string, amount: number, productBought: string) => {
        // send event to VUE form to refresh values
        const data = {
          seller,
          sellerEmail,
          buyer,
          buyerEmail,
          buyerAddress,
          amount: Number(amount),
          productBought,
        }
        const temp = JSON.parse(JSON.stringify(data));

        var buf = Buffer.from(JSON.stringify(data));
        const orderPlacedInfoFile = temp.seller + "_" + process.env.placedOrderFile!;
        this.writeToFile(orderPlacedInfoFile, buf);
        // start actions to store customer + details
        this.receiveOrder();
      });

      console.log("\n\n-=====================================================-");
      console.log("Listeners from order related smart contract");
      console.log("-=====================================================-\n");
      resDepOrder.listenerCount(["emitCustomer"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("emitCustomer");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
      resDepOrder.listenerCount(["emitBindedResources"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("emitBindedResources");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
      resDepOrder.listenerCount(["emitPlacedOrderInfo"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("emitPlacedOrderInfo");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${regOrderContract} has been deployed successfully at ${resDepOrder.target}`);
      console.log("---------------------------------------------------------------------------------------------\n\n");
    }

    // Compile and deploy smart contract
    const resCompCompany = await this.compile(regCompanyContract);
    if (resCompCompany.stderr === "") {
      const resDepCompany = await this.deploy(regCompanyContract);

      console.log("\n\n-=====================================================-");
      console.log("Listeners from company related smart contract");
      console.log("-=====================================================-\n\n");
      // Registering event from Company Smart Contract
      resDepCompany.on("UpdatedResources", (name: string, resResources: number, avResources: number) => {
        const setEvent = {
          name: name,
          reservedResources: resResources,
          availableResources: avResources,
        };
        // write locally so VUE app gets updated values
        const data = this.formatUpdateEventData(setEvent);

        const temp = JSON.parse(JSON.stringify(data));
        const companyName = temp.name;

        var buf = Buffer.from(JSON.stringify(data));
        const updatedResourcesFile = companyName + "_" + process.env.updatedResourcesFile!;
        this.writeToFile(updatedResourcesFile, buf);
      });

      resDepCompany.listenerCount(["UpdatedResources"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("UpdatedResources");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${regCompanyContract} has been deployed successfully at ${resDepCompany.target}`);
      console.log("---------------------------------------------------------------------------------------------\n\n");
    }


    // Compile and deploy smart contract
    const compiledProcess = await this.compile(processesSmartContract);
    if (compiledProcess.stderr === "") {
      const deployedProcess = await this.deploy(processesSmartContract);

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${processesSmartContract} has been deployed successfully at ${deployedProcess.target}`);
      console.log("---------------------------------------------------------------------------------------------");
      
      // Registering event from Smart Contract
      deployedProcess.on("processCreatedEvent", (id: string, layer: string) => {
        const setEvent = {
          id: Number(id),
          layer,
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const stName = "process";

        var buf = Buffer.from(JSON.stringify(data));
        const stFile = layer + "_" + stName + "_" + process.env.createProcessFile!;
        this.writeToFile(stFile, buf);
      });

   
      console.log("\n\n-=====================================================-");
      console.log("Listeners from Process related smart contract");
      console.log("-=====================================================-\n\n");

      deployedProcess.listenerCount(["processCreatedEvent"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("Process: processCreatedEvent");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
    }

    // Compile and deploy smart contract
    const compiledStakeHolders = await this.compile(stakeholdersSmartContract);
    if (compiledStakeHolders.stderr === "") {
      const deployedStakeHolders = await this.deploy(stakeholdersSmartContract);

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${stakeholdersSmartContract} has been deployed successfully at ${deployedStakeHolders.target}`);
      console.log("---------------------------------------------------------------------------------------------");

      
      // Registering event from Smart Contract
      deployedStakeHolders.on("stakeholderAddedEvent", (id: string, layer: string) => {
        const setEvent = {
          id: Number(id),
          layer,
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const stName = "stakeholder";

        var buf = Buffer.from(JSON.stringify(data));
        const stFile = layer + "_" + stName + "_" + process.env.updatedStakeholdersFile!;
        this.writeToFile(stFile, buf);
      });

      console.log("\n\n-=====================================================-");
      console.log("Listeners from Stakeholders related smart contract");
      console.log("-=====================================================-\n\n");

      deployedStakeHolders.listenerCount(["stakeholderAddedEvent"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("Stakeholders: stakeholderAddedEvent");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
    }

    // Compile and deploy smart contract
    const compiledMutableTokens = await this.compile(mutableTokensSmartContract);
    if (compiledMutableTokens.stderr === "") {
      const deployedMutableTokens = await this.deploy(mutableTokensSmartContract);

      console.log("\n\n---------------------------------------------------------------------------------------------");
      console.log(`${mutableTokensSmartContract} has been deployed successfully at ${deployedMutableTokens.target}`);
      console.log("---------------------------------------------------------------------------------------------");

      // Registering event from Smart Contract
      deployedMutableTokens.on("createProductEvent", (productId: number, layer: string) => {
        const setEvent = {
          id: Number(productId),
          layer,
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const tokenName = "product";

        var buf = Buffer.from(JSON.stringify(data));
        const tokenInfoFile = layer + "_" + tokenName + "_" + process.env.updatedTokenFile!;
        this.writeToFile(tokenInfoFile, buf);
      });

      deployedMutableTokens.on("createPedigreeEvent", (pedigreeId: number, layer: string) => {
        const setEvent = {
          id: Number(pedigreeId),
          layer,
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const tokenName = "pedigree";

        var buf = Buffer.from(JSON.stringify(data));
        const tokenInfoFile = layer + "_" + tokenName + "_" + process.env.updatedTokenFile!;
        // this.writeToFile(tokenInfoFile, buf);
      });
      
      deployedMutableTokens.on("traceTokenCreated", (owner: string, tokenId: number) => {
        const setEvent = {
          id: Number(tokenId),
          owner,
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const tokenName = "traceToken";

        var buf = Buffer.from(JSON.stringify(data));
        const tokenInfoFile = tokenName + "_" + process.env.updatedTokenFile!;
        this.writeToFile(tokenInfoFile, buf);
      });

      deployedMutableTokens.on("updateTokenEvent", (tokenId: number) => {
        const setEvent = {
          id: Number(tokenId),
        };

        // send event to VUE form to refresh values
        const data = JSON.parse(JSON.stringify(setEvent));
        const tokenName = "modifiedTraceToken";

        var buf = Buffer.from(JSON.stringify(data));
        const tokenInfoFile = tokenName + "_" + process.env.updatedTokenFile!;
        this.writeToFile(tokenInfoFile, buf);
      });

      deployedMutableTokens.on("forwardUpdatedTokenEvent", (tokenId: number, info: string, layer: string) => {
        const setEvent = {
          id: Number(tokenId),
          layer: info,
        };
        // write locally so VUE app gets updated values
        const data = JSON.parse(JSON.stringify(setEvent));

        var buf = Buffer.from(JSON.stringify(data));
        const tokenFile = layer + "_" + process.env.forwardedUpdatedTokenFile!;
        this.writeToFile(tokenFile, buf);
      });
      
      console.log("\n\n-=====================================================-");
      console.log("Listeners from MutableToken related smart contract");
      console.log("-=====================================================-\n\n");

      deployedMutableTokens.listenerCount(["createProductEvent"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("MutableToken: createProductEvent");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
      deployedMutableTokens.listenerCount(["forwardUpdatedTokenEvent"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("MutableToken: forwardUpdatedTokenEvent");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
      deployedMutableTokens.listenerCount(["traceTokenCreated"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("MutableToken: traceTokenCreated");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
      deployedMutableTokens.listenerCount(["updateTokenEvent"]).then((res) => {
        console.log("-------------------------------------------------------");
        console.log("MutableToken: updateTokenEvent");
        console.log("listenerCount: " + res);
        console.log("-------------------------------------------------------\n");
      });
    }

  }

  public async formatEmitBindedResourcesEventData(event: any) {
    const eventData = {
      amount: Number(event.amount),
      company: event.company as string,
    }
    return eventData;
  }

  public async formatEmitCustomerEventData(event: any) {
    const eventData = {
      id: Number(event.id),
      name: event.name as string,
      email: event.email as string,
      company: event.company as string,
    }
    return eventData;
  }

  public formatUpdateEventData(event: any) {
    const eventData = {
      name: event.name as string,
      reservedResources: Number(event.reservedResources),
      availableResources: Number(event.availableResources),
    }
    return eventData;
  }

  public formatUpdateTokenEventData(event: any) {
    const eventData = {
      id: event.id as number,
    }
    return eventData;
  }

  public async getAccounts() {
    const provider = this.provider;
    return await provider.listAccounts();
  }

  public async getBalance() {
    return await this.provider.getBalance(this.getOwner().address);
  }

  // https://ethereum.stackexchange.com/questions/120817/how-to-call-a-contract-function-method-using-ethersjs
  public async getContractInstance(smartContractFileName: string, wallet: Wallet) {
    const contractAddress = await this.getDeployedContractAddress(smartContractFileName);
    const compliledContractName = this.getContractName(smartContractFileName);

    const abiPath = path.resolve(this.compiledPath, compliledContractName + ".abi");
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

    const contract = new Contract(contractAddress, abi, wallet);
    return contract;

  }

  // Returns capitalized contract name without the extension 
  private getContractName(filename: string) {
    const smartContract = path.parse(path.resolve(this.contractsFolder, filename));
    const name = ([...smartContract.name][0].toUpperCase() + smartContract.name.slice(1));
    return name;
  }

  public getContractsFolder() {
    return this.contractsFolder;
  }

  public getDeployedContractAddress(contractFileName: string) {
    let contractAddress = "";
    const contractName = this.getContractName(contractFileName);
    const filename = contractName + this.contractInfoFile;
    try {
      contractAddress = this.readFromFile(filename);
    } catch (error: any) {
      console.log(error);
    }
    return contractAddress;
  }

  private getLocalOwnerInfo() {
    const privateKeys = accountsInfo.private_keys;
    const ownerAccount = Object.keys(privateKeys)[0];
    const ownerPrivateKey = Object.values(privateKeys)[0];
    return { ownerAccount, ownerPrivateKey };
  }

  public async getNonce(address: string) {
    return this.provider.getTransactionCount(address);
  }

  public getOwner() {
    const provider = this.provider;
    return provider.getSigner(0);
  }

  public getOwnerPrivateKey(address: string): string {
    let ownerPrivateKey = "";

    if (address !== undefined) {
      if (address.length > 0) {
        // if(address != "") {
        const privateKeys = accountsInfo.private_keys as any;
        Object.keys(privateKeys).find((key) => {
          if (key === address.toLowerCase()) {
            ownerPrivateKey = privateKeys[key];
          }
        });
      }
    }

    return ownerPrivateKey as string;
  }

  public getProvider() {
    return this.provider;
  }

  public getWallet(address: string, provider?: any) {
    const key = this.getOwnerPrivateKey(address);
    this.wallet = this.initWallet(key, provider);
    return this.wallet;
  }

  private initWallet(key: string, provider?: any): Wallet {
    const wallet = new Wallet(key, provider);
    return wallet;
  }

  //Log to console
  private log() {
    this.provider.getNetwork().then((network: any) => {
      console.log("\n\n-==========================================-");
      console.log(`[${new Date().toLocaleTimeString()}] Connected to chain ID ${network.chainId}`);
      console.log("-==========================================-\n\n");
    });
  }

  public parseTransaction(smartContractName: string, txBytes: any) {
    // const regOrderContract = process.env.regOrderSmartContract!;
    // const compliledContractName = this.getContractName(regOrderContract);
    const smartContract = process.env.smartContractName!;
    const compliledContractName = this.getContractName(smartContract);

    const abiPath = path.resolve(
      this.compiledPath,
      compliledContractName + ".abi"
    );

    const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

    const iface = new ethers.Interface(abi);
    let deserialTx: TransactionDescription | null = null;
    deserialTx = iface.parseTransaction({ data: txBytes });
    return deserialTx;
  }

  public readFromFile(filename: string) {
    return fs.readFileSync(path.join(this.compiledPath, filename), "utf-8");
  }

  public async readFromFileAsync(filename: string) {
    return await fs.promises.readFile(path.join(this.compiledPath, filename), "utf-8");
  }

  private async receiveOrder() {
    // await  OrderController.registerIncomingOrder({});
  }

  public removeFile(filename: string) {
    return fs.unlinkSync(path.join(this.compiledPath, filename));
  }

  public async removeFileAsync(filename: string) {
    return await fs.promises.unlink(path.join(this.compiledPath, filename));
  }

  private async setSolidityEnv() {
    const util = require("node:util");
    const exec = util.promisify(require("node:child_process").exec);
    await exec("export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/node/.local/bin:/root/.local/bin");
    const env1 = "pip3 install --user solc-select";
    // const env1 = "pip3 install --user solc-select";
    // const env1 = "pip3 install solc-select";
    const env2 = "solc-select install 0.8.4";
    const env3 = "solc-select use 0.8.4";
    try {
      const solcCom = await commandExists("solc-select");
      if (solcCom === null) {
        return await exec(env1 + " && " + env2 + " && " + env3);
      }
    } catch (error: any) {
      console.log("\n\n-------------------------------------------------------");
      console.log("ContractUtils.setSolidityEnv - ERROR\n");
      console.log(error);
      console.log("\n\nProbably connection to internet needed to install and configure solc-select");
      console.log("-------------------------------------------------------\n\n");
    }
  }

  private writeToFile(filename: string, data: any) {
    fs.writeFile(
      path.join(this.compiledPath, filename),
      data,
      () => { }
    );
  }
}
