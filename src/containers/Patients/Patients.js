import React, { Component } from 'react';
import { connect } from 'react-redux';

import Patient from '../../components/Patient/Patient';
import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Patients extends Component {
    componentDidMount () {
        this.props.onFetchPatients(this.props.token, this.props.userId);
    }

    render () {
        console.log(this.props.patients)
        let patients = <Spinner />;
        if ( !this.props.loading ) {
            patients = this.props.patients.map( patient => (
                <Patient
                    key={patient.id}
                    patient={patient}/>
            ) )
        }
        return (
            <div>
                {patients}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        patients: state.patient.patients,
        loading: state.patient.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPatients: (token, userId) => dispatch( actions.fetchPatients(token, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Patients, axios ) );