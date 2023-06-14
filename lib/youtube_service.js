import axios from 'axios';
var gapi = require('gapi')

function loadClient() {
    // TODO: determine API key and store it for use later when performing POST requests
    // gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}

function parseVideoUrlForId(url) {
    // the vId will always be the second item in the list after splitting on 'v='
    vId = String(url).split('v=')[1]
}

// Make sure the client is loaded before calling this method.
export function getVideoCommentsFromUrl(url) {
    // load the client()
    loadClient();
    var vId = parseVideoUrlForId(url)
    var allReplies = []
    
    return gapi.client.youtube.commentThreads.list({
        "part": [
            "replies"
        ],
        "videoId": vId
    }).then(function (response) {
        while (response.nextPageToken) {
            allReplies.push(
                response.map(function (res) {
                    // extract the reply data
                    if (res.replies) {
                        var replies = res.replies.comments
                        return replies
                    }
                    // if no replies do nothing
                })
            );
            // get next 100 replies if 'nextPageToken' is present in current response
            response = gapi.client.youtube.commentThreads.list({
                "part": [
                    "replies"
                ],
                "videoId": vId
            })
        }
        // add last of collected reply data to our collection
        allReplies.push(
            response.map(function (res) {
                // extract the reply data
                if (res.replies) {
                    var replies = res.replies.comments
                    return replies
                }
                // if no replies do nothing
            })
        );
        console.log("Response", response);
    }, function (err) {
        console.error("Execute error", err);
    });
}

gapi.load("client");