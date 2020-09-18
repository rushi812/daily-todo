/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import firebase from '../firebase/firebase';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      const { history, userId } = this.props;
      const uid = localStorage.getItem('uid');
      firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
          if (!userId) {
            localStorage.setItem('uid', uid);
          } else if (userId) {
            localStorage.setItem('uid', userId);
          }
        } else {
          history.push('/login');
        }
      });
    }



    render() {
      return (
        <>
          <ComposedComponent />
        </>
      );
    }
  }

  Authentication.propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    userId: PropTypes.string,
  };

  Authentication.defaultProps = {
    userId: '',
  };

  const mapstateToProps = state => ({
    userId: state.auth.userId,
  });

  return connect(mapstateToProps, null)(withRouter(Authentication));
}
