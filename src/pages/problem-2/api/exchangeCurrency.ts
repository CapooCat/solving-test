import { delay } from "@/utils/deplay";
import type { TForm } from "../types/TForm";

export const exchangeCurrency = async (data: TForm) => {
  await delay(2000);
  return data;
};
