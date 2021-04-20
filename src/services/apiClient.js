import axios from "axios"
import config from "config"

class ApiClient {
  constructor() {
    this.remoteHostUrl = config.remoteHostUrl
    this.token = null
  }

  setToken(token) {
    this.token = token
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`
    console.debug("API Call:", endpoint, data, method)
    const params = method === "get" ? data : {}
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token || ""}` : "",
    }

    try {
      const res = await axios({ url, method, data, params, headers })
      return { data: res.data, error: null, message: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response)
      if (error?.response?.status === 404) return { data: null, error: "Not found" }
      const message = error?.response?.data?.message
      return { data: null, error: error?.response, message }
    }
  }

  async fetchListings() {
    return await this.request({ endpoint: `listings/`, method: `GET` })
  }

  async createNewListing(listing) {
    return await this.request({ endpoint: `listings/`, method: `POST`, data: listing })
  }

  async getListingById(listingId) {
    return await this.request({ endpoint: `listings/${listingId}/`, method: `GET` })
  }

  async getBookingsForListing(listingId) {
    return await this.request({ endpoint: `transactions/listing/${listingId}/`, method: `GET` })
  }

  async bookListing({ listingId, startDate, endDate }) {
    return await this.request({
      endpoint: `transactions/listing/${listingId}/`,
      method: `POST`,
      data: { startDate, endDate },
    })
  }

  async fetchUserTransactions() {
    return await this.request({ endpoint: `transactions/me`, method: `GET` })
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `users/me/`, method: `GET` })
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: `auth/register/`, method: `POST`, data: credentials })
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: `auth/token/`, method: `POST`, data: credentials })
  }

  async logoutUser() {
    this.setToken(null)
    localStorage.setItem("kavholm_token", null)
  }
}

const API = new ApiClient()

export default API
