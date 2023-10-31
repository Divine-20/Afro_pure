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
}: PaginationOptionType): Promise<ResponseType<PaginationType<FarmerType>>> => {
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
export const get_all_farmers = async (): Promise<GetFarmerType> => {
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
export const get_stats = async (): Promise<StatsData> => {
  try {
    const response = await axios.get(
      `/farmers/stats`, {
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

export type StatsData = {
  message: "Success",
  status: "OK",
  timestamp: "2023-10-30T22:08:57.727872680"
  data: {
    farmers: 0,
    hassTrees: 0,
    fuerteTrees: 0,
    jumboTrees: 0
  };
};
