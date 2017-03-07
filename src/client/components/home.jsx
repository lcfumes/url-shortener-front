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
import Pagination from './global/pagination';
import validUrl from 'valid-url';

import githubImg from '../images/github/GitHub-Mark-Light-32px.png';

import ReactGA from 'react-ga';
if (typeof window !== 'undefined') {
  ReactGA.initialize('UA-92958744-1', {
    debug: false,
    titleCase: false
  });
}

const logPageView = () => {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
}

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
      page: 1,
      open: false,
      urlShortened: "",
      invalidUrl: false,
      copied: false
    }

    this.handleSetUrlShortened = this.handleSetUrlShortened.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCopyUrl = this.handleCopyUrl.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleUrlInvalid = this.handleUrlInvalid.bind(this);
  }

  componentWillMount() {
    logPageView();
  }

  handleKeyPress(e) {
    e.preventDefault();
    this.setState({
        invalidUrl: false,
        [e.target.id]: e.target.value
    })
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleUrlInvalid() {
    this.setState({invalidUrl: true})
  }

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

  handlePagination(page) {
    this.setState({
      page: page
    }, (e) => this.props.getUrls(this.state.page))
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

    const repositoryLink = <a href="https://github.com/lcfumes/url-shortener-front" target="_blank">
      <img src={githubImg} style={{width:30, margin: 10}} />
    </a>

    return (      
      <MuiThemeProvider>
        <div>
          <Notifications />
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
            iconElementRight={repositoryLink}
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
                errorText={this.state.invalidUrl && 'Does not appear to be a valid URL'}
              />
              <RaisedButton
                label="Shorten URL"
                labelPosition="before"
                primary={true}
                icon={<FontIcon className="material-icons">link</FontIcon>}
                onClick={(e) => props.shortenUrl(this.state.url, this.handleSetUrlShortened, this.handleOpen, this.handleUrlInvalid)}
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
                  <FontIcon className="material-icons" onClick={(e) => props.getUrls(this.state.page)}>refresh</FontIcon>
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
                        <TableRowColumn>
                          <a href={`http://lfum.es/${doc.hash}`} target="_blank">{`http://lfum.es/${doc.hash}`}</a>
                        </TableRowColumn>
                        <TableRowColumn>{doc.url}</TableRowColumn>
                      </TableRow>
                  })}
                  <TableRow key={"register-total"}>
                    <TableRowColumn>
                    </TableRowColumn>
                    <TableRowColumn style={{textAlign: 'right'}}>
                      <Pagination
                        total={Math.round(docs.all.value / 10)}
                        current={this.state.page}
                        display={10}
                        onChange={this.handlePagination}
                      />
                    </TableRowColumn>
                  </TableRow>
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

const getUrls = (offset, dispatch) => {
  let page = 0;
  if (offset) {
    page = offset - 1;
  }
  return fetch(`${apiUri}?page=${page}`)
  .then(response => response.json())
  .then(json => {
    dispatch(fetchRequestSuccess(json))
  })
}

const createUrl = (dispatch, url, setUrlShortened, callback, error) => {
  if (!validUrl.isUri(url)){
    error();
  } else {
    if (url.substr(0, 4) != 'http') {
      url = `http://${url}`
    }
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
      getUrls(0, dispatch);
      setUrlShortened(json._embedded[0].hash)
      callback();
    });
  }
}

const mapStateToProps = (state) => {
  return {
      uri: state.uri,
      docs: {
        total: state.docs.total,
        all: state.docs.all,
        data: state.docs.data
      }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUrls(page) {
      return getUrls(page, dispatch)
    },
    shortenUrl(url, setUrlShortened, callback, error) {
      createUrl(dispatch, url, setUrlShortened, callback, error)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);