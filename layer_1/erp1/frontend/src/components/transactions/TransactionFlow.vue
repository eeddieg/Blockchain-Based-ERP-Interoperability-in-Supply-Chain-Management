<template>
  <div class="container">
    <div id="token-modal">
      <!-- <button type="button" class="btn btn-info" @click="showModal">
        Open Modal
      </button> -->
      <TokenModal
        v-show="isModalVisible"
        @close="closeModal"
        :token="traceToken"
        :info="tokenData"
      >
        <template #header>Trace Token Demo</template>
        <template #footer>Click on button to exit</template>
      </TokenModal>
    </div>
    <div>
      <h2>Flow</h2>
      <button class="btn btn-success mx-2" @click="startDemo">
        Start Demo
      </button>
      <button class="btn btn-danger mx-2" @click="stopDemo">Stop Demo</button>
    </div>
    <div class="container mt-4" id="table-orders">
      <div v-show="isOrderListVisible">
        <GeneratedOrders
          ref="generatedOrdersRef"
          :orderListHeaders="orderHeaders"
          :orderList="orderList"
          :isVisible="isOrderListVisible"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { Utils } from "../../utils/helper.utils";
import GeneratedOrders from "../tables/TableGeneratedOrders.vue";
import TokenModal from "../../modals/TokenModal.vue";
import {
  OrderType,
  ProductBc,
  Receipt,
  Resource,
} from "../../models/order.model";
import { Company } from "../../models/company.model";
import Swal from "sweetalert2";

const demoDuration = 1 * 60 * 1000; // minutes * seconds * miliseconds -> duration in ms
const freq = 12000; // createOrder interval in ms - NEEDS TO BE HARDCODED

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let utils: any;
// let isUpdateBtnEnabled: boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let traceToken: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tokenData: any = null;

const orderHeaders = [
  "Orer ID",
  "Amount",
  "Title",
  "Created At",
  "Delivered At",
  "Order Type",
  "Order Status",
  "Block Number",
  "Block Hash",
  "Transaction Hash",
  "Update Order",
];

