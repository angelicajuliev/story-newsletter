import { AxiosResponse } from "axios";
import { Newsletter } from "@data/models/Newsletter";
import { API } from "./APIClass";

class NewsletterAPI extends API {
  public list(): Promise<AxiosResponse<Newsletter[]>> {
    return this.http.get("/newsletters/");
  }

  public create(newsletter: Newsletter): Promise<AxiosResponse<Newsletter>> {
    return this.http.post("/newsletters/", newsletter);
  }

  public send(id: number): Promise<AxiosResponse<Newsletter>> {
    return this.http.put(`/newsletters/${id}/send/`, {});
  }

  public uploadFile(
    id: number | string,
    file: File
  ): Promise<AxiosResponse<Newsletter>> {
    const formData = new FormData();
    formData.append("file", file);
    const fileName = file.name;

    return this.http.put(`/newsletters/${id}/upload/${fileName}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default NewsletterAPI;
