import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Notifications from "react-notify-toast";

/**/
import { createUrl, updateHash} from '../actions/docs';

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
import validUrl from 'valid-url';

import ListUrls from './listurls';
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
      open: false,
      urlShortened: this.props.hash,
      invalidUrl: false,
      copied: false,
      docs: props.docs
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCopyUrl = this.handleCopyUrl.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleUrlInvalid = this.handleUrlInvalid.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
  }

  componentWillMount() {
    logPageView();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      urlShortened: nextProps.hash,
      open: (nextProps.hash !== '') ? true : false
    })
  }

  shortenUrl() {
    let url = this.state.url;
    if (!validUrl.isUri(url)){
      this.setState({
        invalidUrl: true
      })
    } else {
      if (url.substr(0, 4) != 'http') {
        url = `http://${url}`
      }
      this.props.createUrl(url)
    }
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
    }, () => {
      this.props.updateHash('')
    });
  };

  handleRequestClose() {
    this.setState({
      copied: false
    })
  }

  render() {
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
            bodyStyle={{ backgroundColor: "rgb(255, 64, 129)", color: 'coral' }} />
          <Dialog
            title={dialogTitle}
            actions={actions}
            modal={true}
            open={this.state.open} >
            <p>
              {`Don't forget to copy the shortened URL`}
            </p>
            <Paper style={styles.paperDialog} zDepth={1}>
              <TextField 
                value={`https://lfum.es/${this.state.urlShortened}`} 
                style={{width: '80%', marginRight: 20, textAlign: 'left'}}
                underlineShow={true} 
                readOnly={true}
                onClick={this.handleCopyUrl}
                id="url-shortened" />
              <CopyToClipboard 
                text={`https://lfum.es/${this.state.urlShortened}`}
                onCopy={() => this.setState({copied: true})} >
                <RaisedButton
                  secondary={true}
                  icon={<FontIcon className="material-icons">content_copy</FontIcon>}
                  onClick={this.handleCopyUrl} />
              </CopyToClipboard>
            </Paper>
          </Dialog>
          <AppBar
            title="URL Shortener"
            showMenuIconButton={false}
            iconElementRight={repositoryLink} />
          <Paper style={styles.paperUrl} zDepth={1}>
            <TextField 
              hintText="Enter your original URL here" 
              style={{width: '80%', marginRight: 20, textAlign: 'left'}}
              inputStyle={{width: '60%'}} 
              underlineShow={true} 
              onChange={(e) => this.handleKeyPress(e)}
              id="url"
              value={this.state.url}
              errorText={this.state.invalidUrl && 'Does not appear to be a valid URL'} />
            <RaisedButton
              label="Shorten URL"
              labelPosition="before"
              primary={true}
              icon={<FontIcon className="material-icons">link</FontIcon>}
              onClick={(e) => this.shortenUrl()} />
          </Paper>
          <div>
            <Paper style={{marginTop: 20}} rounded={false} zDepth={1} >
              <ListUrls />
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  // docs: PropTypes.object.isRequired,
  // uri: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    uri: state.appReducer.uri,
    hash: state.hashCreatedReducer.hash
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUrl: (url) => {
      dispatch(createUrl(url))
    },
    updateHash: (hash) => {
      dispatch(updateHash(hash))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);