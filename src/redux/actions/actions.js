import { SET_ADD_EDIT_MODAL_VISIBLE, SET_MODAL_TITLE,SET_TASK_DETAIL_MODAL_VISIBLE, SET_DELETE_MODAL_VISIBLE,SET_CRUD_TYPE } from './actionTypes'

export const setAddEditModalVisible = (newStatus) =>({
    type:SET_ADD_EDIT_MODAL_VISIBLE,
    status:newStatus
})
export const setModalTitle = (newStatus) =>({
    type:SET_MODAL_TITLE,
    status:newStatus
})
export const setTaskDetailModalVisible = (newStatus) => ({
    type:SET_TASK_DETAIL_MODAL_VISIBLE,
    status:newStatus
})
export const setDeleteModalVisible = (newStatus) => ({
    type:SET_DELETE_MODAL_VISIBLE,
    status:newStatus
})
export const setCRUDType = (newStatus) => ({
    type:SET_CRUD_TYPE,
    status: newStatus
})