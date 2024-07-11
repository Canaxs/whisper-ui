import { environment } from "@/environments/environments";
import axios from "axios";

export const getMenus = (page=0) => {
    return axios.get(environment.baseUrl+"/whisper/categoryNames");
};