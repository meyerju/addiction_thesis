import React, { Component } from 'react';
import * as c3 from 'c3';
import styles from './TableChart.css';

class TableChart extends Component {

  render() {
    let chart = null;
    console.log(this.props.data)
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}>Distribution of observations on hours of the day</div>
          <div className={styles.table}>
            <div className={styles.header}>
              {this.props.data
                .map(
                  (column) => (
                    <div className={styles.header__cell} key={column[0]}>
                      <span> {column[0]}</span>
                    </div>
                  ), this)
              }
            </div>
            <div className={styles.table__body}>
              {this.props.data
                .map(
                  (column) => (
                    <div className={styles.table__row} key={column[0]}>
                      {column
                        .map((cell, index) => {
                          if (index !== 0) {
                            return <div className={styles.table__cell} key={cell}>
                              <span>{cell}</span>
                            </div>
                          }
                        }
                        )
                      }
                    </div>
                  ), this)
              }
            </div>
          </div>
        </React.Fragment >
    }
    return (
      <div className={styles.wrapper}>
        {chart}
      </div>
    )
  }
}

export default TableChart;
