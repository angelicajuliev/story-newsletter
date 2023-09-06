import { AxiosResponse } from "axios";
import { Newsletter } from "@data/models/Newsletter";
import { API } from "./APIClass";

class NewsletterAPI extends API {
  public list(): Promise<AxiosResponse<Newsletter[]>> {
    return this.http.get('/newsletters/');
  }

  public create(newsletter: Newsletter): Promise<AxiosResponse<Newsletter>> {
    return this.http.post('/newsletters/', newsletter);
  }

  public send(id: number): Promise<AxiosResponse<Newsletter>> {
    return this.http.put(`/newsletters/${id}/send/`, {});
  }
}

export default NewsletterAPI;
