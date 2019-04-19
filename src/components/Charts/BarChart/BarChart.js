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
    if (this.props.data) {
      const chart = c3.generate({
        bindto: '#chartBar',
        data: this.props.data.data,
        axis: this.props.data.axis
      });
    }
  }
  render() {
    let chart = null;
    console.log(this.props.data)
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}><span className={styles.category}>PROGRESS</span>{this.props.data.axis.x.categories.length} Days Tracking - nb of incidents per day</div>
          <div className={styles.chart} id="chartBar">hi</div>
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
