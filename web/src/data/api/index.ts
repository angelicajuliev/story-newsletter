import axios from "axios";
import EmailAPI from "./EmailAPI";
import NewsletterAPI from "./NewsletterAPI";

const API_URL =  'http://localhost:3004'

const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

export const emailApi = new EmailAPI(instance);
export const newsletterApi = new NewsletterAPI(instance);
