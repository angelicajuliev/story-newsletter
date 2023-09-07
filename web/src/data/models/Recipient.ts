import { Category } from "./Category";

export interface Recipient {
  id?: number;
  email: string;
  categorySubscription?: Category[]
}
