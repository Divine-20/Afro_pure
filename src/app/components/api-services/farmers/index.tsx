import { FarmerType } from "../../types/farmers.type";
import { CustomError } from "../../libs/response";
import { axios } from "../axios";
import {
  PaginationOptionType,
  PaginationType
} from "../../types/pagination.type";
import { ResponseType } from "../../types/response.type";
import authHeader from "../auth-header";

export const get_farmers = async ({
  page,
  size,
  }:PaginationOptionType): Promise<ResponseType<PaginationType<FarmerType>>> => {
  try {
    const query = `page=${page ?? 1}&limit=${size ?? 5}`;
    const response = await axios.get(
      `/farmers/paginated?${query}`, {
        headers: authHeader()
      }
    );
    return response.data;
  } catch (error: any) {
    throw new CustomError(error);
  }
}
export const get_all_farmers = async ():Promise<GetFarmerType> =>{
  try {
    const response = await axios.get(
      `/farmers/list`, {
        headers: authHeader()
      }
    );
    return response.data;
  } catch (error: any) {
    throw new CustomError(error);
  }
}
export type GetFarmerType = {
  success: true;
  message: null;
  data: {
    farmers: FarmerType[];
    totalPages: number;
    totalElements: number;
  };
};
