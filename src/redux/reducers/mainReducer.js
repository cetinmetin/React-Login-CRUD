import { SET_ADD_EDIT_MODAL_VISIBLE,SET_MODAL_TITLE,SET_TASK_DETAIL_MODAL_VISIBLE,SET_DELETE_MODAL_VISIBLE,SET_CRUD_TYPE } from '../actions/actionTypes'

const initialState = {
    isAddEditModalVisible: false,
    isDeleteModalVisible:false,
    isTaskDetailModalVisible:false,
    modalTitle:'',
    CRUDType:''
}

export default (payload = initialState, action) => {
    switch (action.type) {
        case SET_ADD_EDIT_MODAL_VISIBLE:
            return {
                ...payload,
                isAddEditModalVisible:action.status
            }
        case SET_MODAL_TITLE:
            return {
                ...payload,
                modalTitle:action.status
            }
        case SET_TASK_DETAIL_MODAL_VISIBLE:
            return {
                ...payload,
                isTaskDetailModalVisible:action.status
            }
        case SET_DELETE_MODAL_VISIBLE:
            return {
                ...payload,
                isDeleteModalVisible:action.status
            }
        case SET_CRUD_TYPE:
            return {
                ...payload,
                CRUDType:action.status
            }
        default:
            return payload
    }
}