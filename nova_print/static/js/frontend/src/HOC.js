import React, {Component} from "react";

const Hover = Comp =>
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
      return (
        <div onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
          <Comp isHovered={this.state.isHovered} />
        </div>
      );
    }
  };

export {Hover};
