import React, {Component, PropTypes} from "react"
import { connect } from "react-redux"
import { dispatch } from "redux"
import FacebookLogin from 'react-facebook-login'
import _ from 'lodash'

import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import {Menu, MenuItem} from 'material-ui/Menu'

import { updateUser } from '../actions/user'

class LeftMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      user: this.props.user
    }

    this.responseFacebook = this.responseFacebook.bind(this)
    this.logoff = this.logoff.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
      user: nextProps.user
    })
  }

  responseFacebook(response) {
    let user = this.props.user

    if (response.accessToken != '') {
      user = {
        accessToken: response.accessToken,
        id: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      }
    }
    this.props.updateUser(user)
  }

  logoff() {
    this.props.updateUser({}, true)
  }

  _facebookLogin() {
    let autoload = true
    let user = {}
    let storage = {}
    if (typeof localStorage !== 'undefined')
      storage = localStorage.getItem('ul')
    if (_.size(storage) > 0)
      user = JSON.parse(storage)
    if (user.fi === '' || user.fi === undefined)
      autoload = false

    return <FacebookLogin
      appId="1953192988244454"
      isMobile={true}
      autoLoad={autoload}
      size="metro"
      fields="name,email,picture"
      callback={(response) => this.responseFacebook(response)}
      icon="fa-facebook"
    />
  }

  _userLogged() {
    return <div>
      <div style={{display: `inline`}}>
        <div style={{padding: 5, width: `50px`, float: `left`}}>
          <Avatar src={this.state.user.picture} />
        </div>
        <div style={{float: `left`, marginTop: `10px`}}>
          {this.state.user.name} <br />
          <small>{this.state.user.email}</small>
        </div>
      </div>

      <FlatButton
        label="Logout"
        labelPosition="before"
        icon = { <FontIcon className="material-icons">exit_to_app</FontIcon> }
        style={{marginTop: `20px`, width: `100%`}}
        hoverColor="#CF2F17"
        backgroundColor="#CF2F17"
        onTouchTap={ () => { this.logoff() } }
      />
    </div>
  }

  render() {
    let drawerContent = this._facebookLogin()
    if (this.state.user.accessToken && this.state.user.accessToken !== '') {
      drawerContent = this._userLogged()
    }
    return <Drawer 
      width={200}
      docked={false}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}
    >
      {drawerContent}
    </Drawer>
  }
}

const mapStateToProps = (state)=> {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);