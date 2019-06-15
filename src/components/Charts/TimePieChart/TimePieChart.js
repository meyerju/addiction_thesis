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
          bindto: '#chartTimePie' + key[0] + this.props.type,
          data: this.props.data[key].data,
          donut: {
            label: { format: function (value, ratio, id) { return value; } },
            title: key.toUpperCase()
          }
        });
      }
    }
  }
  render() {
    let title = "Total number of incidents per period of the day";
    if (this.props.type === "LOCATION") {
      title = "Total number of incidents per location";
    }
    let chart = null;
    if (this.props.data) {
      var result = [];
      for (var i in this.props.data)
        result.push([i, this.props.data[i]]);

      chart =
        <React.Fragment>
          {result
            .map((elt, index) =>
              <div className={styles.wrapper} key={index} >
                <div className={styles.title}><span className={styles.category}>{this.props.type}</span>{title}</div>
                <div className={styles.chart} id={"chartTimePie" + elt[0][0] + this.props.type}>{elt[0]}</div>
              </div>)
          }
        </React.Fragment>
    }
    return (
      <div className={styles.container}>
        {chart}
      </div>
    )
  }
}

export default TimePieChart;
