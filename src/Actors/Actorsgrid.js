import React from 'react';
import Actorsshow from './Actorsshow';
import IMAGE_NOT_FOUND from '../images/not-found.png';

const Actorsgrid = function({data}) {
  return (
    <div>
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
    </div>
  )
}

export default Actorsgrid