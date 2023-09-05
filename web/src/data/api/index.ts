import axios from "axios";
import RecipientAPI from "./RecipientAPI";
import NewsletterAPI from "./NewsletterAPI";
import { CategoryAPI } from "./CategoryAPI";

const API_URL =  'http://localhost:8000'

const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

export const recipientApi = new RecipientAPI(instance);
export const newsletterApi = new NewsletterAPI(instance);
export const categoryApi = new CategoryAPI(instance);
