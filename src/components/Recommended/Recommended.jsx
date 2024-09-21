import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { formatViews } from '../../data'
const Recommended = ({categoryId}) => {
    const [apidata,setApidata] = useState([]);

    const fetchdata = async () => {
        const relatedvideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=23&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
        // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(relatedvideo_url).then(res=>res.json()).then(data=>setApidata(data.items));
    }

    useEffect(()=>{
       fetchdata()
    },[categoryId])
  return (
    <div className='recommended'>
        {
            apidata.map((item,index)=>{
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className='vid-info'>
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{formatViews(item.statistics.viewCount)} views</p>
                    </div>
                </Link>
                )
            })
        }
    </div>
  )
}

export default Recommended
