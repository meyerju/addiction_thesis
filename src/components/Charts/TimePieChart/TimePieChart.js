import React, { Component } from 'react';
import * as c3 from 'c3';
import styles from './TimePieChart.css';

class TimePieChart extends Component {

  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    if (this.props.data) {
      for (var key in this.props.data) {
        c3.generate({
          bindto: '#chartTimePie' + key,
          data: this.props.data[key].data,
        });
      }
    }
  }
  render() {
    let chart = null;
    if (this.props.data) {
      var result = [];
      for (var i in this.props.data)
        result.push([i, this.props.data[i]]);

      chart =
        <React.Fragment>
          {result
            .map((elt, index) =>
              <React.Fragment key={index} >
                <div className={styles.title}><span className={styles.category}>TIME</span> {elt[0].toUpperCase()}: Distribution of observations on the period of the day</div>
                <div className={styles.chart} id={"chartTimePie" + elt[0]}>{elt[0]}</div>
              </React.Fragment>)
          }
        </React.Fragment>
    }
    return (
      <div className={styles.wrapper}>
        {chart}
      </div>
    )
  }
}

export default TimePieChart;
