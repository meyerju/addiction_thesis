import React, { Component } from 'react';
import { connect } from 'react-redux';

import Patient from '../../components/Patient/Patient';
import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as patientPresenter from '../../store/presenters/patient';

import styles from './Patients.css';

class Patients extends Component {
    state = {
        currentPage: 0,
    }

    componentDidMount() {
        this.props.onFetchPatients(this.props.token, this.props.userId);
    }

    render() {
        const { currentPage } = this.state;
        const rowsPerPage = 10;
        let patients = <Spinner />;
        let columnsTable = patientPresenter.default.presentForTable();
        if (!this.props.loading) {
            patients = this.props.patients
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                        <div className={styles.table__row} key={row.id}>
                            {columnsTable
                                .map((column) =>
                                    <div className={styles.table__cell} key={row.id + column.id}>
                                        <span>{patientPresenter.default.presentOneTableElement(row, column)}</span>
                                    </div>
                                )
                            }
                        </div>
                    );
                })
        }

        return (
            <div className={styles.table}>
                <div className={styles.header}>
                    {columnsTable
                        .map(
                            (column) => (
                                <div className={styles.header__cell} key={column.id}>
                                    <span>{column.label}</span>
                                </div>
                            ), this)
                    }
                </div>
                <div className={styles.table__body}>
                    {patients}
                </div>
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
        onFetchPatients: (token, userId) => dispatch(actions.fetchPatients(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patients, axios));