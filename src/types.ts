export enum CategoryType {
  DEFAULT = "DEFAULT",
  TWO_IN_A_ROW = "TWO_IN_A_ROW",
  TEXT_BASED = "TEXT_BASED",
  MENU = "MENU",
}

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  items: string[];
  category_type: CategoryType;
  subcategories: Category[];
  has_parent: boolean;
  image?: string;
  additions: MenuAddition[];
};

export type MenuItem = {
  id: number;
  category: number;
  category_name: string;
  name: string;
  description: string;
  price: string;
  weight: string;
  volume: string;
  tags: number[];
  additions: MenuAddition[];
  available: boolean;
  image: string;
};

export type MenuAddition = {
  id: number;
  name: string;
  price: string;
  weight: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type CategoriesParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type MenuItemsParams = {
  available?: boolean;
  category?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
};
