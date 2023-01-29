import { CategoriesResponse } from "../models/Item";
import clientAPI from "../services/APIClient";

const getAllItems = async () => {
  const itemsResponse = await clientAPI.client.get<CategoriesResponse[]>(
    "/category",
  );

  return itemsResponse.data;
};

export default getAllItems;
