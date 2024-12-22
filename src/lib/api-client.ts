import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEXT_API_URL!,
})

export default apiClient

export const assetBaseUrl = import.meta.env.VITE_NEXT_API_URL!
export const defaultAvatar = "/images/widget/avatar.jpg"
