import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

import './FeedbackForm.css';

class FeedbackForm extends React.Component {

    constructor() {
        super();
        this.submitFeedback = this.submitFeedback.bind(this);
    }

    submitFeedback(event) {
        event.preventDefault();
        const Feedback = {
            name : this.name.value,
            email : this.email.value,
            phoneNumber : this.phoneNumber.value,
            issue: this.issue.value
        }

        console.log(Feedback);
        this.feedbackForm.reset();

    }

    render() {
        return (
            <Jumbotron className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h2> Feedback Form </h2>
                    <hr />
                </div>                
                <div className="col-lg-12 col-md-12 col-sm-12 padding">
                    <form ref={(input) => this.feedbackForm = input} className="" onClick={this.submitFeedback}>
                        <input ref={(input) => this.name = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Name" />
                        <input ref={(input) => this.email = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Email" />
                        <input ref={(input) => this.phoneNumber = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Phone Number" />
                        <textarea ref={(input) => this.issue = input} className="col-lg-12 col-md-12 col-sm-12 margin-top-20" type="text" placeholder="Enter the feedback" />
                        <Button color="primary" size="sm" className="margin-top-20 float-right"> SUBMIT </Button>               
                    </form>
                </div>
            </Jumbotron>
        )
    }
}

export default FeedbackForm;