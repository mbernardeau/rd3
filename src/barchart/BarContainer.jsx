'use strict';

const React = require('react');
const { findDOMNode } = require('react-dom');
const Bar = require('./Bar');
const shade = require('../utils').shade;


module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    stroke: React.PropTypes.string,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    dataPoint: React.PropTypes.any, // TODO: prop types?
  },

  getDefaultProps() {
    return {
      fill: '#3182BD',
    };
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill,
      stroke: this.props.stroke,
    };
  },

  _animateBar() {
    const rect = findDOMNode(this).getBoundingClientRect();
    this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);
    this.setState({
      fill: shade(this.props.fill, 0.2),
      stroke: shade(this.props.stroke, 0.2),
    });
  },

  _restoreBar() {
    this.props.onMouseLeave.call(this);
    this.setState({
      fill: this.props.fill,
      stroke: this.props.stroke,
    });
  },

  render() {
    const props = this.props;

    return (
      <Bar
        {...props}
        fill={this.state.fill}
        stroke={this.state.stroke}
        handleMouseOver={props.hoverAnimation ? this._animateBar : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreBar : null}
      />
    );
  },
});
