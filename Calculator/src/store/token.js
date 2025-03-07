import axios from "axios";
import { defineStore } from "pinia";
import {getJwtToken, getUserInfo} from "../utils/httputils.js"

export const useTokenStore = defineStore("token", {
    state: () => ({
      jwtToken: null,
      loggedInUser: null,
    }),
  
    actions: {
      async getTokenAndSaveInStore(username, password) {
          try{
              let response = await getJwtToken(username, password);
              let data = response.data;
              if(data != null && data != '' && data != undefined){
                  this.jwtToken = data;
                  let userResponse = await getUserInfo(username, data.token)
                  this.loggedInUser = userResponse.data;
              }
          } catch (err){
              console.log(err)
          }
      }
    },
  });
