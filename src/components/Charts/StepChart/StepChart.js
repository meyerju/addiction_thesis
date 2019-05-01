import React, { Component } from 'react';
import * as c3 from 'c3';
import styles from './StepChart.css';
class StepChart extends Component {

  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    if (this.props.data) {
      c3.generate({
        bindto: '#chartStep',
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
          <div className={styles.title}><span className={styles.category}>PROGRESS</span> Progression of incidents</div>
          <div className={styles.chart} id="chartStep">hi</div>
        </React.Fragment>
    }
    return (
      <div className={styles.wrapper}>
        {chart}
      </div>
    )
  }
}

export default StepChart;
