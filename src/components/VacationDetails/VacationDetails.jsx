import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VacationDetails.scss';
import moment from 'moment';

class VacationDetails extends Component {
  state = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={`${this.props.event.friends ? 'vacation-friends' : null } vacation-details`}>
       <h2>{this.props.event.title}</h2>
       <h3>
        {moment(this.props.event.start, 'YYYY-MM-DD').format('DD MMM YYYY')} to {moment(this.props.event.end, 'YYYY-MM-DD').format('DD MMM YYYY')}
       </h3>
       {this.props.event.location && <p>Location: {this.props.event.location}</p>}
       {this.props.event.additionalNotes && <p>Additional Notes: {this.props.event.additionalNotes}</p>}
      </section>
    );
  }
}

VacationDetails.propTypes = {
 event: PropTypes.object.isRequired
};

export default VacationDetails;
