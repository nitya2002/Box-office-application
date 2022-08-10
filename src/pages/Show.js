/* eslint-disable no-underscore-dangle */
import React from "react"
import {useParams} from 'react-router-dom';
import { useShow } from "../misc/Custom-hook";
import Cast from "../Shows/Cast";
import Details from "../Shows/Details";
import Seasons from "../Shows/Seasons";
import ShowMainData from "../Shows/ShowMainData";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";
// import {apiGet} from '../misc/config';



const Show = function() {
  
    const {id}=useParams();
    const {show,isLoading,error}=useShow(id);
    // console.log(show);
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