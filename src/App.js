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

    this.parkCar = this.parkCar.bind(this);
    this.removeParkedCar = this.removeParkedCar.bind(this);

    this.state = {
      cars: {}
    };
  }

  componentDidMount() {
    const cars = { ...this.state.cars };
    axios.get('/cars', {
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

      this.setState({ 
        cars: cars
      });
      
    })
  };

  parkCar(newCar) {
    const cars = { ...this.state.cars };
    const regNumber = newCar.regNumber;
    cars[regNumber] = newCar;
    axios.post(`/park`, {newCar}, {
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

      this.setState({ 
        cars: cars,
      });
  };

  removeParkedCar(index, regNumber) {
    const cars = { ...this.state.cars };
    //Delete the key value from object
    const key = index ? index : regNumber;
    delete cars[key];
    this.setState ({
        cars: cars
    });

    //Delete the data from db
    axios.post(`/leave`, {regNumber}, {
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

    this.setState({ 
      cars: cars
    });
  };

  render() {
    const cars = { ...this.state.cars };
    const isEmpty = !Object.keys(this.state.cars).length ? true : false;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ParkCar parkCar={this.parkCar} parkLocation={this.props.match.params.location} />
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
                  Object.keys(cars).map(key => <ParkingArea key={key} index={key} carDetails={cars[key]} removeParkedCar={this.removeParkedCar} />)
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