export default {
  name: "TransactionFlow",
  components: {
    GeneratedOrders,
    TokenModal,
  },
  data() {
    return {
      duration: null,
      interval: null,
      isModalVisible: false,
      isOrderListVisible: false,
      orderList: [],
      traceToken,
      tokenData,
    };
  },
  setup() {
    store = useStore();
    utils = new Utils();

    return {
      orderHeaders,
      store,
      utils,
      demoDuration,
      freq,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async showToken(token: any) {
      if (token !== null) {
        this.traceToken = token;
        this.tokenData = await this.formatToken(token);
        this.showModal();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async formatToken(token: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let info = [] as any[];
      const id = token.id as number;
      const name = token.name as string;
      const owner = token.owner as string;
      const hashIPFS = token.hashIPFS as string;
      const timestamps = token.timestamp as string;

      let information = token.information as string;
      information = information.replace(/Token for /g, "");
      const products = information.split(", ");

      const pedigreeTokens = token.pedigreeToken as number[];
      const processesToken = token.processesToken as number[];
      const stakeholdersToken = token.stakeholdersToken as number[];

      const dataInfo = name.split("+");
      for (const index in dataInfo) {
        const companyTokenInfo = dataInfo[index] as string;
        const data = companyTokenInfo.split("__");

        const companyNameInfo = data[0];
        const layer = companyNameInfo.split("-")[0];
        const companyName = companyNameInfo.split("-")[1];

        const orderInfo = data[1];
        const orderId = orderInfo.split("_")[1];

        const unixTime = Number(timestamps[index]);
        const time = new Date(unixTime);

        const product = products[index];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const productArray = [] as any[];

        for (const pedigreeIndex in pedigreeTokens) {
          const pedigreeId = pedigreeTokens[pedigreeIndex];
          store
            .dispatch("getPedigreeByIdFromBc", pedigreeId)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((pedigree: any) => {
              if (pedigree !== null) {
                const time = Number(pedigree.timestamp);
                const tempPedigree = {
                  pedigreeId: pedigree.id as number, // pedigree ID on bC
                  orderId: pedigree.pedigreeIdToken as number, // orderId in stakeholder local DB
                  quantity: pedigree.quantity as number,
                  timestamp: new Date(time),
                  // maker: pedigree.maker,
                  // hashIPFS: pedigree.hashIPFS,
                };
                productArray.push(tempPedigree);
              }
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processArray = [] as any[];
        for (const processIndex in processesToken) {
          const processId = processesToken[processIndex];
          store
            .dispatch("getProcessByIdFromBc", processId)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((process: any) => {
              if (process !== null) {
                const time = Number(process.timestamp);

                const tempProcess = {
                  id: process.id as number,
                  name: process.name,
                  description: process.description,
                  timestamp: new Date(time),
                  // maker: process.maker,
                  // hashIPFS: process.hashIPFS,
                };

                processArray.push(tempProcess);
              }
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stakeholderArray = [] as any[];
        for (const stakeholderIndex in stakeholdersToken) {
          const stakeholderId = stakeholdersToken[stakeholderIndex];
          store
            .dispatch("getStakeholderByIdFromBc", stakeholderId)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((stakeholder: any) => {
              if (stakeholder !== null) {
                const time = Number(stakeholder.timestamp);

                const tempStakeholder = {
                  id: stakeholder.id as number,
                  company: stakeholder.company,
                  name: stakeholder.name,
                  timestamp: new Date(time),
                  description: stakeholder.description,
                  // maker: stakeholder.maker,
                  // hashIPFS: stakeholder.hashIPFS,
                };

                stakeholderArray.push(tempStakeholder);
              }
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenInfo: any = {};
        tokenInfo.layer = layer;
        tokenInfo.company = companyName;
        tokenInfo.orderId = orderId;
        tokenInfo.createdAt = time;
        tokenInfo.product = product;
        tokenInfo.productList = productArray;
        tokenInfo.processList = processArray;
        tokenInfo.stakeholderList = stakeholderArray;

        info.push(tokenInfo);
      }
      console.log(info);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newToken: any = {
        id,
        owner,
        hashIPFS,
        info,
      };
      return newToken;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async createDemo() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.generateRandomOrder().then((order: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        store.dispatch("createOrder", order).then((createdOrder: any) => {
          store
            .dispatch("enrollOrderToBc", createdOrder)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
              if (res.receipt !== null && res.receipt !== undefined) {
                const receipt = {
                  orderId: createdOrder.order.id as number,
                  to: res.receipt.to as string,
                  from: res.receipt.from as string,
                  blockHash: res.receipt.blockHash as string,
                  blockNumber: res.receipt.blockNumber as number,
                  status: res.receipt.status as number,
                  hash: res.receipt.hash as string,
                } as Receipt;
                store.dispatch("storeOrderReceipt", receipt).then(() => {
                  // const traceTokenPayload = {
                  //   name:
                  //     createdOrder.customer.name +
                  //     "__orderId_" +
                  //     createdOrder.order.id,
                  //   information: createdOrder.order.serializedToken,
                  //   timestamp: Date.now().toString(),
                  // };
                  // this.generateTraceToken(traceTokenPayload).then(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  // (token: any) => {
                  store
                    .dispatch("getResourcesByOrderId", createdOrder.order.id)
                    .then((resources: Resource) => {
                      // build trace token
                      this.buildTraceToken(resources)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .then((traceToken: any) => {
                          // Store traceability token to db
                          const storeTokenPayload = {
                            orderId: createdOrder.order.id as number,
                            bcTokenId: traceToken.id as number,
                            token: createdOrder.order.serializedToken as string,
                          };

                          store.dispatch(
                            "storeTraceabilityTokenToDb",
                            storeTokenPayload
                          );

                          console.log(
                            `Order with id: ${createdOrder.order.id} created.`
                          );

                          const tokenFromStore = store.getters.traceToken;
                          // this.showToken(tokenFromStore);
                          console.log(tokenFromStore);
                          if (tokenFromStore !== null) {
                            alert(
                              "Token created\n\n" +
                                JSON.stringify(tokenFromStore)
                            );
                          }

                          const payload = {
                            id: createdOrder.order.id as number,
                            amount: resources.amount as number,
                            title: resources.title,
                            createdAt: new Date(
                              createdOrder.order.createdAt
                            ).toUTCString(),
                            deliveredAt:
                              createdOrder.order.deliveredAt === null
                                ? "Pending"
                                : new Date(
                                    createdOrder.order.deliveredAt
                                  ).toUTCString(),
                            type: createdOrder.order.type,
                            status: createdOrder.order.status,
                            blockHash: res.receipt.blockHash as string,
                            blockNumber: res.receipt.blockNumber as number,
                            hash: res.receipt.hash as string,
                            traceToken: tokenFromStore.id as number,
                          };
                          this.orderList.push(payload);
                          return payload;
                        })
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .catch((error: any) => {
                          console.log("buildTraceToken");
                          console.log(error);
                        });
                    });
                  // }
                  // );
                });
              }
            });
        });
      });
    },
    async generateRandomOrder() {
      const minCustId = 1001;
      const maxCustId = 1005;
      const minOrderAmount = 100;
      const maxOrderAmount = 1000;

      const company = store.getters.getCompany as Company;
      const productToBuy = company.productToBuy as ProductBc;

      const amount = await utils.randomIntFromInterval(
        minOrderAmount,
        maxOrderAmount
      );

      console.log(`Placed order has ${amount} units of ${productToBuy}`);

      const order = {
        customerId: await utils.randomIntFromInterval(minCustId, maxCustId),
        createdAt: new Date().valueOf(),
        deliveredAt: null,
        type: OrderType[0],
        status: "PLACED",
        title: productToBuy as ProductBc,
        amount,
      };

      return order;
    },
    async startDemo() {
      console.log("Start");
      this.triggerToast("Order creation started");
      this.isOrderListVisible = true;
      this.$refs.generatedOrdersRef.setUpdateBtnVisibility(false);

      console.log("Creating order...");
      this.createDemo();
      console.log("Done\n");
    },
    // async startDemo() {
    //   console.log("Start");
    //   this.triggerToast("Order creation started");
    //   this.isOrderListVisible = true;
    //   this.$refs.generatedOrdersRef.setUpdateBtnVisibility(false);

    //   this.interval = setInterval(() => {
    //     console.log("Creating order...");
    //     this.createDemo();
    //     console.log("Done\n");
    //   }, freq);

    //   this.duration = setInterval(() => {
    //     this.stopDemo();
    //   }, demoDuration);
    // },
    stopDemo() {
      console.log("Stop");
      // this.isOrderListVisible = false;
      clearInterval(this.duration);
      clearInterval(this.interval);

      // this.$refs.generatedOrdersRef.setUpdateBtnVisibility(true);
      setTimeout(() => {
        this.$refs.generatedOrdersRef.setUpdateBtnVisibility(true);
      }, freq);
      this.triggerToast("Order creation stopped");
    },
    triggerToast(msg: string) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        icon: "success",
        title: "Order Generation Demo",
        text: msg,
      });
    },

    /******************************************************************************/
    // FOR LAYER 2 etc
    async checkStakeholder() {
      const index = await store.dispatch("checkStakeholderByCompanyName");

      if (index > -1) {
        return await store.dispatch("getStakeholderByIdFromBc", index + 1);
      } else {
        return null;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createElementalPedigree(data: any) {
      const payload = {
        tokenId: data.tokenId as number,
        productId: data.productId as number,
        quantity: data.quantity as number,
      };

      const pedigreeToken = await store.dispatch(
        "generateElementalPedigreeOnBc",
        payload
      );
      return pedigreeToken;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async generateTraceToken(data: any) {
      const traceTokenPayload = {
        name: data.name as string,
        information: data.information as string,
        timestamp: data.timestamp as string,
      };
      const token = await store.dispatch(
        "generateTraceabilityTokenOnBc",
        traceTokenPayload
      );
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createProcess(data: any) {
      const processPayload = {
        name: data.name as string,
        description: data.description as string,
      };

      const process = await store.dispatch(
        "generateProcessOnBc",
        processPayload
      );

      return process;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createProduct(data: any) {
      const productPayload = {
        name: data.name as string,
        description: data.description as string,
      };

      const product = await store.dispatch(
        "generateProductOnBc",
        productPayload
      );

      return product;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createStakeholder(data: any) {
      const stakeholderPayload = {
        name: data.name as string,
        description: data.description as string,
      };

      const stakeholder = await store.dispatch(
        "generateStakeholderOnBc",
        stakeholderPayload
      );

      return stakeholder;
    },
    async createToken(orderId: number) {
      const companyName = await store.getters.getCompanyName;
      const traceTokenPayload = {
        name: companyName + "__orderId_" + orderId,
        information: "Token for " + store.getters.getProductToSell,
      };
      const token = await store.dispatch(
        "generateTraceabilityTokenOnBc",
        traceTokenPayload
      );

      return token;
    },
    async getProcessFromFile() {
      await store.commit("clearProcessInfo");

      const freq = 2000;
      const interval = setInterval(() => {
        store.dispatch("getProcessFileFromBc");

        const info = store.getters.processTokenInfo;
        if (info !== null) {
          clearInterval(interval);
          store.dispatch("removeProcessFile");
        }
      }, freq);
    },
    async getProcessInfo() {
      try {
        await this.getProcessFromFile();

        const info = await this.getProcessInfoFromStore();
        return Number(info.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    },
    async getProcessInfoFromStore() {
      await this.sleep(6000);
      return await store.getters.processTokenInfo;
    },
    async getProductFromFile() {
      await store.commit("clearProductInfo");

      const freq = 2000;
      const interval = setInterval(() => {
        store.dispatch("getProductFileFromBc");

        const info = store.getters.productTokenInfo;
        if (info !== null) {
          clearInterval(interval);
          store.dispatch("removeProductFile");
        }
      }, freq);
    },
    async getProductInfo() {
      try {
        await this.getProductFromFile();

        const info = await this.getProductInfoFromStore();
        return Number(info.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    },
    async getProductInfoFromStore() {
      await this.sleep(9000);
      return await store.getters.productTokenInfo;
    },
    async getStakeholderFromFile() {
      await store.commit("clearStakeholderInfo");

      const freq = 2000;
      const interval = setInterval(() => {
        store.dispatch("getStakeholderFromBc");

        const info = store.getters.stakeholderTokenInfo;
        if (info !== null) {
          clearInterval(interval);
          store.dispatch("removeStakeholderFile");
        }
      }, freq);
    },
    async getStakeholderInfoFromStore() {
      await this.sleep(6000);
      return await store.getters.stakeholderTokenInfo;
    },
    async getStakeholderInfo() {
      try {
        await this.getStakeholderFromFile();

        const info = await this.getStakeholderInfoFromStore();
        return Number(info.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    },
    async getTokenFromFile() {
      await store.commit("clearTraceTokenInfo");

      const freq = 2000;
      const interval = setInterval(() => {
        store.dispatch("getTraceTokenInfoFromFile");
        const info = store.getters.traceTokenInfo;
        if (info !== null) {
          clearInterval(interval);
          store.dispatch("removeTokenFile");
        }
      }, freq);
    },
    async getTokenInfo() {
      try {
        await this.getTokenFromFile();

        const info = await this.getTokenInfoFromStore();
        return Number(info.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    },
    async getTokenInfoFromStore() {
      await this.sleep(6000);
      return await store.getters.traceTokenInfo;
    },
    async sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async triggerTokenUpdatedEventOnBc(id: number) {
      await this.sleep(6000);
      return await store.dispatch("triggerTraceTokenUpdatedEvent", id);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateProcessWithProduct(data: any) {
      const updateData = {
        processId: data.processId as number,
        productId: data.productId as number,
      };

      return await store.dispatch("updateProcessWithProductOnBc", updateData);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateStakeholderWithProduct(data: any) {
      const updateData = {
        stakeholderId: data.stakeholderId as number,
        productId: data.productId as number,
      };

      const stakeholder = await store.dispatch(
        "updateStakeholderOnBc",
        updateData
      );

      return stakeholder;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateTokenWithProcess(data: any) {
      await this.sleep(6000);

      const updateData = {
        processId: data.processId as number,
        tokenId: data.tokenId as number,
      };

      const token = await store.dispatch(
        "updateTokenWithProcessOnBc",
        updateData
      );

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateTokenWithStakeholder(data: any) {
      const updateData = {
        stakeholderId: data.stakeholderId as number,
        tokenId: data.tokenId as number,
      };

      const token = await store.dispatch(
        "updateTokenWithStakeholderOnBc",
        updateData
      );

      return token;
    },
    async buildTraceToken(resources: Resource) {
      // STEP TO BE FOLLOWED:
      //
      /************************************************************************************* */
      // createToken
      const orderId = resources.orderId as number;
      const isTokenCreated = await this.createToken(orderId);
      if (isTokenCreated) {
        const id = await this.getTokenInfo();
        let token = await store.dispatch("getTraceTokenByIdFromBc", id);

        // Store traceability token to db
        // const storeTokenPayload = {
        //   orderId: orderId as number,
        //   bcTokenId: token.id as number,
        //   token: token.name as string,
        // };
        // store.dispatch("storeTraceabilityTokenToDb", storeTokenPayload);

        /************************************************************************************* */
        // createProduct
        const company = store.getters.getCompanyName as string;
        const localProduct = store.getters.getProductToSell as string;
        const productData = {
          name: localProduct,
          description: `${localProduct} from ${company}`,
        };
        const isProductCreated = await this.createProduct(productData);
        if (isProductCreated) {
          const productId = await this.getProductInfo();
          const product = await store.dispatch(
            "getProductByIdFromBc",
            productId
          );

          token = await store.dispatch("getTraceTokenByIdFromBc", id);

          /************************************************************************************* */
          // createPedigree
          //

          /************************************************************************************* */
          // createElementalPedigree
          const pedigreeData = {
            tokenId: token.id as number,
            productId: product.id as number,
            quantity: resources.amount as number,
          };
          const elementalPedigree = await this.createElementalPedigree(
            pedigreeData
          );

          if (elementalPedigree) {
            /************************************************************************************* */
            // createStakeholder
            // let stakeholder = await this.getStakeholderInfoFromStore();
            let stakeholder = null;
            stakeholder = await this.checkStakeholder();

            // create, if not present
            if (stakeholder === null) {
              const name = store.getters.getCompanyName as string;
              const productToSell = store.getters.getProductToSell as string;
              const stakeholderData = {
                name,
                description: `${name}: Sells ${productToSell}`,
              };

              const isStakeholderCreated = await this.createStakeholder(
                stakeholderData
              );

              if (isStakeholderCreated) {
                const stakeholderId = await this.getStakeholderInfo();

                stakeholder = await store.dispatch(
                  "getStakeholderByIdFromBc",
                  stakeholderId
                );
              }
            }

            /************************************************************************************* */
            // addStakeholderProductToken
            const updateStakeholderData = {
              stakeholderId: stakeholder.id as number,
              productId,
            };
            await this.updateStakeholderWithProduct(updateStakeholderData);

            /************************************************************************************* */
            // addStakeholder
            const updateTokenData = {
              stakeholderId: stakeholder.id as number,
              tokenId: token.id as number,
            };
            token = await this.updateTokenWithStakeholder(updateTokenData);

            /************************************************************************************* */
            // createProcess
            await store.commit("clearProcessList");

            const company = store.getters.getCompanyName as string;
            const localProduct = store.getters.getProductToSell as string;

            const processData = {
              name: company + "__Process 1",
              description: `Process applied on product: ${localProduct}`,
            };

            const isProcessCreated = await this.createProcess(processData);

            if (isProcessCreated) {
              const processId = await this.getProcessInfo();

              await store.dispatch("getProcessByIdFromBc", processId);

              /************************************************************************************* */
              // addProductTokenToProcess
              const updateProcessData = {
                processId,
                productId,
              };

              await this.updateProcessWithProduct(updateProcessData);

              /************************************************************************************* */
              // addProcess
              const info = await store.getters.processTokenInfo;

              const updateTokenData = {
                processId: Number(info.id),
                tokenId: token.id as number,
              };
              token = await this.updateTokenWithProcess(updateTokenData);

              token = await store.dispatch("getTraceTokenByIdFromBc", id);
              const tokenFromStore = store.getters.traceToken;
              // console.log(tokenFromStore);

              await store.dispatch("triggerTraceTokenUpdatedEvent", id);

              return tokenFromStore;
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
