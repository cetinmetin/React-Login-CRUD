import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { AddEditModal } from '../components/AddEditModal';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { connect } from "react-redux";
import store from '../redux/store';
import {
    setAddEditModalVisible, setModalTitle,
    setTaskDetailModalVisible, setDeleteModalVisible, setCRUDType
} from '../redux/actions/actions';
import { dataOperations, CRUDForJSON } from '../helpers/helperFunctions';
import { DeleteModal } from '../components/DeleteModal';
var jwt = require('jsonwebtoken')

// store.subscribe(() => {
//     this.setState({modalIsOpen:store.getState().mainReducer.isModalVisible});
// })

const mapStateToProps = state => {
    return {
        addEditModalIsOpen: state.isAddEditModalVisible,
        taskDetailModalIsOpen: state.isTaskDetailModalVisible,
        deleteModalIsOpen: state.isDeleteModalVisible,
        CRUDType: state.CRUDType
    };
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
            token: '',
            jwtExpire: false,
            addEditModalIsOpen: false,
            taskDetailModalIsOpen: false,
            modalContentLabel: '',
            modalOpenType: '',
            modalTitle: '',
            idForDelete: -1,
            selectedRow: null,
            localStorageDataSource: '',
            deleteModalIsOpen: false,
            CRUDType: '',
            columns: [
                { name: 'name', header: 'Name', minWidth: 50, defaultFlex: 1 },
                { name: 'description', header: 'Description', maxWidth: 1000, defaultFlex: 1 },
                { name: 'start_date', header: 'Start Date', maxWidth: 1000, defaultFlex: 1 },
                { name: 'end_date', header: 'End Date', maxWidth: 1000, defaultFlex: 1 },
                { name: 'operation_type', header: 'Operation Type', maxWidth: 1000, defaultFlex: 1 },
                { name: 'created_date', header: 'Created Date', maxWidth: 1000, defaultFlex: 1 }
            ]
        };
        dataOperations()
        this.state.localStorageDataSource = JSON.parse(localStorage.getItem('dataSource'))
    }

    componentDidMount() {
        this.jwtTokenExpireControl();

    }
    deleteData() {
        if (this.state.idForDelete >= 0) {
            CRUDForJSON('delete', this.state.idForDelete);
            this.setState({ idForDelete: -1 })
            this.props.history.push('/dashboard')
        }
        else {
            this.props.setDeleteModalVisible(!this.state.deleteModalIsOpen)
        }

    }
    jwtTokenExpireControl() {
        var isExpired = false;
        const token = localStorage.getItem('token');
        if (token) {
            var decodedToken = jwt.decode(token, { complete: true });
            var dateNow = new Date();
            if (decodedToken.exp < dateNow.getTime())
                isExpired = true;
        }
        else
            isExpired = true
        if (isExpired)
            this.logout()

    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('dataSource');
        localStorage.setItem('isLoggedIn', false);
        this.setState({ toLogin: true });
    };
    handleChange = (row, e) => {
        this.setState({ idForDelete: row.data.id })
        this.setState({ selectedRow: row })
    };
    openAddEditModal(modalTitle, CRUDType) {
        this.props.setModalTitle(modalTitle)
        this.props.setAddEditModalVisible(!this.state.addEditModalIsOpen)
        this.props.setCRUDType(CRUDType)
    }
    openTaskDetailModal() {
        this.props.setTaskDetailModalVisible(!this.state.taskDetailModalIsOpen)
    }
    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid" style={{ height: '90%' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Autocorrection</Link>
                                </li>
                            </ol>
                            <ReactDataGrid
                                columns={this.state.columns}
                                dataSource={JSON.parse(localStorage.getItem('dataSource'))}
                                style={{ height: '100%' }}
                                pagination
                                defaultLimit={25}
                                enableSelection
                                onSelectionChange={this.handleChange}


                            />
                        </div>
                        <div id="add-edit-modal">
                            <AddEditModal
                                modalContentLabel={this.state.modalContentLabel}
                                title={this.state.modalTitle}
                                selectedRow={this.state.selectedRow}
                            />
                        </div>
                        <div id="task-detail-modal">
                            <TaskDetailModal />
                        </div>
                        <div id="delete-modal">
                            <DeleteModal />
                        </div>

                        <footer className="sticky-footer">
                            <div className="container-fluid my-auto ml-0 w-100 d-inline-block">
                                <div className="row w-100 p-3">
                                    <div className="col ml-0 p-1">
                                        <button type="button" className="btn btn-info p-1 px-2" onClick={() => this.openTaskDetailModal()}>Show Details</button>
                                    </div>
                                    <div className="col-md-auto p-1">
                                        <button type="button" className="btn btn-info p-1 px-2" onClick={() => this.openAddEditModal('Add New Data', 'add')}>
                                            <i className="fas fa-plus-square mr-1"></i>New</button>
                                    </div>
                                    <div className="col-md-auto p-1">
                                        <button type="button" className="btn btn-info p-1 px-2" onClick={() => this.openAddEditModal('Edit Data', 'edit')}>
                                            <i className="fas fa-edit mr-1"></i>Edit</button>
                                    </div>
                                    <div className="col-md-auto p-1">
                                        <button type="button" className="btn btn-info p-1 px-2"
                                            onClick={() => this.deleteData()}>
                                            <i className="fas fa-times mr-1"></i>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

        );
    }
}
const mapDispatchToProps = {
    setAddEditModalVisible,
    setTaskDetailModalVisible,
    setModalTitle,
    setDeleteModalVisible,
    setCRUDType
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)