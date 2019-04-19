import React, { Component } from 'react';
import * as c3 from 'c3';
import * as d3 from 'd3';
import styles from './LineChart.css';

class LineChart extends Component {

  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    if (this.props.data) {
      const chart = c3.generate({
        bindto: '#chartLine',
        data: this.props.data.data,
        axis: this.props.data.axis
      });
      d3.selectAll("circle")
        .attr("r", 10);
    }
  }
  render() {
    let chart = null;
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}><span className={styles.category}>TIME</span> Time of all incidents for each day</div>
          <div className={styles.chart} id="chartLine">hi</div>
        </React.Fragment>
    }
    return (
      <div className={styles.wrapper}>
        {chart}
      </div>
    )
  }
}

export default LineChart;
