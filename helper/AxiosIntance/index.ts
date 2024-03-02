import axios from "axios";
import { API } from "../API";

const AXIOS = axios.create({
  baseURL: API,
});

export default AXIOS;
