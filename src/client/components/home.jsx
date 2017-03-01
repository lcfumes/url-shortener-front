import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";
/**/
import {fetchPostsRequest, fetchRequestSuccess} from "../actions";
const Promise = require("bluebird");

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  paperUrl:{
    flex: 1,
    height: '100%',
    width: '95%',
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 20
  }
};

let apiUri;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    }

    this.handleResetState = this.handleResetState.bind(this);
  }

  handleKeyPress(e) {
    e.preventDefault();
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  handleResetState() {
    this.setState({
      url: ""
    });
  }

  render() {
    const props = this.props;
    const {docs, uri} = props;
    apiUri = uri;

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="URL Shortener"
            showMenuIconButton={false}
          />
          
            <Paper style={styles.paperUrl} zDepth={1}>
              <TextField 
                hintText="Enter your original URL here" 
                style={{width: '80%', marginRight: 20, textAlign: 'left'}}
                inputStyle={{width: '60%'}} 
                underlineShow={true} 
                onChange={(e) => this.handleKeyPress(e)}
                id="url"
                value={this.state.url}
              />
              <RaisedButton
                label="Shorten URL"
                labelPosition="before"
                primary={true}
                icon={<FontIcon className="material-icons">link</FontIcon>}
                onClick={(e) => props.shortenUrl(this.state.url, this.handleResetState)}
              />
            </Paper>
          <div>
            <Paper
              style={{marginTop: 20}}
              rounded={false}
              zDepth={1}
            >
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarTitle text={`Recents URL's`} />
                </ToolbarGroup>
                <ToolbarGroup>
                  <FontIcon className="material-icons" onClick={props.reloadUrl}>refresh</FontIcon>
                </ToolbarGroup>
              </Toolbar>
              <Table style={{marginTop: 20}} fixedHeader={true} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false}>
                  <TableRow>
                    <TableHeaderColumn>Short URL</TableHeaderColumn>
                    <TableHeaderColumn>Original URL</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {docs.data.docs.map((doc, i) => {
                    return <TableRow key={"register-"+i}>
                        <TableRowColumn>{`http://lfum.es/${doc.hash}`}</TableRowColumn>
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

const reloadUrl = (dispatch) => {
  return fetch(apiUri)
  .then(response => response.json())
  .then(json => {
    dispatch(fetchRequestSuccess(json))
  })
}

const createUrl = (dispatch, url, callback) => {
  return fetch(apiUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url,
    })
  })
  .then(response => response.json())
  .then(json => {
    reloadUrl(dispatch);
    callback();
    console.log(json);
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUrl() {
      return reloadUrl(dispatch)
    },
    shortenUrl(url, callback) {
      createUrl(dispatch, url, callback)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
