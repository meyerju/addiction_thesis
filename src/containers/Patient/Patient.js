import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-patients';

import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../hoc/Layout/Layout';

import * as actions from '../../store/actions/index';
import styles from './Patient.css';

class Patient extends Component {

    state = {
        file: null
    }

    componentDidMount() {
        console.log("MOUNT");
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

    render() {
        let patient = null;
        if (this.props.patient) {
            patient =
                <div className={styles.info}>
                    <p>{this.props.patient.person.name} {this.props.patient.person.surname}</p>
                </div>
        } else {
            patient = <Redirect to="/" />;
        }

        let patientFiles = null;
        if (this.props.files) {
            patientFiles =
                this.props.files
                    .map((file) => <div className={styles.info}>   <p>{file.name}</p><p>Uploaded on : {file.upload_date}</p></div>
                    )
        }
        if(this.props.loading) {
            patientFiles = <Spinner />;
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
        loading: state.patient.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (file, patientId) => dispatch(actions.load(file,patientId)),
        fetchFiles: (patientId) => dispatch(actions.fetchFiles(patientId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patient, axios));