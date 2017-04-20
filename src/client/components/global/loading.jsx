import React from "react";
import iconLoading from "../../images/loader.gif";

const style = {
  position: "relative",
  display: "inline-block",
  width: "30px"
};

class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  render() {
    if (this.state.open === false) {
      return <div />;
    }

    return (<span>
      <img style={style} src={iconLoading} />
    </span>);
  }
}

Loading.propTypes = {
  open: React.PropTypes.bool.isRequired
};

export default Loading;
