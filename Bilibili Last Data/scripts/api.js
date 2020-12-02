async function fetchUpVideos(mid, pn = 1, ps = 2) {
  const url = `https://api.bilibili.com/x/space/arc/search?mid=${mid}&pn=${pn}&ps=${ps}&jsonp=jsonp`;
  const videosData = await $http.get(url);
  return videosData.data.data.list.vlist;
}

async function fetchVideoStats(bvid) {
  const url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bvid;
  const videoData = await $http.get(url);
  
  let videoStat = videoData.data.data.stat
//  拿出 pic 地址，放入返回的 object 中
//  videoStat.pic = $image(videoData.data.data.pic)
//  videoStat.face = $image(videoData.data.data.owner.face)
  videoStat.title = videoData.data.data.title;
  videoStat.link = `https://www.bilibili.com/video/${bvid}/`;
  return videoStat
}


async function reloadData(mid){
  const savedData = $cache.get("last_video_stat");
  
  try {
    const videos = await fetchUpVideos(mid = mid);
    const lastBid = videos[0].bvid;
    const lastVideoStat = await fetchVideoStats(bvid = lastBid);
    $cache.setAsync({
      key: "last_video_stat",
      value: lastVideoStat
    })
    return lastVideoStat
  } catch (e) {
    console.log(e)
    return savedData;
  }
  
}


//const videos = await fetchUpVideos(mid = "51019590");
//const lastBid = videos[0].bvid
//console.info(lastBid)

//const lastVideoStat = await fetchVideoStats(bvid = lastBid);
//console.info(lastVideoStat)

module.exports = {
  reloadData: reloadData
}

