import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';

import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as patientPresenter from '../../store/presenters/patient';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import styles from './Patient.css';
import Layout from '../../hoc/Layout/Layout';

class Patient extends Component {
    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);
    }

    render() {
        console.log(this.props.patient);
        let patient = null;
        if (this.props.patient) {
            patient = <div className={styles.info}>
                <p>{this.props.patient.name} {this.props.patient.surname}</p>
            </div>
        }
        return (
            <Layout>
                {patient}
                <div className={styles.upload}>
                    <CloudUploadIcon className={styles.icon} />
                    <span className={styles.drag}>Drag and Drop your csv file here.</span>
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}><span className={styles.browse}>Or
                        <button className={styles.browse__button}>browse</button>
                        to choose a file </span> </ReactFileReader>
                </div>

            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patient.patient,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patient, axios));