// we need to use the tokenService to get the toke out of local storage
import tokenService from "./tokenService"

const BASE_URL = '/api/posts';

//request to create a POST
export function create(data){
    console.log(data);
    return fetch(BASE_URL, {
        method: "POST",
        body: data, //remember you dot not need to jaansofi since we are sending a multipart/fordata request
        headers: { //sending awt auth heder. (AFTER WE LOG IN> IN ALL OF OF OUR REQUESTS WE HAVE TO SEND THIS ALONG)
            Authorization: "Bearer " + tokenService.getToken()
            //so the server knows who the request is coming from when the client is trying to make a POST 
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json()

        throw new Error("Something went wron in create Post");
    })
}

