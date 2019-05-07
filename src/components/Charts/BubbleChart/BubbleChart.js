import React, { Component } from 'react';
import * as c3 from 'c3';
import * as d3 from 'd3';
import styles from './BubbleChart.css';
import Chart from "react-apexcharts";

class BubbleChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#ff7f0d', '#087cc9'],
        dataLabels: {
          enabled: false,
        },

        fill: {
          opacity: 0.8,
        },
        xaxis: {
          tickAmount: 24,
          type: 'category',
          title: {
            text: "hours",
          }
        },
        yaxis: {
          forceNiceScale: true,
          lines: {
            show: true,
          },
          title: {
            text: "tracking days",
          },
          tickAmount: 15
        },
        chart: {
          toolbar: {
            show: false
          },
          animations: {
            enabled: false,
          }
        }
      }
    }
  }

  componentDidMount() {
    this._updateChart();
  }

  _updateChart() {
    if (this.props.data) {
      const {data} = this.props;
      this.setState({
        options: {
          ...this.state.options,
          yaxis: {
            ...this.state.options.yaxis,
            labels: {
              formatter: function (val, index) {
                return data.days[val-1];
              }
            }
          }
        }
      })
    }
  }

  render() {
    console.log(this.props.data);
    return (

      <div className={styles.wrapper}>
        <div className={styles.title}><span className={styles.category}>TIME</span> Time of all incidents for each day</div>
        <div id="chartBubble" className={styles.chart}>
          <Chart options={this.state.options} series={this.props.data.data} type="bubble" height="350" />
        </div>

      </div>

    )
  }
}

export default BubbleChart;
