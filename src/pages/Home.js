import React,{useState}  from 'react';
import Actorsgrid from '../Actors/Actorsgrid';
import Mainpage from '../Components/Mainpage'
import Showsgrid from '../Shows/Showsgrid';

function Home  ()  {
const [input, setInput]=useState('');
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
        console.log(result);
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
        <input type='text' onChange={onChanget} value={input} onKeyDown={keyDown}/><br/>
        <label htmlFor='search-shows'>
        Shows
         <input id="search-shows" type="radio" value='shows' checked={ischecked} onChange={updatesearch}/>
        </label>
        <label htmlFor='search-actors'>
            Actors
            <input id='search-actors' type="radio" checked={!ischecked} value='person' onChange={updatesearch}/>
        </label><br/>
        <button type="submit" onClick={onSearch}>Search</button>
        {renderResults()}
    </Mainpage>
  )
}

export default Home