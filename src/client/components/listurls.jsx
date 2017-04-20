import React from "react";
import { connect } from "react-redux";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from "material-ui/Toolbar";

import FontIcon from "material-ui/FontIcon";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import Loading from "./global/loading";
import Pagination from "./global/pagination";
import ToogleTheme from "./theme";

import { updateDocs, updatePage} from "../actions/docs";
import { updateLoading } from "../actions/loading";

const REGISTER_PER_PAGE = 10;

class ListUrls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      page: props.page,
      docs: props.docs
    };

    this._refreshButton = this._refreshButton.bind(this);
    this.listUrls = this._listUrls.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      page: nextProps.page,
      docs: nextProps.docs
    });
  }

  _refreshButton() {
    if (this.state.loading === false) {
      return (<FontIcon
        className="material-icons"
        onClick={ () => this.props.updateDocs() }
        >refresh</FontIcon>);
    }
    return <Loading open={this.state.loading} />;
  }

  _listUrls() {
    if (this.state.loading) {
      return (<div style={{ margin: "0px auto", width: "30px", padding: 10 }}>
        <Loading open={this.state.loading} />
      </div>);
    }

    return (<Table fixedHeader={true} selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false}>
        <TableRow>
          <TableHeaderColumn>Short URL</TableHeaderColumn>
          <TableHeaderColumn>Original URL</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {this.state.docs.data.docs.map((doc, i) => {
          return (<TableRow key={"register-".concat(i)}>
            <TableRowColumn>
              <a href={`https://lfum.es/${doc.hash}`} target="_blank">{`https://lfum.es/${doc.hash}`}</a>
            </TableRowColumn>
            <TableRowColumn>{doc.url}</TableRowColumn>
          </TableRow>);
        })}
        <TableRow key={"register-total"}>
          <TableRowColumn>
            <ToogleTheme /> Change Theme
          </TableRowColumn>
          <TableRowColumn style={{textAlign: "right"}}>
            <Pagination
              total={Math.round(this.state.docs.all.value / REGISTER_PER_PAGE)}
              current={this.state.page}
              display={REGISTER_PER_PAGE}
              onChange={() => this.props.updatePage()}
            />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>);
  }

  render() {
    return (<div>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={"Recents URL's"} />
        </ToolbarGroup>
        <ToolbarGroup>
          {this._refreshButton()}
        </ToolbarGroup>
      </Toolbar>
      {this.listUrls()}
    </div>);
  }
}

ListUrls.propTypes = {
  loading: React.PropTypes.bool,
  page: React.PropTypes.int,
  docs: React.PropTypes.object,
  updateDocs: React.PropTypes.func,
  updatePage: React.PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    docs: state.docsReducer.docs,
    page: state.paginationReducer.page,
    loading: state.loadingReducer.loading,
    theme: state.themeReducer.theme
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDocs: () => {
      dispatch(updateDocs());
    },
    updatePage: (page) => {
      dispatch(updatePage(page));
    },
    updateLoading: (status) => {
      dispatch(updateLoading(status));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)();
