import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import styles from './Patient.css';
import Layout from '../../hoc/Layout/Layout';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Patient extends Component {

    state = {
        file: null
    }

    onChange = (e) => {
        console.log("CHANGE", e.target.files[0])
        this.setState({ file: e.target.files[0] })
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        this.props.onLoad(formData);
    }

    onFormSubmit = (e) => {
        const formData = new FormData();
        formData.append('file', this.state.file);
        console.log(this.state.file, formData)
        e.preventDefault() // Stop form submit
        this.props.onLoad(formData);
    }

    render() {
        let patient = null;
        if (this.props.patient) {
            patient = <div className={styles.info}>
                <p>{this.props.patient.name} {this.props.patient.surname}</p>
            </div>
        }
        return (
            <Layout>
                {patient}
                <div className={styles.Drag}>
                    <CloudUploadIcon className={styles.icon} />
                    <input type="file" name="file" id="file" className={styles.browse__button} onChange={this.onChange}  />
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
        onLoad: (file) => dispatch(actions.load(file)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patient, axios));