function requestFailed(resp) {
  return resp == null || resp.response == null || resp.response.statusCode != 200;
}

async function reloadData(mid) {
  const statsKey = mid + "_stats";
  const savedStats = $cache.get(statsKey);

  // get Up last video
  const upDataUrl = `https://api.bilibili.com/x/space/arc/search?mid=${mid}&pn=1&ps=1&jsonp=jsonp`;
  const upVideosResp = await $http.get(upDataUrl);
  if (requestFailed(upVideosResp)) {
    return savedStats;
  }
  const upVideosList = upVideosResp.data.data.list.vlist;
  const lastBid = upVideosList[0].bvid;

  // get last video’s data
  const videoUrl = "https://api.bilibili.com/x/web-interface/view?bvid=" + lastBid;
  const videoDataResp = await $http.get(videoUrl);
  if (requestFailed(videoDataResp)) {
    return savedStats;
  }
  const videoData = videoDataResp.data.data;

  // get return values
  let videoStats = videoData.stat;
  videoStats.title = videoData.title;
  videoStats.link = `https://www.bilibili.com/video/${lastBid}/`;
  $cache.set(statsKey, videoStats);
  return videoStats;
}


//const videoStat = await reloadData("51019590");
//console.log(videoStat);

module.exports = {
  reloadData: reloadData
}
