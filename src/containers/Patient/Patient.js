import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as patientPresenter from '../../store/presenters/patient';

import styles from './Patient.css';
import Layout from '../../hoc/Layout/Layout';
import DragAndDrop from '../../components/UI/DragAndDrop/DragAndDrop'

class Patient extends Component {
    handleDrop = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            console.log(reader.result);
        }
        reader.readAsText(files[0]);
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            console.log(reader.result);
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
                <DragAndDrop handleFiles={this.handleFiles} handleDrop={this.handleDrop} />
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