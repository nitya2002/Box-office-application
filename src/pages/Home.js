import React,{useState}  from 'react';
import Actorsgrid from '../Actors/Actorsgrid';
import Mainpage from '../Components/Mainpage'
import CustomRadio from '../CustomRadio';
import { useLastQuery } from '../misc/Custom-hook';
import Showsgrid from '../Shows/Showsgrid';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

function Home  ()  {
const [input, setInput]=useLastQuery();
const [results,setResults]=useState(null);
const [searchOptions,setsearch]=useState('shows');
const onChanget  =(ev)=>{
    // console.log(ev.target.value);
    setInput(ev.target.value)
}
const ischecked=searchOptions==="shows";
const onSearch=()=>{
    // https://api.tvmaze.com/search/shows?q=girls
    if(searchOptions==="shows"){
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r =>r.json()).then(result =>{
        setResults(result);
       
    })
}
    if(searchOptions==="person"){
        fetch(`https://api.tvmaze.com/search/people?q=${input}`).then(r =>r.json()).then(result =>{
        setResults(result);
    })
}
}
const keyDown=(ev)=>{
    if(ev.keyCode===13){
        onSearch();
    }
}
const updatesearch=(ev)=>{
    setsearch(ev.target.value);
}
function renderResults(){
    if(results && results.length===0){
        return <div>No Result found</div>
    }
    if(results && results.length>0)
    return  results[0].show?<Showsgrid data={results}/>:<Actorsgrid data={results}/>
    return null;
}
  return (
    <Mainpage>
        <SearchInput type='text' onChange={onChanget} value={input} onKeyDown={keyDown}/><br/>

        <RadioInputsWrapper>
        <div>
            <CustomRadio
            label='Shows'
            id="search-shows"  value='shows' checked={ischecked} onChange={updatesearch}/>
        </div>
        <div>
        <CustomRadio
            label='Actors'
            id='search-actors'  checked={!ischecked} value='person' onChange={updatesearch}/>
        </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper>
        <button type="submit" onClick={onSearch}>Search</button>
        </SearchButtonWrapper>
        {renderResults()}
    </Mainpage>
  )
}

export default Home