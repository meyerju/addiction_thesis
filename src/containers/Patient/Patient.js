import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-patients';
import DeleteIcon from '@material-ui/icons/Delete';
import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import Spinner from '../../components/UI/Spinner/Spinner';
import BarChart from '../../components/Charts/BarChart/BarChart';
import LineChart from '../../components/Charts/LineChart/LineChart';
import TableChart from '../../components/Charts/TableChart/TableChart';
import TimePieChart from '../../components/Charts/TimePieChart/TimePieChart';
import StepChart from '../../components/Charts/StepChart/StepChart';
import MapChart from '../../components/Charts/MapChart/MapChart';
import BubbleChart from '../../components/Charts/BubbleChart/BubbleChart';
import HeatMapChart from '../../components/Charts/HeatMapChart/HeatMapChart';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../hoc/Layout/Layout';

import * as patientPresenter from '../../store/presenters/patient';
import * as filePresenter from '../../store/presenters/file';

import * as actions from '../../store/actions/index';
import styles from './Patient.css';

class Patient extends Component {

    state = {
        activeFile: -1,
        chartType: 'bar',
        activeProgress: false,
        activeTime: true,
        activeLocation: false,
        loading: false,
    }

    componentDidMount() {
        if (this.props.patient && this.props.patient.id) {
            this.props.fetchFiles(this.props.patient.id);
        }
    }

    onChange = (e) => {
        this.setState({ file: e.target.files[0] })
        const formData = new FormData();
        formData.append('patient', this.props.patient.id);
        formData.append('file', e.target.files[0]);
        this.props.onLoad(formData, this.props.patient.id);
    }

    deleteFile(id) {
        console.log(id)
        this.props.onDeleteFile(id, this.props.patient.id);
    }

    onActiveLocation = () => {
        this.setState({ activeLocation: !this.state.activeLocation })
    }

    onActiveProgress = () => {
        this.setState({ activeProgress: !this.state.activeProgress })
    }

    onActiveTime = () => {
        this.setState({ activeTime: !this.state.activeTime })
    }

    loadData(id) {
        console.log(id)
        if (this.state.activeFile !== id) {
            this.setState({ activeFile: id, loading: true });
            this.props.onLoadData(id, this.props.patient.id);
        } else {
            this.setState({ activeFile: -1 });
        }
    }

    render() {
        let patient = null;
        if (this.props.patient) {
            patient =
                <div className={styles.patient_info}>
                    {patientPresenter.default.present(this.props.patient)
                        .map((i) =>
                            <span key={i.label}><span className={styles.bold}>{i.label}: </span>{i.value}</span>
                        )
                    }
                </div>
        } else {
            patient = <Redirect to="/" />;
        }
        if (this.props.loadingFile && this.state.loading) {
            this.setState({ loading: false });
        }
        let patientFiles = null;
        if (this.props.files) {
            patientFiles =
                this.props.files
                    .map((file) =>
                        <div className={styles.wrapper} key={file.id}>
                            <div className={styles.file} >
                                <div className={this.state.activeFile === file.id ? styles.file_active : styles.file_info} onClick={() => this.loadData(file.id)}>
                                    {filePresenter.default.present(file)
                                        .map((i) =>
                                            <span key={i.label}><span className={styles.bold}>{i.label}: </span>{i.value}</span>
                                        )
                                    }
                                </div>
                                <div className={this.state.activeFile === file.id ? styles.file_active : styles.file_info} onClick={() => this.loadData(file.id)}>
                                    {filePresenter.default.presentClicks(file)
                                        .map((i) =>
                                            <span key={i.label}><span className={styles.bold}>{i.value}</span> tracked with <span className={styles.bold}>{i.label}</span> method </span>
                                        )
                                    }
                                </div>
                                <div className={styles.file_icon}>
                                    <DeleteIcon fontSize={"large"} onClick={() => this.deleteFile(file.id)} />
                                </div>
                            </div>
                            {(this.state.activeFile === file.id) && !((this.props.loadingFile) || (this.state.loading)) &&
                                <React.Fragment>
                                    {/* <div className={styles.tags} >
                                        <button onClick={this.onActiveTime} className={this.state.activeTime ? styles.tag : styles.tag_inactive}>TIME</button>
                                        <button onClick={this.onActiveLocation} className={this.state.activeLocation ? styles.tag : styles.tag_inactive}>LOCATION</button>
                                        <button onClick={this.onActiveProgress} className={this.state.activeProgress ? styles.tag : styles.tag_inactive}>PROGRESS</button>
                                    </div> */}

                                    {this.state.activeTime &&
                                        <React.Fragment>
                                            <BarChart
                                                className={styles.chart}
                                                type="TIME"
                                                title="hours"
                                                data={this.props.dataChart["table"]} />
                                            <TimePieChart
                                                className={styles.chart}
                                                type="TIME"
                                                data={this.props.dataChart["timePie"]} />
                                            <BarChart
                                                className={styles.chart}
                                                type="TIME"
                                                data={this.props.dataChart["periodeBar"]} />
                                            <BarChart
                                                className={styles.chart}
                                                type="TIME"
                                                title="days"
                                                data={this.props.dataChart["bar"]} />
                                            {/* <LineChart
                                                className={styles.chart}
                                                data={this.props.dataChart["line"]} /> */}
                                            <BubbleChart
                                                className={styles.chart}
                                                data={this.props.dataChart["bubble"]} />
                                            <HeatMapChart className={styles.chart} data={this.props.dataChart["heatMap"]} />
                                        </React.Fragment>
                                    }
                                    {/* {this.state.activeLocation &&
                                        <React.Fragment>
                                            <MapChart
                                                className={styles.chart}
                                                data={this.props.dataChart["map"]} />
                                            <TimePieChart
                                                className={styles.chart}
                                                type="LOCATION"
                                                data={this.props.dataChart["mapPie"]} />
                                        </React.Fragment>
                                    }
                                    {this.state.activeProgress &&
                                        <React.Fragment>
                                            <BarChart
                                                className={styles.chart}
                                                type="PROGRESS"
                                                title="progress"
                                                data={this.props.dataChart["bar"]} />
                                            <StepChart
                                                className={styles.chart}
                                                data={this.props.dataChart["step"]} />
                                        </React.Fragment>
                                    } */}
                                </React.Fragment>
                            }

                            {(this.state.activeFile === file.id) && ((this.props.loadingFile) || (this.state.loading)) &&
                                <Spinner />
                            }

                        </div>
                    )
        }
        return (
            <Layout>
                <TitleBanner title={"Patient"} />
                {patient}
                <TitleBanner title={"Uploaded Files"} />
                <div className={styles.Drag}>
                    <p className={styles.Drag_title}>Upload a new excel file here:
                    <input type="file" onChange={this.onChange} className={styles.Drag_input} /></p>
                </div>
                {patientFiles}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patient.patient,
        files: state.patient.files,
        loadingFile: state.patient.loading,
        dataChart: state.patient.dataChart,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (file, patientId) => dispatch(actions.load(file, patientId)),
        onLoadData: (fileId, patientId) => dispatch(actions.loadData(fileId, patientId)),
        fetchFiles: (patientId) => dispatch(actions.fetchFiles(patientId)),
        onDeleteFile: (fileId, patientId) => dispatch(actions.deleteFile(fileId, patientId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patient, axios));