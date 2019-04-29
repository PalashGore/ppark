import React from 'react';
import { withRouter} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import logo from '../logo.svg';
import '../App.css';
import './components.css';

class ParkingLocation extends React.Component {

    constructor() {
        super();
        this.goToLocation = this.goToLocation.bind(this);
    }

    //Get the input selection and push to new location. 
    goToLocation(event) {
        event.preventDefault();
        const location = this.location.value;
        this.props.history.push(`/location/${location}`);
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>            
                <Jumbotron className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h2> Enter a Parking Location </h2>
                        <hr />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 padding">                            
                        <form onSubmit={(e) => this.goToLocation(e)}>
                            <select ref={(input) => this.location = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20">
                                <option value="Hartford">Hartford</option>
                                <option value="New York">New York</option>
                            </select>
                            <Button color="primary" size="sm" className="margin-top-20 float-right"> SUBMIT </Button>   
                        </form>
                    </div>
                </Jumbotron>
            </div>
        )
    }
}

export default withRouter(ParkingLocation);