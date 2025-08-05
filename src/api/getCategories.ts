import { ENDPOINTS } from "../endpoints";
import type { Category, PaginatedResponse } from "../types";
import api from "./base";

export default async function getCategories(language?: string) {
  return api
    .get<PaginatedResponse<Category>>(ENDPOINTS.MENU_CATEGORIES, {
      params: {
        page_size: 99,
      },
      headers: {
        "Accept-Language": language || "ru",
      },
    })
    .then((res) => {
      return res.data.results;
    });
}
