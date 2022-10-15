import Modal from 'react-bootstrap/Modal';
import React, { useState, setState } from 'react';
import Dropdown from 'react-dropdown';
import OperationTypeData from '../mockDatas/OperationTypeData.json'
import { CRUDForJSON, dataOperations } from '../helpers/helperFunctions';
import { useDispatch } from "react-redux";
import store from '../redux/store';
import { setAddEditModalVisible } from '../redux/actions/actions';
import { useHistory } from "react-router-dom";
import moment from 'moment';
moment().format();

export const AddEditModal = (props) => {
    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [operationTypeID, setOperationTypeID] = useState(OperationTypeData[0].id);
    const [CRUDType, setType] = useState('')
    let history = useHistory();
    store.subscribe(() => {
        setModalIsOpen(store.getState().mainReducer.isAddEditModalVisible);
        setModalTitle(store.getState().mainReducer.modalTitle)
        setType(store.getState().mainReducer.CRUDType)
    })
    const handleClose = () => {
        dispatch(setAddEditModalVisible(!modalIsOpen))
    }
    const handleChange = (selectedOption) => {
        OperationTypeData.map((data) => { if (data.name == selectedOption) { setOperationTypeID(data.id) } })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (CRUDType == 'add') {
            let id = JSON.parse(localStorage.getItem('dataSource')).length + 1
            var object = {
                'id': id,
                'name': event.target.name.value,
                'description': event.target.description.value,
                'start_date': moment(event.target.startDate.value).format("Y-MM-DD HH:mm:ss"),
                'end_date': moment(event.target.endDate.value).format("Y-MM-DD HH:mm:ss"),
                'operation_type': operationTypeID,
                'created_date': moment().format("Y-MM-DD HH:mm:ss")
            };
            CRUDForJSON(CRUDType, object)
        }
        else if (CRUDType == 'edit') {
            if (props.selectedRow == '' || props.selectedRow == null) {
                var id = event.target.id.value
                var object = {
                    'id': Number(id),
                    'name': event.target.name.value,
                    'description': event.target.description.value,
                    'start_date': moment(event.target.startDate.value).format("Y-MM-DD HH:mm:ss"),
                    'end_date': moment(event.target.endDate.value).format("Y-MM-DD HH:mm:ss"),
                    'operation_type': operationTypeID,
                    'created_date': moment().format("Y-MM-DD HH:mm:ss")
                };
                CRUDForJSON(CRUDType, object, props.selectedRow)
            }
            else {
                var id = props.selectedRow.data.id
                var object = {
                    'id': Number(id),
                    'name': event.target.name.value,
                    'description': event.target.description.value,
                    'start_date': moment(event.target.startDate.value).format("Y-MM-DD HH:mm:ss"),
                    'end_date': moment(event.target.endDate.value).format("Y-MM-DD HH:mm:ss"),
                    'operation_type': operationTypeID,
                    'created_date': moment().format("Y-MM-DD HH:mm:ss")
                };
                CRUDForJSON(CRUDType, object, props.selectedRow)
            }
        }
        dispatch(setAddEditModalVisible(!modalIsOpen))
        dataOperations()
        history.push('/dashboard')
    }
    return (
        <Modal
            show={modalIsOpen}
            onHide={handleClose} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {props.selectedRow == null && CRUDType == 'edit' && <div className="form-group row">
                        <label for="id" className="col-sm-2 col-form-label">ID</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="id" placeholder="ID" required />
                        </div>
                    </div>}
                    <div className="form-group row">
                        <label for="name" className="col-sm-2 col-form-label" >Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" placeholder="Name" required
                                defaultValue={props.selectedRow != null && CRUDType == 'edit' ? props.selectedRow.data.name : ''} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="description" placeholder="Description" required
                                defaultValue={props.selectedRow != null && CRUDType == 'edit' ? props.selectedRow.data.description : ''} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="startDate" className="col-sm-2 col-form-label">Start Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="startDate" required
                                defaultValue={props.selectedRow != null && CRUDType == 'edit' && moment(props.selectedRow.data.start_date).format("Y-MM-DD")} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="endDate" className="col-sm-2 col-form-label">End Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="endDate" required
                                defaultValue={props.selectedRow != null && CRUDType == 'edit' && moment(props.selectedRow.data.end_date).format("Y-MM-DD")} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="operationType" className="col-sm-2 col-form-label">Operation Type</label>
                        <div className="col-sm-10">
                            <Dropdown
                                options={OperationTypeData.map((data) => { return data.name })}
                                onChange={(data) => { handleChange(data.value) }}
                                value={props.selectedRow != null && CRUDType == 'edit' ? props.selectedRow.data.operation_type : OperationTypeData[0].name}
                                placeholder="Select an Operation Type"
                                id="operationType"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" >Save</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}