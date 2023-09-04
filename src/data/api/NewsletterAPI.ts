import { AxiosResponse } from "axios";
import { Newsletter } from "@data/models/Newsletter";
import { API } from "./APIClass";

class NewsletterAPI extends API {
  public async list(): Promise<AxiosResponse<Newsletter[]>> {
    return this.http.get('/newsletters');
  }
}

export default NewsletterAPI;
