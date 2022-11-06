let apiKey = "AIzaSyB6C9F4kuT2yfmrSnqyonIeLgumk5GLgL8";
let bodyDiv = document.querySelector(".body");
let numberOfVideos = 50;
let apiHttp = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&chart=mostPopular&maxResults=${numberOfVideos}&regionCode=MA`;
let input = document.querySelector(".header .input-container .input input");
let searchBtn = document.querySelector(
  ".header .input-container .input .search"
);
let publishTime;
let todayDate = new Date();

fetch(apiHttp)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      channelIcon(item);
    });
  })
  .catch((err) => console.log(err));

function channelIcon(videoData) {
  let channelApi = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&id=${videoData.snippet.channelId}`;
  fetch(channelApi)
    .then((res) => res.json())
    .then((data) => {
      videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeDivs(videoData);
    })
    .catch((err) => console.log(err));
}

function makeDivs(data) {
  publishTime = new Date(data.snippet.publishedAt).getTime();
  let dateDiff = todayDate - publishTime;
  let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  //  i used just days - hours - minutes - seconds because chart: "mostPopular"
  let box = document.createElement("div");
  box.className = "box";
  let videoImage = document.createElement("img");
  videoImage.className = "video-img";
  videoImage.src = data.snippet.thumbnails.high.url;
  box.append(videoImage);
  let chaineDiv = document.createElement("div");
  chaineDiv.className = "chaine";
  let iconImage = document.createElement("img");
  iconImage.className = "icon-img";
  iconImage.src = data.channelThumbnail;
  chaineDiv.append(iconImage);
  box.append(chaineDiv);
  let infoDiv = document.createElement("div");
  infoDiv.className = "info";
  let linkDiv = document.createElement("a");
  linkDiv.href = `https://youtube.com/watch?v=${data.id}`;
  linkDiv.append(data.snippet.title);
  infoDiv.append(linkDiv);
  let chaineName = document.createElement("div");
  chaineName.className = "title";
  chaineName.append(data.snippet.channelTitle);
  let timeAgo = document.createElement("p");
  if (days > 0) {
    timeAgo.append(`${days} ${days > 1 ? "days" : "day"} ago`);
  } else if (hours > 0) {
    timeAgo.append(`${hours} ${hours > 1 ? "hours" : "hour"} ago`);
  } else if (minutes > 0) {
    timeAgo.append(`${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`);
  } else {
    timeAgo.append(`${seconds} ${seconds > 1 ? "seconds" : "second"} ago`);
  }
  infoDiv.append(chaineName);
  infoDiv.append(timeAgo);
  chaineDiv.append(infoDiv);
  bodyDiv.append(box);
}

input.addEventListener("change", () => {
  if (input.value != "") {
    location.href =
      "https://www.youtube.com/results?search_query=" + input.value;
    input.value = "";
  }
});
