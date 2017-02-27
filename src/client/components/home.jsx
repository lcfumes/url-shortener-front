import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Home extends React.Component {
  render() {
    const props = this.props;
    const {total, data} = props;
  
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="URL Shortener"
            showMenuIconButton={false}
          />
          <div style={{margin: 20}}>
            <Paper style={{padding: 10}} zDepth={1}>
              <TextField 
                hintText="Enter your url address" 
                style ={{width: '100%'}}
                inputStyle ={{width: '100%'}} 
                underlineShow={true} 
              />
            </Paper>
            <Paper
              style={{marginTop: 20}}
              rounded={false}
              zDepth={1}
            >
               <Toolbar>
                <ToolbarTitle text="Recents URL's" />
              </Toolbar>
              <Table style={{marginTop: 20}} fixedHeader={true} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: "20%"}}>Short URL</TableHeaderColumn>
                    <TableHeaderColumn>Original URL</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {data.docs.map((doc) => {
                    return <TableRow>
                        <TableRowColumn style={{width: "20%"}}>http://lfum.es/{doc.hash}</TableRowColumn>
                        <TableRowColumn>{doc.url}</TableRowColumn>
                      </TableRow>
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  total: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    total: state.total,
    data: state.data
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
