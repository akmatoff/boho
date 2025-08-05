import type { MenuItem, MenuItemsParams, PaginatedResponse } from "../types";
import { ENDPOINTS } from "../endpoints";
import api from "./base";

export default async function getMenuItems(
  params?: MenuItemsParams,
  lang?: string
) {
  return api
    .get<PaginatedResponse<MenuItem>>(ENDPOINTS.MENU_ITEMS, {
      params: { ...params, page_size: 99 },
      headers: {
        "Accept-Language": lang || "ru",
      },
    })
    .then((res) => res.data.results);
}
