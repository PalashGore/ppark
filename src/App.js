import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Jumbotron, Table, Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import ParkCar from './components/ParkCar';
import ParkingArea from './components/ParkingArea';



class App extends Component {

  constructor() {
    super();

    this.parkedCars = this.parkedCars.bind(this);
    this.removeCar = this.removeCar.bind(this);

    this.state = {
      cars: {},
      formStatus: true
    };

  }

  getParkedCars() {
    fetch('http://localhost:4000/cars')
    .then(response => response.json())
    .then(response => this.setState({ car: response.data }))
    .catch(err => console.log(err))
  }

  storeParkedCars(cars) {
    const {name, phoneNumber, regNumber } = cars;
    fetch(`http://localhost:4000/park?name=${name}&phoneNumber=${phoneNumber}&regNumber=${regNumber}`)
      .then(this.getParkedCars)
      .catch(err => console.error(err))
  }

  parkedCars(newCar) {
    const cars = {...this.state.cars};
    const regNumber = newCar.regNumber;
    cars[`${regNumber}`] = newCar;
    this.setState({ 
      cars: cars
    });

    this.storeParkedCars(cars);
  };

  removeCar() {

  };

  render() {
    const isEmpty = Object.keys(this.state.cars).length === 0 ? true : false;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ParkCar parkCar={this.parkedCars} parkLocation={this.props.match.params.location} />
          { !isEmpty ? 
            <Jumbotron className="row">
              <Table striped> 
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Car Registration</th>
                    <th>Remove Car</th>
                  </tr>
                </thead>
                <tbody>              
                  {                          
                    Object.keys(this.state.cars).map(key => <ParkingArea key={key} index={key} carDetails={this.state.cars[key]} removeCar={this.removeCar}  />) 
                  }             
                </tbody>
              </Table>
            </Jumbotron> 
          : null }
          <Button color="primary" size="sm" className="margin-top-20 float-right" onClick={this.getParkedCars}> GET CARS </Button>
      </div>
    )
  }
}

export default withRouter(App);
