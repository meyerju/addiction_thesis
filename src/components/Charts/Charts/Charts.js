import React from "react";
import Spinner from '../../UI/Spinner/Spinner';
import BarChart from '../BarChart/BarChart';
import LineChart from '../LineChart/LineChart';
import TableChart from '../TableChart/TableChart';
import TimePieChart from '../TimePieChart/TimePieChart';
import MapChart from '../MapChart/MapChart';
import styles from './Charts.css';

const charts = (props) =>
    <React.Fragment>
        {(props.activeFile === props.file.id) && !((props.loadingFile) || (props.loading)) &&
            <React.Fragment>
                <div className={styles.tags} >
                    <button onClick={props.onActiveTime} className={props.activeTime ? styles.tag : styles.tag_inactive}>TIME</button>
                    <button onClick={props.onActiveLocation} className={props.activeLocation ? styles.tag : styles.tag_inactive}>LOCATION</button>
                    <button onClick={props.onActiveProgress} className={props.activeProgress ? styles.tag : styles.tag_inactive}>PROGRESS</button>
                </div>

                {props.activeLocation &&
                    <React.Fragment>
                        <MapChart
                            className={styles.chart}
                            data={props.dataChart["map"]} />
                        <TimePieChart
                            className={styles.chart}
                            type="LOCATION"
                            data={props.dataChart["mapPie"]} />
                    </React.Fragment>
                }
                {props.activeTime &&
                    <React.Fragment>
                        <LineChart
                            className={styles.chart}
                            data={props.dataChart["line"]} />
                        <TableChart
                            className={styles.chart}
                            data={props.dataChart["table"]} />
                        <TimePieChart
                            className={styles.chart}
                            type="TIME"
                            data={props.dataChart["timePie"]} />
                    </React.Fragment>
                }
                {props.activeProgress &&
                    <React.Fragment>
                        <BarChart
                            className={styles.chart}
                            data={props.dataChart["bar"]} />
                    </React.Fragment>
                }
            </React.Fragment>
        }

        {(props.activeFile === props.file.id) && ((props.loadingFile) || (props.loading)) &&
            <Spinner />
        }
    </React.Fragment>
    

export default charts;