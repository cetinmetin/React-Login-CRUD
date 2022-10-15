import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import store from '../redux/store';
import { setTaskDetailModalVisible } from '../redux/actions/actions';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { taskDetails } from '../helpers/helperFunctions';
import moment from 'moment';
import Swal from 'sweetalert2'
moment().format();

export const TaskDetailModal = (props) => {
    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gridRef, setGridRef] = useState(null);
    const columns = [
        { name: 'branch', header: 'Branch', minWidth: 50, defaultFlex: 1 },
        { name: 'oss_name', header: 'OSSName', maxWidth: 1000, defaultFlex: 1 },
        { name: 'site', header: 'Site', maxWidth: 1000, defaultFlex: 1 },
        { name: 'vendor', header: 'VendorName', maxWidth: 1000, defaultFlex: 1 },
        { name: 'technology', header: 'Technology', maxWidth: 1000, defaultFlex: 1 }
      ]

    store.subscribe(() => {
        setModalIsOpen(store.getState().mainReducer.isTaskDetailModalVisible);
    })
    const handleClose = () =>{
        dispatch(setTaskDetailModalVisible(!modalIsOpen))
        setDataSource([])
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var tempDataSource = []
        var reportDate = moment(event.target.reportDate.value).format("Y-MM-DD HH:mm:ss")
        tempDataSource = taskDetails(reportDate)
        setDataSource(tempDataSource)
        if(tempDataSource.length == 0){
          Swal.fire({
            title: 'Error!',
            text: 'Couldnt Find Any Record For This Date',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
        setLoading(false)
    }
    const SEPARATOR = ',';
    const downloadBlob = (blob, fileName = 'grid-data.xls') => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
      
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.position = 'absolute';
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        
        link.click();
      
        document.body.removeChild(link);
      };
      const exportXLS = () => {
        if(dataSource.length > 0){
        const columns = gridRef.current.visibleColumns;
        const header = columns.map((c) => c.name).join(SEPARATOR);
        const rows = gridRef.current.dataSource.map((data) => columns.map((c) => data[c.id]).join(SEPARATOR));
    
        const contents = [header].concat(rows).join('\n');
        const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });
    
        downloadBlob(blob);
        }
        else
            document.getElementById('submitButton').click()
      };
    return(

        <Modal 
        show={modalIsOpen} 
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >   
        <Modal.Header closeButton>
          <Modal.Title>Autocorrection Task Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleSubmit}>
        <div className="form-group row">
            <label for="reportDate" className="col-sm-2 col-form-label">Report Date:</label>
            <div className="col-sm-4">
            <input type="date" className="form-control" id="reportDate" required/>
            </div>
            <div className="col-sm-4 pl-1">
            <button type="submit" className="btn btn-primary" id="submitButton">Run</button>
            </div>
        </div>

        </form>
        <div><div class="ui attached tabular menu"><a class="active item">
        Task Details
        </a>
        </div>
        <div class="ui bottom attached segment active tab">
        {dataSource.length > 0 ? <ReactDataGrid
            columns={columns}
            dataSource={dataSource}
            pagination
            defaultLimit={25}
            loading={loading}
            handle={setGridRef}
            /> : ''}
        </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>{handleClose()}}>Close</Button>
        <Button variant="primary" onClick={()=>{exportXLS()}}>Export</Button>
      </Modal.Footer>
        </Modal>
    )
}