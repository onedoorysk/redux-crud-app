export const deleteAction = id => ({type: 'DELETE', id})
export const initializeAction = {type: 'INITIALIZE'}
export const changeNameAction = name => ({type: 'CHANGE_NAME', name})
export const changeAgeAction = age => ({type: 'CHANGE_AGE', age})
export const requestDataAction = {type: 'REQUEST_DATA'}
export const receiveDataSuccess = characterArray => ({type: 'RECEIVE_DATA_SUCCESS', characterArray})
export const receiveDataFailed = {type: 'RECEIVE_DATA_FAILED'}