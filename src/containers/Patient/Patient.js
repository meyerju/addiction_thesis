import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-patients';
import DeleteIcon from '@material-ui/icons/Delete';
import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import Spinner from '../../components/UI/Spinner/Spinner';
import BarChart from '../../components/Charts/BarChart/BarChart';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../hoc/Layout/Layout';

import * as patientPresenter from '../../store/presenters/patient';
import * as filePresenter from '../../store/presenters/file';

import * as actions from '../../store/actions/index';
import styles from './Patient.css';

const columns = [
    ['My Numbers', 30, 200, 100, 400, 150, 250],
    ['Your Numbers', 50, 20, 10, 40, 15, 25]
];

class Patient extends Component {

    state = {
        activeFile: -1,
        chartType: 'bar'

    }

    componentDidMount() {
        if (this.props.patient && this.props.patient.id) {
            this.props.fetchFiles(this.props.patient.id);
        }
    }

    onChange = (e) => {
        console.log("CHANGE", e.target.files[0])
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

    loadData(id) {
        console.log(id)
        if (this.state.activeFile !== id) {
            this.setState({ activeFile: id });
            this.props.onLoadData(id, this.props.patient.id);
        } else {
            this.setState({ activeFile: -1 });
        }
    }

    render() {
        console.log("CHART", this.props.files);
        let patient = null;
        if (this.props.patient) {
            patient =
                <div className={styles.file_info}>
                    {patientPresenter.default.present(this.props.patient)
                        .map((i) =>
                            <span key={i.label}><span className={styles.bold}>{i.label}: </span>{i.value}</span>
                        )
                    }
                </div>
        } else {
            patient = <Redirect to="/" />;
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
                                <div className={styles.file_icon}>
                                    <DeleteIcon fontSize={"large"} onClick={() => this.deleteFile(file.id)} />
                                </div>
                            </div>
                            { (this.state.activeFile === file.id) && (!this.props.loadingFile) &&
                                <BarChart
                                    className={styles.chart}
                                    data={this.props.dataChart['bar']} />
                            }
                            { (this.state.activeFile === file.id) && (this.props.loadingFile) &&
                                <Spinner />
                            }
                        </div>
                    )
        }
        return (
            <Layout>
                {patient}
                <TitleBanner title={"Uploaded Files"} />
                <div className={styles.Drag}>
                    <p>Upload a new excel file here</p>
                    <input type="file" onChange={this.onChange} />
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