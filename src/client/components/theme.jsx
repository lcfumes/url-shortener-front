import React, {Component, PropTypes} from "react"
import { connect } from "react-redux";
import { dispatch } from "redux";

import Toggle from 'material-ui/Toggle';

import { updateTheme } from '../actions/theme'

class ThemeToogle extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    
  }

  _toogleDarkTheme(object, isChecked) {
    let theme = '';
    if (isChecked) {
      theme = 'dark'
    }
    this.props.updateTheme(theme)
  }

  render() {
    return <Toggle 
      onToggle={(object, isChecked) => {this._toogleDarkTheme(object, isChecked)}} 
      toggled={(this.props.theme === 'dark') ? true : false}
    />
  }
}

const mapStateToProps = (state)=> {
  return {
    theme: state.themeReducer.theme
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    updateTheme: (theme) => {
      dispatch(updateTheme(theme))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToogle);