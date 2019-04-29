import React from 'react';
import { withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';

class ParkingArea extends React.Component {
    render() {
        const { index, carDetails } = this.props;
        return (        
            <tr>
                {/* Conditional rendering of variables. */}
                <td> {carDetails.name ? carDetails.name : 'N/A' }</td>
                <td> {carDetails.phoneNumber ? carDetails.phoneNumber : 'N/A'} </td>
                <td> {carDetails.regNumber}</td>
                <td> <Button color="primary" size="sm" onClick={() => this.props.removeParkedCar(index, carDetails.regNumber)}> REMOVE </Button> </td>
            </tr>
        )
    }
}

export default withRouter(ParkingArea);