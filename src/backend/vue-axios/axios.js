/* global localStorage */

import axios from 'axios'

const API_URL = process.env.PAYMENTSPRING_GATEWAY_API_URL

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
