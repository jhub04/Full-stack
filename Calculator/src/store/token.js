import axios from "axios";
import { defineStore } from "pinia";
import {getJwtToken, getUserInfo} from "../utils/httputils.js"

export const useTokenStore = defineStore("token", {
    state: () => ({
      jwtToken: null,
      loggedInUser: null,
    }),
    persist: {
      storage: sessionStorage,
    },
  
  
    actions: {
      async getTokenAndSaveInStore(username, password, token) {
        try {
            let response = await getJwtToken(username, password, token);
            let data = response.data;
            if (data) {
                this.jwtToken = data;
                this.loggedInUser = username;
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                throw new Error("Invalid username or password");
            }
            throw new Error("An unexpected error occurred");
        }
    }
    },
  });
