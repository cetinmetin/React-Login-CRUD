import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, setState } from 'react';
import { useDispatch } from "react-redux";
import store from '../redux/store';
import { setDeleteModalVisible } from '../redux/actions/actions';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

export const DeleteModal = (props) => {
    const dispatch = useDispatch()
    var history = useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    store.subscribe(() => {
        setModalIsOpen(store.getState().mainReducer.isDeleteModalVisible);
    })
    const handleClose = () => {
        dispatch(setDeleteModalVisible(!modalIsOpen))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var idForDelete = event.target.deleteID.value
        var idFounded = false
        var localStorageDataSource = JSON.parse(localStorage.getItem('dataSource'))
        localStorageDataSource.map((data, index) => {
            if (data.id == idForDelete) {
                localStorageDataSource.splice(index, 1)
                idFounded = true
                localStorage.setItem("dataSource", JSON.stringify(localStorageDataSource));
            }
        })
        if (!idFounded) {
            Swal.fire({
                title: 'Error!',
                text: 'Couldnt Find Any Record For This ID',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
        dispatch(setDeleteModalVisible(!modalIsOpen))
        history.push('/dashboard')
    }
    return (
        <Modal
            show={modalIsOpen}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label for="deleteID" className="col-sm-2 col-form-label">ID For Delete:</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control" id="deleteID" required />
                        </div>
                        <div className="col-sm-4 pl-1">
                            <button type="submit" className="btn btn-danger" id="submitButton">Delete</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { handleClose() }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}