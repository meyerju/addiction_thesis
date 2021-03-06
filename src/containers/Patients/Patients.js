import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBanner from "../../components/UI/TitleBanner/TitleBanner";
import axios from '../../axios-patients';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as patientPresenter from '../../store/presenters/patient';

import styles from './Patients.css';
import Layout from '../../hoc/Layout/Layout';
import BubbleChart from '../../components/Charts/BubbleChart/BubbleChart';

class Patients extends Component {
    state = {
        currentPage: 0,
    }

    componentDidMount() {
        this.props.onFetchPatients(this.props.token, this.props.userId);
    }

    chosePatientHandler(row){
        this.props.onChosePatient(row);
        this.props.history.push('/patient');
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
                        <button onClick={() => this.chosePatientHandler(row)} className={styles.table__row} key={row.id}>
                            {columnsTable
                                .map((column) =>
                                    <div className={styles.table__cell} key={row.id + column.id}>
                                        <span>{patientPresenter.default.presentOneTableElement(row, column)}</span>
                                    </div>
                                )
                            }
                        </button>
                    );
                })
        }

        return (
            <Layout>
                <TitleBanner title={"My Patients"}/>
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
            </Layout>
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
        onFetchPatients: (token, userId) => dispatch(actions.fetchPatients(token, userId)),
        onChosePatient: (patient) => dispatch(actions.chosePatient(patient)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Patients, axios));