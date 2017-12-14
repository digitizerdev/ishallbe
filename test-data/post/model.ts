export interface Post {
    "commentCount" : number,
    "comments" : {
      "testCommentID1" : {
        "content" : string,
        "face" : string,
        "id" : string,
        "likeCount" : number,
        "liked" : boolean,
        "mine" : boolean,
        "name" : string,
        "post" : string,
        "rawTime" : string,
        "time" : string,
        "uid" : string,
        "userLiked" : boolean
      },
      "testCommentID2" : {
        "content" : string
        "face" : string,
        "id" : string,
        "likeCount" : number,
        "liked" : boolean,
        "likers" : {
          "testCommentLikerID1" : {
            "comment" : string,
            "uid" : string
          }
        },
        "mine" : boolean,
        "name" : string,
        "post" : string,
        "rawTime" : string,
        "time" : string,
        "uid" : string,
        "userLiked" : boolean
      }
    },
    "content" : string,
    "date" : string,
    "face" : string,
    "flagged" : boolean,
    "id" : string,
    "image" : boolean,
    "likeCount" : number,
    "liked" : boolean,
    "likerKey" : string,
    "likers" : {
     "testPostLikerID1": {
        "post" : string,
        "uid" :  string
      }
    },
    "name" : string,
    "onFeed" : boolean,
    "postType" : string,
    "time" : number,
    "title" : string,
    "uid" : string,
    "url" : string
}

