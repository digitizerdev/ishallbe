export interface Pin {
  mature: {
    "commentCount": number,
    "comments": {
      "testCommentID1": {
        "content": string,
        "face": string,
        "id": string,
        "likeCount": number,
        "liked": boolean,
        "mine": boolean,
        "name": string,
        "pin": string,
        "rawTime": string,
        "time": string,
        "uid": string,
        "userLiked": boolean
      },
      "testCommentID2": {
        "content": string
        "face": string,
        "id": string,
        "likeCount": number,
        "liked": boolean,
        "likers": {
          "testCommentLikerID1": {
            "comment": string,
            "uid": string
          }
        },
        "mine": boolean,
        "name": string,
        "pin": string,
        "rawTime": string,
        "time": string,
        "uid": string,
        "userLiked": boolean
      }
    },
    "content": string,
    "date": string,
    "face": string,
    "flagged": boolean,
    "id": string,
    "image": boolean,
    "likeCount": number,
    "liked": boolean,
    "likerKey": string,
    "likers": {
      "testPinLikerID1": {
        "pin": string,
        "uid": string
      }
    },
    "name": string,
    "onFeed": boolean,
    "pinType": string,
    "time": number,
    "title": string,
    "uid": string,
    "url": string
  }
  new: {
    "commentCount": number,
    "content": string,
    "date": string,
    "face": string,
    "flagged": boolean,
    "id": string,
    "image": boolean,
    "likeCount": number,
    "liked": boolean,
    "likerKey": string,
    "name": string,
    "onFeed": boolean,
    "pinType": string,
    "time": number,
    "title": string,
    "uid": string,
    "url": string
  }
}

