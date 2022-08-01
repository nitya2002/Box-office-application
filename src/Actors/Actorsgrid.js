import React from 'react';
import Actorsshow from './Actorsshow';
import IMAGE_NOT_FOUND from '../images/not-found.png';
import { Flexgrid } from '../styled';

const Actorsgrid = function({data}) {
  return (
    <Flexgrid>
      {data.map(({person})=>(
        <Actorsshow
        key={person.id}
        image={person.image?person.image.medium:IMAGE_NOT_FOUND}
        name={person.name}
        gender={person.gender}
        country={person.country?person.country.name:null}
        birthday={person.birthday}
        deathday={person.deathday}
        />
      ))};
    </Flexgrid>
  )
}

export default Actorsgrid