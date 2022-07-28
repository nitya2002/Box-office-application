import React from 'react'
import Showsshow from './Showsshow'
import { Flexgrid } from '../styled';
import IMAGE_NOT_FOUND from '../images/not-found.png';

const Showsgrid =function  ({ data }) {
  return (<Flexgrid> {data.map((item)=>(<Showsshow key={item.show.id}
    id={item.show.id}
    name={item.show.name}
    image={item.show.image?item.show.image.medium:IMAGE_NOT_FOUND}
    summary={item.show.summary}
    />))}

</Flexgrid>
  );
};

export default Showsgrid