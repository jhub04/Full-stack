import axios from "axios"

// Takes username and password as parameters, sends http post request to server, and in response gets a JWT token from the server
export const getJwtToken = (username, password) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    return axios.post("http://localhost:8080/token", JSON.stringify({ username, password }), config);
}

// Takes username and token as params, the token will be used in the header for authentication. The username is used to get information about the user. 
export const getUserInfo = (username, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization" : "Bearer " + token
        },
    };
    return axios.get("http://localhost:8080/users/"+username, config);
}


