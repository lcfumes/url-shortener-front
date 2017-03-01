import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";
/**/
import {fetchPostsRequest, fetchRequestSuccess} from "../actions";
const Promise = require("bluebird");

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Home extends React.Component {
  render() {
    const props = this.props;
    const {docs, uri} = props;

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
                hintText="Enter your original URL here" 
                style={{width: '100%'}}
                inputStyle={{width: '100%'}} 
                underlineShow={true} 
              />
            </Paper>
            <Paper
              style={{marginTop: 20}}
              rounded={false}
              zDepth={1}
            >
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarTitle text="Recents URL's" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <FontIcon className="material-icons" onClick={(e) => props.reloadUrl(uri)}>refresh</FontIcon>
                </ToolbarGroup>
              </Toolbar>
              <Table style={{marginTop: 20}} fixedHeader={true} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: "20%"}}>Short URL</TableHeaderColumn>
                    <TableHeaderColumn>Original URL</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {docs.data.docs.map((doc, i) => {
                    return <TableRow key={"register-"+i}>
                        <TableRowColumn style={{width: "20%"}}>{`http://lfum.es/${doc.hash}`}</TableRowColumn>
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
  docs: PropTypes.object.isRequired,
  uri: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
      uri: state.uri,
      docs: {
        total: state.docs.total,
        data: state.docs.data
      }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUrl(uri) {
      return fetch(uri)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchRequestSuccess(json))
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
