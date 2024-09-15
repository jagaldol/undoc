import axios from "axios"

const proxy = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
})

export default proxy
