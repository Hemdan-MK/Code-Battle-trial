import { axiosInstance } from "../axios/axiosInstance";

export const getDashboardStats = async () => {
    const response = await axiosInstance.get("/admin/dashboard/stats");
    return response.data;
};
