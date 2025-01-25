import axios from "axios";
import { revalidatePath } from "next/cache";


const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api/v1";

export const api = axios.create({
  baseURL,
});
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return error;
};
export const revalidateDynamicPath = (path) => {
  revalidatePath(path);
};
