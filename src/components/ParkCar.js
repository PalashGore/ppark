import React from 'react';
import { withRouter} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import './components.css';

class ParkCar extends React.Component {

    constructor() {
        super();

        this.saveCarDetails = this.saveCarDetails.bind(this);

        this.state = {
            regNumberError: ''
        }
    }

    saveCarDetails(event) {
        event.preventDefault();
        const newCar = {
            name: this.name.value,
            phoneNumber: this.phoneNumber.value,
            regNumber: this.regNumber.value.toUpperCase()
        }

        if (newCar.regNumber === '') {
            this.setState ({
                regNumberError: 'Please enter Registration Number'
            });
        } else {
            this.props.parkCar(newCar);
            this.parkingForm.reset();
        }
    }

    render() {
        return (            
            <Jumbotron className="row">

                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h2> Park With Propark at - {this.props.parkLocation}  </h2> 
                    <hr />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 padding">                    
                    <form ref={(input) => this.parkingForm = input}>
                        <input ref={(input) => this.name = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Name" />
                        <input ref={(input) => this.phoneNumber = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Phone Number" />
                        <input ref={(input) => this.regNumber = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Registration Number" />
                        <span className="error">{this.state.regNumberError}</span>
                        <Button color="primary" size="sm" className="margin-top-20 float-right" onClick={(e) => this.saveCarDetails(e)}> SUBMIT </Button>               
                    </form>
                </div>

            </Jumbotron>            
        )
    }
}

export default withRouter(ParkCar);
