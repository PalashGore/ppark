import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import App from './App';
import ParkingLocation from './components/ParkingLocation';
import ParkingArea from './components/ParkingArea';


const Main = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={ParkingLocation} />
                <Route exact path="/location/:location" component={App} />
                <Route exact path="/location/parking-space" component={ParkingArea} />
            </div>
        </Router>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
