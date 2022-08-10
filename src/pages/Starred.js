import React,{useState,useEffect} from 'react'
import Mainpage from '../Components/Mainpage'
import { useShows } from '../misc/Custom-hook'
import Showsgrid from '../Shows/Showsgrid';

function Starred  ()  {
  const [starred]=useShows();
  
  const[shows,setShows]=useState(null);
  const [isLoading,setLoading]=useState(true);
  const [error,seterror]=useState(null);

  useEffect(()=>{
    if(starred &&starred.length>0){
      const promises=starred.map(showId=> fetch(`https://api.tvmaze.com/shows/${showId}`).then(r =>r.json()));
      Promise.all(promises).then(apiData=>apiData.map(show=>({show})))
      .then(result=>{
        setShows(result);
        setLoading(false);
      })
      .catch(err=>{
        seterror(err.message);
        setLoading(false);
      })
    }
  },[starred])


  return (
    <Mainpage>
      {isLoading&&<div>Shows are still Loading</div>}
      {error&&<div>Error occured {error}</div>}
      {!isLoading&&!shows&&<div>No shows</div>}
      {!isLoading&&!error&&shows&&<Showsgrid data={shows}/>}
    </Mainpage>
  )
}

export default Starred