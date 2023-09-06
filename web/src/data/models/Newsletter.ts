import { Category } from "./Category";

export interface Newsletter {
  id?: number;
  title: string;
  scheduledAt: string | Date;
  body?: string;
  status?: string;
  category?: string | Category;
  categoryId?: number | string;
}
