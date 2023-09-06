import { AxiosResponse } from "axios";
import { API } from "./APIClass";
import { Recipient } from "@data/models/Recipient";

type unsubscribeParams = {
  email: string;
  category?: string;
};
export default class RecipientAPI extends API {
  list(): Promise<AxiosResponse<Recipient[]>> {
    return this.http.get("/recipients/");
  }

  create(data: { email: string }): Promise<AxiosResponse<Recipient>> {
    return this.http.post("/recipients/", data);
  }

  unsubscribe({ id }: { id: number}): Promise<AxiosResponse> {
    return this.http.delete(`/recipients/${id}/`);
  }

  publicUnsubscribe({ email, category }: unsubscribeParams): Promise<AxiosResponse> {
    return this.http.delete(`/recipients/unsubscribe/`, { data: { email, category } });
  }

  bulkCreate(file: File): Promise<AxiosResponse> {
    const fileName = file.name;
    const formData = new FormData();
    formData.append("file", file);
    

    return this.http.put(`/recipients/bulk-create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Disposition": `attachment; filename=${fileName}`
      },
    });
  }
}
