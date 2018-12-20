import React, {Component} from "react";

const Hover = Comp => {
  class C extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovered: false,
      };
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
    }
    onMouseEnter() {
      this.setState({isHovered: true});
    }
    onMouseLeave() {
      this.setState({isHovered: false});
    }
    render() {
      const styles = {
        wrapper: {
          width: this.props.width,
        },
      };
      return (
        <div
          style={styles.wrapper}
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}>
          <Comp {...this.props} isHovered={this.state.isHovered} />
        </div>
      );
    }
  }
  C.defaultProps = {width: "100%"};
  return C;
};

export {Hover};
