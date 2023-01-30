export interface ItemResponse {
  id: string;
  name: string;
  note: string;
  category: CatItem;
}

interface CatItem {
  _id: string;
  name: string;
  description: string;
}

export interface CategoriesResponse {
  id: string;
  name: string;
  description: string;
  items: ItemCat[];
}

interface ItemCat {
  id: string;
  name: string;
  note: string;
  category: string;
}
