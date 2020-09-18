import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../assets/styles/0-modules/shared/NoData.css';
import { formatedDate } from '../utils';

const NoData = ({ date }) => (
  <div className="no-data">
    <h2 className="heading">
      opps! No todos found
      {' '}
      <span className="road-block-emoji" role="img" aria-label="no-data">🚧</span>
    </h2>
    {
      moment(date).isBefore(formatedDate(new Date()))
        ? <></>
        : <p className="subHeading">Please add todos!</p>
    }
  </div>
);

NoData.propTypes = {
  date: PropTypes.string,
};

NoData.defaultProps = {
  date: '',
};

const mapStateToProps = state => ({
  date: state.todo.date,
});

export default connect(mapStateToProps)(NoData);
