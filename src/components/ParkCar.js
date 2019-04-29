import React from 'react';
import { withRouter} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import './components.css';

class ParkCar extends React.Component {

    constructor() {
        super();

        this.saveCarDetails = this.saveCarDetails.bind(this);

        //Set the initial state of the component.
        this.state = {
            car: {
                name: '',
                phoneNumber: '',
                regNumber: ''
            },
            nameError: '',
            phoneNumberError: '',
            regNumberError: ''
        }
    }

    //validate the form input, display errors if any, set the error state, reset all on sucessful submit. 
    saveCarDetails(event) {
        event.preventDefault();
        const newCar = {
            name: this.name.value,
            phoneNumber: this.phoneNumber.value,
            regNumber: this.regNumber.value.toUpperCase()
        }

        this.setState({ car: newCar });

        if (!newCar.name) {
            this.setState ({
                nameError: 'Please enter your Name.',
                phoneNumberError: '',
                regNumberError: ''
            });
        } else if (!newCar.phoneNumber) {
            this.setState ({
                phoneNumberError: 'Please enter your Phone Number.',
                nameError: '',
                regNumberError: ''
            });
        } else if (!newCar.regNumber) {
            this.setState ({
                regNumberError: 'Please enter your car\'s Registration Number.',
                nameError: '',
                phoneNumberError: ''
            });
        } else {
            this.setState ({
                car: {},
                regNumberError: '',
                nameError: '',
                phoneNumberError: ''
            });
            this.parkingForm.reset();
            this.props.parkCar(newCar);
            
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
                        <input ref={(input) => this.name = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" defaultValue={this.state.car.name} type="text" placeholder="Name" />
                        <span className="error">{this.state.nameError}</span>
                        <input ref={(input) => this.phoneNumber = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" defaultValue={this.state.car.phoneNumber} type="text" placeholder="Phone Number" />
                        <span className="error">{this.state.phoneNumberError}</span>
                        <input ref={(input) => this.regNumber = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" defaultValue={this.state.car.regNumber} type="text" placeholder="Registration Number" />
                        <span className="error">{this.state.regNumberError}</span>
                        <Button color="primary" size="sm" className="margin-top-20 float-right" onClick={(e) => this.saveCarDetails(e)}> SUBMIT </Button>                               
                    </form>
                </div>

            </Jumbotron>            
        )
    }
}

export default withRouter(ParkCar);
