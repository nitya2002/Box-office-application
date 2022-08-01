/* eslint-disable no-underscore-dangle */
import React, { useEffect,useReducer} from "react"
import {useParams} from 'react-router-dom';
import Cast from "../Shows/Cast";
import Details from "../Shows/Details";
import Seasons from "../Shows/Seasons";
import ShowMainData from "../Shows/ShowMainData";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";
// import {apiGet} from '../misc/config';

const reducer=(prevState,action)=>{
  switch(action.type){
    case 'FETCH_SUCCESS':{
      return {show:action.show,isLoading:false,error:null,}
    }
    case 'FETCH_FAILED':{
      return {...prevState,error:action.error,isLoading:false}
    }
    default:
      return  prevState;
  }
}

const initializer={
  show:null,
  isLoading:true,
  error:null
}

const Show = function() {
  let isMounted=true;
    const {id}=useParams();
    const[{show,isLoading,error},dispatch]=useReducer(reducer,initializer)
    // const [show, setShow]=useState(null);
    // const [isLoading, setLoading]=useState(true);
    // const [error, setError]=useState(null);
    useEffect(()=>{
        fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`).then(r =>r.json()).then(result =>{
            if(isMounted){
            dispatch({type:'FETCH_SUCCESS',show:result});
            }
        }).catch((err)=>{
         dispatch({type:'FETCH_FAILED',error:err.message});
        })
        return ()=>{
          isMounted=false;
        }
    },[id])
    console.log(show);
    if(isLoading)
    return <div>The data is loading</div>
    if(error)
    return <div>Error is occured {error}</div>
  return (
    <ShowPageWrapper>
      <ShowMainData image={show.image} name={show.name} tags={show.genres} rating={show.rating} summary={show.summary} />
      <InfoBlock>
        <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered} />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast}/>
      </InfoBlock>
    </ShowPageWrapper>
  )
}

export default Show