import axios from "axios";
import EmailAPI from "./EmailAPI";

const API_URL =  'http://localhost:3004'

const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

export const emailApi = new EmailAPI(instance);