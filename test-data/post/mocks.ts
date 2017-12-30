import { Post } from './model';
export const mockPost = {
  "mature": {
    "commentCount" : 2,
    "comments" : {
      "testComment1" : {
        "content" : "That was such a good time",
        "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
        "id" : "testComment1",
        "likeCount" : 0,
        "liked" : false,
        "mine" : true,
        "name" : "Troy DC Thompson",
        "post" : "-L07ooCD3QF-zuM_FZPd",
        "rawTime" : "153204",
        "time" : "Dec 14th, 2017 3:32 PM",
        "uid" : "testUID",
        "userLiked" : false
      },
      "testComment2" : {
        "content" : "Want to go back asap",
        "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
        "id" : "testComment2",
        "likeCount" : 1,
        "liked" : true,
        "likers" : {
          "testCommentLikerID1" : {
            "comment" : "-L0LiXVWxQ0BT3_oRysh",
            "uid" : "testUID",
            "id": "testKey"
          }
        },
        "mine" : true,
        "name" : "Troy DC Thompson",
        "post" : "-L07ooCD3QF-zuM_FZPd",
        "rawTime" : "153212",
        "time" : "Dec 14th, 2017 3:32 PM",
        "uid" : "testUID",
        "userLiked" : true
      }
    },
    "content" : "Portland Segway Tour",
    "date" : "20171211",
    "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
    "flagged" : false,
    "id" : "-L07ooCD3QF-zuM_FZPd",
    "image" : true,
    "likeCount" : 1,
    "liked" : true,
    "likerKey" : "-L07ooCD3QF-zuM_FZPd",
    "likers" : {
      "testPostLikerID1" : {
        "post" : "-L07ooCD3QF-zuM_FZPd",
        "uid" : "testUID",
        "id": "testKey"
      }
    },
    "name" : "Troy DC Thompson",
    "onFeed" : true,
    "postType" : "image",
    "time" : -20171211104453,
    "title" : "I Shall Be Adventurous ",
    "uid" : "testUID",
    "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2FtestUID%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e",
    "userLiked": true
  },
  "new": {
    "commentCount" : 0,
    "comments": null,
    "content" : "Portland Segway Tour",
    "date" : "20171211",
    "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
    "flagged" : false,
    "id" : "-L07ooCD3QF-zuM_FZPd",
    "image" : true,
    "likeCount" : 0,
    "liked" : false,
    "likers": null,
    "likerKey" : "-L07ooCD3QF-zuM_FZPd",
    "name" : "Troy DC Thompson",
    "onFeed" : true,
    "postType" : "image",
    "time" : -20171211104453,
    "title" : "I Shall Be Adventurous ",
    "uid" : "testUID",
    "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2FtestUID%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e",
    "userLiked": false
  }
}