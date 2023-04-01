import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", () => {
  console.log(tweetInput.value);
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  }
});
function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
}
function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function getFeedHtml() {
  let feedHtml = ``;
  tweetsData.forEach((tweet) => {
    let likeIconClass = "";
    let sharedIconClass = "";

    tweet.isLiked ? (likeIconClass = "liked") : (likeIconClass = "");
    tweet.isRetweeted
      ? (sharedIconClass = "retweeted")
      : (sharedIconClass = "");
    // if (tweet.isLiked) {
    //   likeIconClass = "liked";
    // }
    // if (tweet.isRetweeted) {
    //   sharedIconClass = "retweeted";
    // }
    feedHtml += `
    <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply=${tweet.uuid}></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-like=${tweet.uuid}></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${sharedIconClass}" data-retweet=${tweet.uuid}></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
    </div>`;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
