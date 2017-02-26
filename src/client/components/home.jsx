import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Home extends React.Component {
  render() {
    const props = this.props;
    const {checked, value} = props;
    return (
      <MuiThemeProvider>
        <div>
          <div></div>
          <AppBar
            title="URL Shortener"
            showMenuIconButton={false}
          />
          <Paper style={{margin: 20, padding: 20}} zDepth={1}>
            <TextField 
              hintText="Enter your url address" 
              style ={{width: '100%'}}
              inputStyle ={{width: '100%'}} 
              underlineShow={true} 
            />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
    // return (
    // <RaisedButton label="Primary" primary={true} onClick={props.onIncrease} label="Increase" /> 
          // <RaisedButton label="Secondary" secondary={true} onClick={props.onDecrease} label="Decrease" />
          // <Badge
          //   badgeContent={value}
          //   secondary={true}
          //   badgeStyle={{top: 12, right: 12}}
          // >
          //   <IconButton tooltip="Notifications">
          //     <NotificationsIcon />
          //   </IconButton>
          // </Badge>
    //   <MuiThemeProvider>
    //     {/**/}
    //     <Notifications />
    //     {/**/}
    //     <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
    //     <div>
    //       <h2>Managing States with Redux</h2>
    //       <label>
    //         <input onChange={props.onChangeCheck} type={"checkbox"} checked={checked}/>
    //         Checkbox
    //       </label>
    //       <div>
    //         <RaisedButton label="Primary" primary={true} style={style} />
    //         <button type={"button"} onClick={props.onDecrease}>-</button>
    //         &nbsp;{value}&nbsp;
    //         <button type={"button"} onClick={props.onIncrease}>+</button>
    //       </div>
    //     </div>
    //   </MuiThemeProvider>
    // );
  }
}

Home.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    checked: state.checkBox.checked, value: state.number.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCheck: () => {
      dispatch(toggleCheck());
    },
    onIncrease: () => {
      dispatch(incNumber());
    },
    onDecrease: () => {
      dispatch(decNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
