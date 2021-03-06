import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import App from './App';
import ParkingLocation from './components/ParkingLocation';
import ParkingArea from './components/ParkingArea';

//Set the routes for app. 
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
