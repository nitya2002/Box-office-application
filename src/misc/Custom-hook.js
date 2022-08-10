import {useReducer,useEffect,useState} from 'react';

function showsReducer(prevState,action){
    switch(action.type){
        case 'ADD':{
            return [...prevState,action.showId]
        }
        case 'REMOVE':{
            return prevState.filter((showId)=>showId!==action.showId);
        }
        default :return prevState;

    }
}

function usePresistantReducer(reducer,initialState,key){
    const [state,dispatch]=useReducer(reducer,initialState,initial=>{
        const presisted=localStorage.getItem(key);
        return presisted?JSON.parse(presisted):initial;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state));
    },[state,key]);

    return [state,dispatch];
   
}
export function useShows(key='shows'){
    return usePresistantReducer(showsReducer,[],key);
}

export function useLastQuery(key='lastQuery'){
    const [input, setInput] = useState(()=>{
        const presisted=sessionStorage.getItem(key);
        return presisted?JSON.parse(presisted): "";
    });
    const setPersistedInput=newState =>{
        setInput(newState);
        sessionStorage.setItem(key,JSON.stringify(newState));
    }
    return [input, setPersistedInput];
}
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
export function useShow(showId){
    const[state,dispatch]=useReducer(reducer,{
        show:null,
        isLoading:true,
        error:null
      })
    // const [show, setShow]=useState(null);
    // const [isLoading, setLoading]=useState(true);
    // const [error, setError]=useState(null);
    useEffect(()=>{
        let isMounted=true;
        fetch(`https://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=cast`).then(r =>r.json()).then(result =>{
            if(isMounted){
            dispatch({type:'FETCH_SUCCESS',show:result});
            }
        }).catch((err)=>{
         dispatch({type:'FETCH_FAILED',error:err.message});
        })
        return ()=>{
          isMounted=false;
        }
    },[showId])
    return state;
}