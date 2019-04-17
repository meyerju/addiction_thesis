import React, { Component } from 'react';
import * as c3 from 'c3';
import styles from './BarChart.css';

class BarChart extends Component {
  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: this.props.columns,
        type: this.props.chartType
      }
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.chart} id="chart">hi</div>
      </div>
    )
  }
}

export default BarChart;
