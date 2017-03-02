import React, {PropTypes} from "react";
import {connect} from "react-redux";

class Redirect extends React.Component {
  componentDidMount() {
    return this.redirect();
  }

  componentDidUpdate() {
    return this.redirect();
  }

  redirect() {
    return fetch(this.props.uri + this.props.location.pathname.slice(3))
    .then(response => response.json())
    .then(json => {
      window.location.replace(json._embedded[0].url);
    })
    .catch(function(response) {
      console.error('ERRO', response);
    })
  }

  render() {
    return null;
  }
}

Redirect.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
      uri: state.uri
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);