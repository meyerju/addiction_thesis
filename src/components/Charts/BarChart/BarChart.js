import React, { Component } from 'react';
import * as c3 from 'c3';
import * as d3 from 'd3';
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
      console.log("bar", this.props.data.data)
      c3.generate({
        bindto: '#chartBar'+this.props.type+this.props.title,
        data: {
          ...this.props.data.data,
          labels: { format: function (d) { if (d!== 0) return  d; }}
        },
        axis: this.props.data.axis
      });
    }
  }
  render() {
    let title = "Total number of reports per hour";
    if (this.props.type === "PROGRESS") {
      title = this.props.data.axis.x.categories.length +"Days Tracking - nb of incidents per day";
    }
    if (this.props.title === "periode") {
      title = "Total number of reports per periode of the day";
    }
    let chart = null;
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}><span className={styles.category}>{this.props.type}</span>{title}</div>
          <div className={styles.chart} id={"chartBar"+this.props.type+this.props.title}>hi</div>
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
