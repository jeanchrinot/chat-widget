import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.VITE_NEXT_API_URL!,
})

export default apiClient

export const assetBaseUrl = process.env.VITE_NEXT_API_URL!
export const defaultAvatar = "/images/widget/avatar.jpg"
