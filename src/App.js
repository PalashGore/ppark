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

    //Bind methods to App Component.
    this.parkCar = this.parkCar.bind(this);
    this.removeParkedCar = this.removeParkedCar.bind(this);

    //Set the initial state of the App.
    this.state = {
      cars: {}
    };
  }

  //After elements render get all the cars from API adn set current the state.
  componentDidMount() {
    const cars = { ...this.state.cars };
    axios.get('/api/cars', {
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

  //Method to store a new car in the db and update the state
  parkCar(newCar) {
    const cars = { ...this.state.cars };
    const regNumber = newCar.regNumber;
    cars[regNumber] = newCar;
    axios.post(`/api/park`, {newCar}, {
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

  //Remove car method to delete the car from db and cars object, update the state. 
  removeParkedCar(index, regNumber) {
    const cars = { ...this.state.cars };
    //Delete the key value from object
    const key = index ? index : regNumber;
    delete cars[key];
    this.setState ({
        cars: cars
    });

    //Delete the data from db
    axios.post(`/api/leave`, {regNumber}, {
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
        {/* Render the form Component. */}
        <ParkCar parkCar={this.parkCar} parkLocation={this.props.match.params.location} />
        {/* Condition rendering of component on isEmpty. */}
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
              {/* Convert the object to array and for each key, value display a row component. */}
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
