import React,{useState}  from 'react'
import Mainpage from '../Components/Mainpage'

function Home  ()  {
const [input, setInput]=useState('');
const [results,setResults]=useState(null);
const onChanget  =(ev)=>{
    // console.log(ev.target.value);
    setInput(ev.target.value)
}
const onSearch=()=>{
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r =>r.json()).then(result =>{
        setResults(result);
        console.log(result);
    })
}
const keyDown=(ev)=>{
    if(ev.keyCode===13){
        onSearch();
    }
}
function renderResults(){
    if(results && results.length===0){
        return <div>No Result found</div>
    }
    if(results && results.length>0)
    return <div>{results.map(item=> (<div key={item.show.id}>{item.show.name} </div>))}</div>
    return null;
}
  return (
    <Mainpage>
        <input type='text' onChange={onChanget} value={input} onKeyDown={keyDown}/>
        <button type="submit" onClick={onSearch}>Search</button>
        {renderResults()}
    </Mainpage>
  )
}

export default Home