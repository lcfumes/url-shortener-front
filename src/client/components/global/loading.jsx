import React, { PropTypes } from 'react';

import iconLoading from '../../images/loader.gif';

let style = {
  position: `relative`,
  display: `inline-block`,
  width: `30px`
}

class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    })
  }

  render() {
    if (this.state.open === false) {
      return <div></div>;
    }

    return <span>
      <img style={style} src={iconLoading} />
    </span>
  }

}

export default Loading