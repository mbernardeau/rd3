'use strict';

const React = require('react');
const BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: React.PropTypes.array,
    series: React.PropTypes.array,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    valuesAccessor: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    hoverAnimation: React.PropTypes.any, // TODO: prop types?
    xScale: React.PropTypes.any,
    yScale: React.PropTypes.any,
    strokeColorAccessor: React.PropTypes.func,
    strokeWidthAccessor: React.PropTypes.func,
    strokeOpacityAccessor: React.PropTypes.func,
    fillOpacityAccessor: React.PropTypes.func,
  },

  _renderBarSeries() {
    const { _data, valuesAccessor } = this.props;
    return _data.map((layer, seriesIdx) => (
      valuesAccessor(layer).map(segment => this._renderBarContainer(segment, seriesIdx))
    ));
  },

  _renderBarContainer(segment, seriesIdx) {
    const {
      colors,
      colorAccessor,
      hoverAnimation,
      xScale,
      yScale,
      strokeColorAccessor,
      strokeWidthAccessor,
      strokeOpacityAccessor,
      fillOpacityAccessor,
    } = this.props;

    const strokeWidth = strokeWidthAccessor(segment, seriesIdx);
    const barHeight = Math.abs(yScale(0) - yScale(segment.y));

    // Calculate padding to compoensate for size of stroke
    let yPad = 0;
    for (let i = 0; i < seriesIdx; i++) {
      yPad += strokeWidthAccessor(segment, i);
    }
    const y = yScale(segment.y0 + segment.y) - Math.floor(yPad / 2);

    return (
      <BarContainer
        height={barHeight}
        width={xScale.rangeBand() - strokeWidth} // Reduce width by the stroke width as it's added around the rectangle
        x={xScale(segment.x) + strokeWidth / 2} // and move the rectangle by half the size of the stroke to recenter it
        y={(segment.y >= 0) ? y : y - barHeight}
        fill={colors(colorAccessor(segment, seriesIdx))}
        fillOpacity={fillOpacityAccessor(segment, seriesIdx)}
        stroke={colors(strokeColorAccessor(segment, seriesIdx))}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacityAccessor(segment, seriesIdx)}
        hoverAnimation={hoverAnimation}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        dataPoint={{
          xValue: segment.x,
          yValue: segment.y,
          seriesName: this.props.series[seriesIdx],
        }}
      />
    );
  },

  render() {
    return (
      <g>{this._renderBarSeries()}</g>
    );
  },
});
