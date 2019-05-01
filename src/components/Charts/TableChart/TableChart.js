import React, { Component } from 'react';
import styles from './TableChart.css';

class TableChart extends Component {

  render() {
    let chart = null;
    if (this.props.data) {
      chart =
        <React.Fragment>
          <div className={styles.title}><span className={styles.category}>TIME</span> Distribution of observations on hours of the day</div>
          <div className={styles.table}>
            <div className={styles.header}>
              {this.props.data
                .map(
                  (column, index) => (
                    <div className={styles.header__cell} key={column[0]+index*2}>
                      <span> {column[0]}</span>
                    </div>
                  ), this)
              }
            </div>
            <div className={styles.table__body}>
              {this.props.data
                .map(
                  (column,index) => (
                    <div className={styles.table__row} key={"column_"+index}>
                      {column
                        .map((cell, index) => {
                          if (index !== 0) {
                            return <div className={styles.table__cell} key={"cell_"+index}>
                              <span>{cell}</span>
                            </div>
                          } return null
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
