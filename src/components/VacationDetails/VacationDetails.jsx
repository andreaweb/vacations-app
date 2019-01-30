import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VacationDetails.scss';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PencilIcon from '@material-ui/icons/Edit';
import PencilOutlinedIcon from '@material-ui/icons/EditOutlined';

class VacationDetails extends Component {
  state = {

  };

  constructor(props) {
    super(props);
  }

  handleDelete = () => {

  }

  handleEdit = () => {
    this.props.history.push('/new/null/'+this.props.event.id);
  }

  render() {
    return (
      <section className={`${this.props.event.friends ? 'vacation-friends' : null } vacation-details`}>
       <header className="vacation-header">
        <h2>{this.props.event.title}</h2>
        {!this.props.event.friends &&
          <div className="icons-container">
            <button className="control-icons" onClick={this.handleDelete}>
              <DeleteIcon />
              <DeleteOutlinedIcon />
            </button>
            <button className="control-icons" onClick={this.handleEdit}>
              <PencilIcon />
              <PencilOutlinedIcon />
            </button>
          </div>
        }
       </header> 
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
 event: PropTypes.object.isRequired,
 history: PropTypes.object.isRequired
};

export default VacationDetails;
