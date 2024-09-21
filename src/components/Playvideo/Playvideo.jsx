import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import Video from '../../pages/Video/Video'
import { API_KEY } from '../../data'
import { formatViews } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const Playvideo = () => {

  const {videoid} = useParams();

  const [apidata,setApidata] = useState(null);
  const [channeldata,setChanneldata] = useState(null);
  const [commentdata,setCommentdata] = useState([]);

  const fetchingvideodata = async () => {
    const videodetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoid}&key=${API_KEY}`;
    await fetch(videodetails_url).then(res=>res.json()).then(data=>setApidata(data.items[0]))
  }
  
  const fetchotherdata = async () => {
    // fetching channel data 
    const channeldata_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`
    await fetch(channeldata_url).then(res=>res.json()).then(data=>setChanneldata(data.items[0]));

    // fetching comment data
    const commentdata_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoid}&key=${API_KEY}`;
    await fetch(commentdata_url).then(res=>res.json()).then(data=>setCommentdata(data.items))
  }

  useEffect(()=>{
   fetchingvideodata()
  },[videoid])

  useEffect(()=>{
    fetchotherdata();
  },[apidata])
  

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoid}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h4>{apidata?apidata.snippet.title:"Title here"}</h4>
      <div className="play-video-info">
        <p>{apidata?formatViews(apidata.statistics.viewCount):"16k"} views &bull; {apidata?moment(apidata.snippet.publishedAt).fromNow():""} </p>
        <div>
          <span><img src={like} alt="" />{apidata?formatViews(apidata.statistics.likeCount):125}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
        <div>
          <p>{apidata?apidata.snippet.channelTitle:""}</p>
          <span>{channeldata?formatViews(channeldata.statistics.subscriberCount):"1M"} Subscibers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apidata?apidata.snippet.description.slice(0,350):"Description here"}</p>
        <hr />
        <h4>{apidata?formatViews(apidata.statistics.commentCount):120} Comments</h4>
        {
          commentdata.map((item,index)=>{
            return (
              <div key={index} className='comment'>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                 <h4> {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h4>
                 <p>  {item.snippet.topLevelComment.snippet.textDisplay} </p>
                 <div className='comment-action'>
                  <img src={like} alt="" />
                  <span> {formatViews(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                 </div>
               </div>
            </div>
            )
          })
        }
       
   
      </div>
    </div>
  )
}

export default Playvideo
