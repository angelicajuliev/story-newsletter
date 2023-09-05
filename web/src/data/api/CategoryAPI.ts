import { API } from "./APIClass";

export class CategoryAPI extends API {
    list = () => this.http.get('/categories/')
}