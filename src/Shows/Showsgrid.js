import React from 'react'
import Showsshow from './Showsshow'
import { Flexgrid } from '../styled';
import IMAGE_NOT_FOUND from '../images/not-found.png';
import { useShows } from '../misc/Custom-hook';

const Showsgrid =function  ({ data }) {
  const [starredShows,dispatchStarred]=useShows();


  return (
  <Flexgrid> {data.map((item)=>{
    const isStarred=starredShows.includes(item.show.id);
    const onstarClick=()=>{
      if(isStarred){
        dispatchStarred({type:'REMOVE',showId:item.show.id});
      }else dispatchStarred({type:'ADD',showId:item.show.id});
    }
 return (<Showsshow key={item.show.id}
    id={item.show.id}
    name={item.show.name}
    image={item.show.image?item.show.image.medium:IMAGE_NOT_FOUND}
    summary={item.show.summary}
   onstarClick={onstarClick}
   isStarred={isStarred}
    />
    );
  
})}

</Flexgrid>
  );
};

export default Showsgrid