import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';
// import { useTheme } from './misc/custom-hook.js';
function App() {

  return <div>
  
  <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/starred'><Starred/></Route>
      <Route exact path='/show/:id'><Show/></Route>
      </Switch>
      </div>
}

export default App;