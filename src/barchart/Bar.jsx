'use strict';

const React = require('react');

module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    className: React.PropTypes.string,
    handleMouseOver: React.PropTypes.func,
    handleMouseLeave: React.PropTypes.func,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeOpacity: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      offset: 0,
      className: 'rd3-barchart-bar',
      stroke: 'rgb(0,0,0)',
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
    };
  },

  render() {
    return (
      <rect
        className="rd3-barchart-bar"
        {...this.props}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        strokeOpacity={this.props.strokeOpacity}
        fill={this.props.fill}
        fillOpacity={this.props.fillOpacity}
        onMouseOver={this.props.handleMouseOver}
        onMouseLeave={this.props.handleMouseLeave}
      />
    );
  },
});
