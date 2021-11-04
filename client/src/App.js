import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import EventProfile from './components/EventProfile';
import Map from './pages/Map'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/map" component={Map} />
          <Route exact path="/map/:id" render={props => <EventProfile {...props} /> } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
