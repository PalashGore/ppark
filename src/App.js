import React, { Component } from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
import { Jumbotron, Table } from 'reactstrap';
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
      cars: {}
    };
  }

  componentWillMount() {
    const cars = { ...this.state.cars };
    console.log(cars);
    axios.get('http://localhost:4000/cars', {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        const storedCars = res.data;
        const length = storedCars['data'].length;
        for (let i = 0; i < length; i++) {
          cars[i+1] = storedCars['data'][i];
        }

        this.setState({ cars: cars });
    })
  }

  parkedCars(newCar) {
    const cars = { ...this.state.cars };

    axios.post(`http://localhost:4000/park`, {newCar}, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  removeCar() {

  };

  render() {
    const cars = { ...this.state.cars };
    const isEmpty = !Object.keys(this.state.cars).length ? true : false;
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
                  Object.keys(cars).map(key => <ParkingArea key={key} carDetails={cars[key]} removeCar={this.removeCar}  />) 
                }             
              </tbody>
            </Table>
          </Jumbotron>
        : null }
      </div>
    )
  }
}

export default withRouter(App);
