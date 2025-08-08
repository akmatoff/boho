import { ENDPOINTS } from "../endpoints";
import type { Category, PaginatedResponse } from "../types";
import api from "./base";

export default async function getCategories(language?: string) {
  try {
    const res = await api.get<PaginatedResponse<Category>>(
      ENDPOINTS.MENU_CATEGORIES,
      {
        params: {
          page_size: 99,
        },
        headers: {
          "Accept-Language": language || "ru",
        },
      }
    );

    return res.data.results;
  } catch (e) {
    console.log("Не удалось загрузить категории", e);

    throw e;
  }
}
