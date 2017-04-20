import React from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import FontIcon from "material-ui/FontIcon";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import Avatar from "material-ui/Avatar";

import { updateUser, syncUser } from "../actions/user";

class LeftMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      user: this.props.user
    };

    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.logoff = this.logoff.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
      user: nextProps.user
    });
  }

  responseGoogle(response) {
    let user = this.props.user;
    if (!response.error) {
      // eslint-disable-next-line prefer-template
      const userName = response.profileObj.givenName.concat(" " + response.profileObj.familyName);
      user = {
        accessToken: response.tokenId,
        id: response.googleId,
        name: userName,
        email: response.profileObj.email,
        picture: response.profileObj.imageUrl
      };
    }

    this.context.router.push({
      pathname: "/"
    });
    this.props.updateUser(user, "GOOGLE");
  }

  responseFacebook(response) {
    let user = this.props.user;

    if (response.accessToken !== "") {
      user = {
        accessToken: response.accessToken,
        id: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      };
    }

    this.context.router.push({
      pathname: "/"
    });
    this.props.updateUser(user, "FACEBOOK");
  }

  logoff() {
    this.props.updateUser({}, "LOGOFF");
  }

  _facebookLogin() {
    return (<FacebookLogin
      appId="1953192988244454"
      isMobile={true}
      autoLoad={false}
      size="metro"
      fields="name,email,picture"
      callback={(response) => this.responseFacebook(response)}
      icon="fa-facebook"
    />);
  }

  _googleLogin() {
    const style = {
      display: "inline-block",
      background: "rgb(209, 72, 54)",
      color: "rgb(255, 255, 255)",
      width: "200px",
      height: "70px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      fontFamily: "Roboto",
      border: "0px solid transparent"
    };

    return (<GoogleLogin
      clientId="844708446485-5094nprkc5sv291td3fb2n1aqmgl3g8c.apps.googleusercontent.com"
      onSuccess={(response) => this.responseGoogle(response)}
      onFailure={(response) => this.responseGoogle(response)}
      style={style}
      autoLoad={false}
      approvalPrompt="force"
      >
        <i className="fa fa-google" />
        <span> LOGIN WITH<br /> GOOGLE</span>
      </GoogleLogin>);
  }

  _userLogged() {
    return (<div>
      <div style={{ display: "inline" }}>
        <div style={{ padding: 5, width: "50px", float: "left" }}>
          <Avatar src={this.state.user.picture} />
        </div>
        <div style={{ float: "left", marginTop: "10px" }}>
          {this.state.user.name} <br />
          <small>{this.state.user.email}</small>
        </div>
      </div>

      <FlatButton
        label="Logout"
        labelPosition="before"
        icon = { <FontIcon className="material-icons">exit_to_app</FontIcon> }
        style={{ marginTop: "20px", width: "100%" }}
        hoverColor="#CF2F17"
        backgroundColor="#CF2F17"
        onTouchTap={() => { this.logoff(); }}
      />
    </div>);
  }

  render() {
    if (this.state.user.accessToken && this.state.user.accessToken !== "") {
      return (<Drawer width={200}
        docked={false}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        {this._userLogged()}
      </Drawer>);
    }

    return (<Drawer width={200}
      docked={false}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}>
      {this._facebookLogin()}
      {this._googleLogin()}
    </Drawer>);
  }
}

LeftMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
};

LeftMenu.propTypes = {
  open: React.PropTypes.bool,
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    syncUser: () => {
      dispatch(syncUser());
    },
    updateUser: (user, type) => {
      dispatch(updateUser(user, type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
