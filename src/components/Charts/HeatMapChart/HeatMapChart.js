import React, { Component } from 'react';
import * as c3 from 'c3';
import * as d3 from 'd3';
import styles from './HeatMapChart.css';

class HeatMapChart extends Component {

  componentDidMount() {
    this._updateChart();
  }
  // componentDidUpdate() {
  //   this._updateChart();
  // }
  _updateChart() {
    "use strict";
    if (this.props.data) {

      var margin = { top: 50, right: 0, bottom: 100, left: 0 },
        days = this.props.data.days,
        width = 1100,
        height = 600 - margin.top - margin.bottom,
        gridWidth = Math.floor((width-140) / 24),
        gridHeigth = Math.floor((height-10) / days.length),
        legendElementWidth = gridWidth * 2,
        buckets = 4,
        colors = ["#fcfaf9", "#ffe7d6", "#fcb785", "#fc9044", "#ff6a00", "#f41109"], 
        times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

      var dataArray = this.props.data.data["urge"];

      var dataHandler = function (error, data) {
        var colorScale = d3.scaleQuantile()
          .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
          .range(colors);

        var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
          .text(function (d) { return d; })
          .attr("x", 140)
          .attr("y", function (d, i) { return i * gridHeigth; })
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + gridHeigth / 1.5 + ")")
          .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

        var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
          .text(function (d) { return d; })
          .attr("x", function (d, i) { return i * gridWidth+140; })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridWidth / 2 + ", -6)")
          .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

        var heatMap = svg.selectAll(".hour")
          .data(data)
          .enter().append("rect")
          .attr("x", function (d) { return (d.hour - 1) * gridWidth+140; })
          .attr("y", function (d) { return (d.day - 1) * gridHeigth; })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "hour bordered")
          .attr("width", gridWidth)
          .attr("height", gridHeigth)
          .style("fill", colors[0]);

        heatMap.transition().duration(3000)
          .style("fill", function (d) { return colorScale(d.value); });

        heatMap.append("title").text(function (d) { return d.value; });

        var legend = svg.selectAll(".legend")
          .data([0].concat(colorScale.quantiles()), function (d) { return d; })
          .enter().append("g")
          .attr("class", "legend");

        legend.append("rect")
          .attr("x", function (d, i) { return legendElementWidth * i+140; })
          .attr("y", height)
          .attr("width", legendElementWidth)
          .attr("height", gridHeigth / 2)
          .style("fill", function (d, i) { return colors[i]; });

        legend.append("text")
          .attr("class", "mono")
          .text(function (d) { return "= " + Math.round(d); })
          .attr("x", function (d, i) { return legendElementWidth * i+140; })
          .attr("y", height + gridHeigth);
      }

      dataHandler(null, dataArray);
    }
  }

  render() {
    let title = "";
    if (this.props.data) {
      title = this.props.data.days.length+" Tracking Days - Intensity of URGE incidents per hour";
    }
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}><span className={styles.category}>TIME</span> {title}</div>
        <div id="chart" className={styles.chart}></div>
      </div>
    )
  }
}

export default HeatMapChart;
