import React from 'react'
import Navs from './Navs'
import Title from './Title'

function Mainpage  ({children}){
  return (
    <div>
        <Title title="Box Office" subtitle="Are you looking for movie or actor?"/>
        <Navs/>
        {children}
    </div>
  )
}

export default Mainpage