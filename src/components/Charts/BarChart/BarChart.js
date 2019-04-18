import React, { Component } from 'react';
import * as c3 from 'c3';
import styles from './BarChart.css';

const data = {
  "columns": [
    ["click1", 7, 5, 2],
    ["click2", 6, 9, 5],
  ],
  'type': "bar"
};
const axis = {
  'x': {
    'type': 'category',
    'categories': ["2018-03-011", "2018-04-011", "2018-05-011"],
  }
}
class BarChart extends Component {

  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    if (this.props.data) {
      const chart = c3.generate({
        bindto: '#chart',
        data: this.props.data.data,
        axis: this.props.data.axis
      });
    }
  }
  render() {
    let chart = null;
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}>{this.props.data.axis.x.categories.length} Days Tracking - nb of incidents per day</div>
          <div className={styles.chart} id="chart">hi</div>
        </React.Fragment>
    }
    return (
      <div className={styles.wrapper}>
        {chart}
      </div>
    )
  }
}

export default BarChart;
