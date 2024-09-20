import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/storeEnums";
import Axios from "../../services/api/api.backend.service";
import AxiosBc from "../../services/api/api.blockchain.service";

@Module
export default class TokenStoreModule extends VuexModule {
  private statusCode = 0;
  private stakeholderInfo = null;
  private stakeholderObject = null;
  private tokenInfo = null;
  private tokenObject = null;
  private pedigree = null;
  private processInfo = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private processList = [] as any[];
  private processObject = null;
  private productInfo = null;
  private productObject = null;
  private repeatMode = false;

  get StatusCode() {
    return this.statusCode;
  }
  get stakeholderToken() {
    return this.stakeholderObject;
  }
  get stakeholderTokenInfo() {
    return this.stakeholderInfo;
  }
  get traceTokenInfo() {
    return this.tokenInfo;
  }
  get traceToken() {
    return this.tokenObject;
  }
  get pedigreeToken() {
    return this.pedigree;
  }
  get processes() {
    return this.processList;
  }
  get processToken() {
    return this.processObject;
  }
  get processTokenInfo() {
    return this.processInfo;
  }
  get producToken() {
    return this.productObject;
  }
  get productTokenInfo() {
    return this.productInfo;
  }
  get checkRepeatMode() {
    return this.repeatMode;
  }

