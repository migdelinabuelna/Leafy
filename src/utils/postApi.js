// we need to use the tokenService to get the toke out of local storage
import tokenService from "./tokenService"
const BASE_URL = '/api/posts/'; /// I need an explanation as to how this connects with server.js and our backend routes

export function create(data){
    console.log(data);
    return fetch(BASE_URL, {
        method: "POST",
        body: data, //remember you dot not need to jaansofi since we are sending a multipart/formdata request
        headers: { //sending awt auth heder. (AFTER WE LOG IN> IN ALL OF OF OUR REQUESTS WE HAVE TO SEND THIS ALONG)
            Authorization: "Bearer " + tokenService.getToken()
            //so the server knows who the request is coming from when the client is trying to make a POST 
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json()

        throw new Error("Something went wron in create Post");
    })
}

//this function is being called in FeedPage when our useEffect runs when the component loads in order to get all the posts
export function getAll() {
    return fetch(BASE_URL, {
        headers: { //we have to send the headers in every request that we'll be logged in for
            Authorization: "Bearer " + tokenService.getToken() //tokenService.getToken gets the token out of local storage and send it along on our api request
            // 'Authorization': 'Brearer ' is the convention for sending in JWTS
        }
    })
    .then(res => res.json()); //this is returning the json object that was given to us by the 
}

export function deletePost(postId) {
    return fetch(BASE_URL + postId, { //technically /api/posts/postId
        method: 'DELETE', //be sure to defile the route otherwise routes will automatically think it is GET
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function addComment(postId, comment) {
    console.log(comment,'checking api post add commment function')
    return fetch(`${BASE_URL}${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({comment}), //we need to jsonfy since we are NOOOOOT sending a multipart/formdata
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json());
}