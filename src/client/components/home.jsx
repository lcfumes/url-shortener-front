import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";
/**/
import {fetchPostsRequest, fetchRequestSuccess} from "../actions";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';

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
  },
  paperDialog:{
    flex: 1,
    height: '100%',
    width: '95%',
    padding: 10,
    marginTop: 20
  }
};

let apiUri;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      open: false,
      urlShortened: "",
      copied: false
    }

    this.handleSetUrlShortened = this.handleSetUrlShortened.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCopyUrl = this.handleCopyUrl.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleKeyPress(e) {
    e.preventDefault();
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleSetUrlShortened(url) {
    this.setState({
      urlShortened: url
    })
  }

  handleCopyUrl() {
    document.getElementById('url-shortened').focus()
    document.getElementById('url-shortened').select()
  }

  handleClose() {
    this.setState({
      url: "",
      open: false,
      urlShortened: "",
      copied: false
    });
  };

  handleRequestClose() {
    this.setState({
      copied: false
    })
  }

  render() {
    const props = this.props;
    const {docs, uri} = props;
    apiUri = uri;

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    const dialogTitle = <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text={`URL Shortened`} />
      </ToolbarGroup>
    </Toolbar>

    return (      
      <MuiThemeProvider>
        <div>
          <Snackbar
            open={this.state.copied}
            message="Copied to Clipboard"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            bodyStyle={{ backgroundColor: "rgb(255, 64, 129)", color: 'coral' }}
          />
          <Dialog
            title={dialogTitle}
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <p>
              {`Don't forget to copy the shortened URL`}
            </p>
            <Paper style={styles.paperDialog} zDepth={1}>
              <TextField 
                value={`http://lfum.es/${this.state.urlShortened}`} 
                style={{width: '80%', marginRight: 20, textAlign: 'left'}}
                underlineShow={true} 
                readOnly={true}
                onClick={this.handleCopyUrl}
                id="url-shortened"
              />
              <CopyToClipboard 
                text={`http://lfum.es/${this.state.urlShortened}`}
                onCopy={() => this.setState({copied: true})}>
                <RaisedButton
                  secondary={true}
                  icon={<FontIcon className="material-icons">content_copy</FontIcon>}
                  onClick={this.handleCopyUrl}
                />
              </CopyToClipboard>
            </Paper>
          </Dialog>
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
                onClick={(e) => props.shortenUrl(this.state.url, this.handleSetUrlShortened, this.handleOpen)}
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

const reloadUrl = (dispatch) => {
  return fetch(apiUri)
  .then(response => response.json())
  .then(json => {
    dispatch(fetchRequestSuccess(json))
  })
}

const createUrl = (dispatch, url, setUrlShortened, callback) => {
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
    setUrlShortened(json._embedded[0].hash)
    callback();
  })
}

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
    reloadUrl() {
      return reloadUrl(dispatch)
    },
    shortenUrl(url, setUrlShortened, callback) {
      createUrl(dispatch, url, setUrlShortened, callback)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);