  @Mutation
  [Mutations.SET_REPEAT_MODE](payload: boolean) {
    this.repeatMode = payload;
  }
  @Mutation
  [Mutations.SET_STATUS_CODE](payload: number) {
    this.statusCode = payload;
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PEDIGREE_TOKEN](payload: any) {
    this.pedigree = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PROCESS_INFO](payload: any) {
    this.processInfo = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PROCESS_LIST](payload: any) {
    this.processList.push(payload);
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PROCESS_TOKEN](payload: any) {
    this.processObject = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PRODUCT_INFO](payload: any) {
    this.productInfo = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_PRODUCT_TOKEN](payload: any) {
    this.productObject = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_STAKEHOLDER_TOKEN](payload: any) {
    this.stakeholderObject = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_STAKEHOLDER_INFO](payload: any) {
    this.stakeholderInfo = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_TRACE_INFO](payload: any) {
    this.tokenInfo = { ...payload };
  }
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Mutations.SET_TRACE_TOKEN](payload: any) {
    this.tokenObject = { ...payload };
  }
  @Mutation
  [Mutations.UNSET_PROCESS_INFO]() {
    this.processInfo = null;
  }
  @Mutation
  [Mutations.UNSET_PROCESS_LIST]() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.processList = [] as any[];
  }
  @Mutation
  [Mutations.UNSET_PROCESS_TOKEN]() {
    this.processObject = null;
  }
  @Mutation
  [Mutations.UNSET_PRODUCT_INFO]() {
    this.productInfo = null;
  }
  @Mutation
  [Mutations.UNSET_PRODUCT_TOKEN]() {
    this.productObject = null;
  }
  @Mutation
  [Mutations.UNSET_STAKEHOLDER]() {
    this.stakeholderObject = null;
  }
  @Mutation
  [Mutations.UNSET_STAKEHOLDER_INFO]() {
    this.stakeholderInfo = null;
  }
  @Mutation
  [Mutations.UNSET_TRACE_TOKEN]() {
    this.tokenObject = null;
  }
  @Mutation
  [Mutations.UNSET_TRACE_TOKEN_INFO]() {
    this.tokenInfo = null;
  }

  @Action
  async [Actions.CHECK_STAKEHOLDER_BY_COMPANY_NAME_ON_BC]() {
    const url = AxiosBc.defaults.baseURL + "/token" + "/stakeholder" + "/check";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const companyName = this.context.getters.getCompanyName as string;
    const payload = {
      companyName,
    };

    try {
      const res = await AxiosBc.post(url, payload);

      return res.data.index as number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.CHECK_STAKEHOLDER_BY_COMPANY_NAME_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.GENERATE_ELEMENTAL_PEDIGREE_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/pedigree/create/elemental";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      tokenId: data.tokenId as number,
      productId: data.productId as number,
      quantity: data.quantity as number,
      timestamp: 0,
      layer: this.context.getters.getCompanyLayer as string,
    };

    try {
      const res = await AxiosBc.post(url, payload);
      if (res.data.elementalPedigreeToken.blockNumber > 0) {
        return true;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GENERATE_ELEMENTAL_PEDIGREE_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.GENERATE_PROCESS_ON_BC](data: any) {
    const url = AxiosBc.defaults.baseURL + "/token" + "/process" + "/create";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      name: data.name as string,
      description: data.description as string,
      timestamp: 0,
      layer: this.context.getters.getCompanyLayer as string,
    };

    try {
      const res = await AxiosBc.post(url, payload);

      if (res.data.processToken.blockNumber > 0) {
        return true;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GENERATE_PROCESS_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.GENERATE_PRODUCT_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/mutable" + "/product/create";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      name: data.name as string,
      description: data.description as string,
      timestamp: 0,
      layer: this.context.getters.getCompanyLayer as string,
    };

    try {
      const res = await AxiosBc.post(url, payload);

      if (res.data.productToken.blockNumber > 0) {
        return true;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GENERATE_PRODUCT_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.GENERATE_STAKEHOLDER_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/stakeholder" + "/create";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      companyName: this.context.getters.getCompanyName as string,
      name: data.name as string,
      description: data.description as string,
      timestamp: 0,
      layer: this.context.getters.getCompanyLayer as string,
    };

    try {
      const res = await AxiosBc.post(url, payload);

      if (res.data.stakeholderToken.blockNumber > 0) {
        return true;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GENERATE_STAKEHOLDER_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.GENERATE_TRACEABILITY_TOKEN_ON_BC](data: any) {
    const generateTokenUrl =
      AxiosBc.defaults.baseURL + "/token" + "/mutable" + "/token/create";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      name: data.name as string,
      information: data.information as string,
      timestamp: Date.now().toString(),
    };

    try {
      const res = await AxiosBc.post(generateTokenUrl, payload);

      if (res.data.tokenAdded.blockNumber > 0) {
        return true;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GENERATE_TRACEABILITY_TOKEN_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_STAKEHOLDER_BY_ID_FROM_BC](id: number) {
    await this.context.commit("clearStakeholder");

    const url = AxiosBc.defaults.baseURL + "/token" + "/stakeholder" + "/" + id;
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(url);
      const stakeholder = res.data.stakeholder;

      if (stakeholder != null) {
        this.context.commit("setStakeholder", stakeholder);
        return stakeholder;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_STAKEHOLDER_BY_ID_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_STAKEHOLDER_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/stakeholder" +
      "/createdStakeholder";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const payload = {
        layer: this.context.getters.getCompanyLayer as string,
      };

      const res = await AxiosBc.post(url, payload);
      const info = res.data.info;
      if (info !== null) {
        this.context.commit("setStakeholderInfo", info);
      }
      return info;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_STAKEHOLDER_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_PROCESS_FILE_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/process" + "/createdProcess";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const data = {
        layer: this.context.getters.getCompanyLayer as string,
      };
      const res = await AxiosBc.post(url, data);
      const info = res.data.tokenInfo;
      if (info !== null) {
        this.context.commit("setProcessInfo", info);
      }
      return info;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_PROCESS_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_PROCESS_BY_ID_FROM_BC](id: number) {
    await this.context.commit("clearProcessToken");

    const processUrl =
      AxiosBc.defaults.baseURL + "/token" + "/process" + "/" + id;
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(processUrl);
      const process = res.data.process;

      if (process != null) {
        this.context.commit("setProcessToken", process);
        return process;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_PROCESS_BY_ID_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_PRODUCT_BY_ID_FROM_BC](id: number) {
    await this.context.commit("clearProductToken");

    const productUrl =
      AxiosBc.defaults.baseURL + "/token" + "/mutable" + "/product" + "/" + id;
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(productUrl);
      const product = res.data.product;

      if (product != null) {
        this.context.commit("setProductToken", product);
        return product;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_PRODUCT_BY_ID_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_PRODUCT_FILE_FROM_BC]() {
    const fetchProductInfoUrl =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/product" +
      "/createdProduct";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const data = {
        layer: this.context.getters.getCompanyLayer as string,
      };
      const res = await AxiosBc.post(fetchProductInfoUrl, data);
      const info = res.data.info;
      if (info !== null) {
        this.context.commit("setProductInfo", info);
      }
      return info;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_PRODUCT_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_TRACE_TOKEN_BY_ID_FROM_BC](id: number) {
    await this.context.commit("clearTraceToken");

    const fetchGeneratedTokenUrl =
      AxiosBc.defaults.baseURL + "/token" + "/mutable" + "/token" + "/" + id;
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(fetchGeneratedTokenUrl);
      const token = res.data.token;

      if (token != null) {
        this.context.commit("setTraceToken", token);
        return token;
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_TRACE_TOKEN_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.GET_TRACE_TOKEN_INFO_FROM_FILE_BC]() {
    const fetchGeneratedTokenUrl =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/token" +
      "/generatedToken";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(fetchGeneratedTokenUrl);
      const info = res.data.tokenInfo;
      if (info !== null) {
        this.context.commit("setTraceInfo", info);
      }
      return info;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_TRACE_TOKEN_INFO_FROM_FILE_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.INDUCE_DELAY](ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  @Action
  async [Actions.GET_UPDATED_TRACE_TOKEN_ID_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/token" +
      "/updatedTokenId";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await AxiosBc.get(url);
      const info = res.data.info;

      if (info != null) {
        const tokenId = Number(info.id);
        const layer = info.layer;
        const companyLayer = (await this.context.getters
          .getCompanyLayer) as string;

        if (layer === companyLayer) {
          const token = await this.context.dispatch(
            "getTraceTokenFromBc",
            tokenId
          );
          await this.context.commit("setTraceToken", token);
          return token;
        } else {
          return null;
        }
      } else {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.GET_UPDATED_TRACE_TOKEN_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.REMOVE_PROCESS_FILE_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/process" + "/removeProcess";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const data = {
        layer: this.context.getters.getCompanyLayer,
      };
      await AxiosBc.post(url, data);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.REMOVE_PROCESS_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.REMOVE_PRODUCT_FILE_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/product" +
      "/removeProductFile";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const data = {
        layer: this.context.getters.getCompanyLayer,
      };
      await AxiosBc.post(url, data);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.REMOVE_PRODUCT_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.REMOVE_STAKEHOLDER_FILE_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/stakeholder/removeCreated";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const data = {
        layer: this.context.getters.getCompanyLayer,
      };
      await AxiosBc.post(url, data);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.REMOVE_STAKEHOLDER_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.REMOVE_TOKEN_FILE_FROM_BC]() {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/token" +
      "/removeToken";

    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      await AxiosBc.get(url);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.REMOVE_TOKEN_FILE_FROM_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.STORE_TRACEABILITY_TOKEN_TO_DB](payload: any) {
    const storeTokentoDbUrl =
      Axios.defaults.baseURL + "/token" + "/storeTraceToken";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      Axios.defaults.headers.patch["Content-Type"] = "application/json";
      Axios.defaults.headers.patch.Authorization = "Bearer " + token;
    }

    try {
      const res = await Axios.post(storeTokentoDbUrl, payload);
      return res.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.STORE_TRACEABILITY_TOKEN_TO_DB - ERROR");
      console.log(error.response.data.message);
      return error.response.status;
    }
  }
  @Action
  async [Actions.TRIGGER_TRACE_TOKEN_UPDATED_EVENT](id: number) {
    const triggerEventUrl =
      AxiosBc.defaults.baseURL + "/token" + "/mutable" + "/token" + "/event";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const layer = this.context.getters.getCompanyLayer;
    const layerBase = layer.slice(0, -1);
    const newLayer = Number(layer.slice(-1)) + 1;
    const payload = {
      tokenId: id,
      message: layerBase + newLayer,
      layer,
    };

    try {
      const res = await AxiosBc.post(triggerEventUrl, payload);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.TRIGGER_TRACE_TOKEN_UPDATED_EVENT - ERROR");
      console.log(error.response.data.message);
      return error.response.status;
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.UPDATE_PROCESS_WITH_PRODUCT_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/process" + "/product/add";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      processId: data.processId as number,
      productId: data.productId as number,
    };

    try {
      const res = await AxiosBc.patch(url, payload);
      if (res.data.processToken.blockNumber > 0) {
        return true;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.UPDATE_PROCESS_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.UPDATE_STAKEHOLDER_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL + "/token" + "/stakeholder" + "/update/product";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      stakeholderId: data.stakeholderId as number,
      productId: data.productId as number,
    };

    try {
      const res = await AxiosBc.patch(url, payload);

      if (res.data.tokenUpdated.blockNumber > 0) {
        const stakeholder = await this.context.dispatch(
          "getStakeholderByIdFromBc",
          payload.stakeholderId
        );
        return stakeholder;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.UPDATE_STAKEHOLDER_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.UPDATE_TRACE_TOKEN_WITH_PROCESS_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/token/update/process";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      processId: data.processId as number,
      tokenId: data.tokenId as number,
    };

    try {
      const res = await AxiosBc.patch(url, payload);

      if (res.data.tokenUpdated.blockNumber > 0) {
        const token = await this.context.dispatch(
          "getTraceTokenByIdFromBc",
          payload.tokenId
        );
        return token;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.UPDATE_STAKEHOLDER_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async [Actions.UPDATE_TRACE_TOKEN_WITH_STAKEHOLDER_ON_BC](data: any) {
    const url =
      AxiosBc.defaults.baseURL +
      "/token" +
      "/mutable" +
      "/token/update/stakeholder";
    const token = localStorage.getItem("token") || null;
    if (token != null && token !== "") {
      AxiosBc.defaults.headers.post["Content-Type"] = "application/json";
      AxiosBc.defaults.headers.post.Authorization = "Bearer " + token;
    }

    const payload = {
      stakeholderId: data.stakeholderId as number,
      tokenId: data.tokenId as number,
    };

    try {
      const res = await AxiosBc.patch(url, payload);

      if (res.data.tokenUpdated.blockNumber > 0) {
        const token = await this.context.dispatch(
          "getTraceTokenByIdFromBc",
          payload.tokenId
        );
        return token;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Actions.UPDATE_STAKEHOLDER_ON_BC - ERROR");
      console.log(error);
    }
  }
  @Action
  async [Actions.VALIDATE_JWT_TOKEN]() {
    const url = Axios.defaults.baseURL + "/token" + "/verify";
    const token = localStorage.getItem("token") || null;
    if (token === null) {
      return 401;
    } else if (token != null && token !== "") {
      Axios.defaults.headers.post["Content-Type"] = "application/json";
      Axios.defaults.headers.post.Authorization = "Bearer " + token;
    }

    try {
      const res = await Axios.post(url);
      const code = res.data.statusCode;
      this.context.commit("setStatusCode", code);
      return code;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("VALIDATE_JWT_TOKEN - ERROR");
      return error.response.data;
    }
  }
}
