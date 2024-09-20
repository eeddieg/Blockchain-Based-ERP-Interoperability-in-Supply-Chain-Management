import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const headers = {
  "Content-Type": "application/json",
};

const Axios = axios.create({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // baseURL: process.env.BACKEND_SERVER_BASE_URL,
  // baseURL: "http://dev.erp.com:4801/api",
  baseURL: "http://192.168.110.30:4801/api",
  headers,
});

export default Axios;
