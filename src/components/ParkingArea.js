import React from 'react';
import { withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';

class ParkingArea extends React.Component {

    render() {
        return (        
            <tr>
                <td> {this.props.carDetails.name ? this.props.carDetails.name : 'N/A' }</td>
                <td> {this.props.carDetails.phoneNumber ? this.props.carDetails.phoneNumber : 'N/A'} </td>
                <td> {this.props.carDetails.regNumber}</td>
                <td> <Button color="primary" size="sm" onClick={this.props.removeCar(this.props.index)}> REMOVE </Button> </td>
            </tr>
        )
    }
}

export default withRouter(ParkingArea);