import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const headers = {
  "Content-Type": "application/json",
};

const Axios = axios.create({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // baseURL: process.env.BACKEND_SERVER_BASE_URL,
  // baseURL: "http://dev.erp.com:4401/api",
  baseURL: "http://192.168.110.18:4401/api",
  headers,
});

export default Axios;
