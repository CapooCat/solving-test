import axios from "axios";
import type { TModelPrice } from "../types/TModelPrice";
import { delay } from "@/utils/deplay";

export const getPrice = async () => {
  const url = "https://interview.switcheo.com/prices.json";
  await delay(2000);

  return await axios<TModelPrice[]>({
    method: "GET",
    url,
  }).then((response) => {
    return response.data;
  });
};
