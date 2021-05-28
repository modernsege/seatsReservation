import React from 'react';
import UserInput from './components/userInputSite';
import Seats from './components/seats';
import Summary from './components/summaryPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
    <div className="wrapper"> 
    <Switch>
      <Route path = "/" exact component={UserInput}/>
      <Route path = "/seats" component={Seats}/>
      <Route path = "/summary" component={Summary}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
