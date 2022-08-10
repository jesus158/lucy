export const FIND_TYPE_ALERT_LIST = 'FIND_TYPE_ALERT_LIST';
export const FIND_TYPE_ALERT_LIST_SUCCESS = 'FIND_TYPE_ALERT_LIST_SUCCESS';
export const FIND_TYPE_ALERT_LIST_ERROR = 'FIND_TYPE_ALERT_LIST_ERROR';

export const CONFIGURE_TYPE_ALERT = 'CONFIGURE_TYPE_ALERT';
export const CONFIGURE_TYPE_ALERT_SUCCESS = 'CONFIGURE_TYPE_ALERT_SUCCESS';
export const CONFIGURE_TYPE_ALERT_ERROR = 'CONFIGURE_TYPE_ALERT_ERROR';

export const GET_TYPE_ALERT_BY_ID = 'GET_TYPE_ALERT_BY_ID';
export const GET_TYPE_ALERT_BY_ID_SUCCESS = 'GET_TYPE_ALERT_BY_ID_SUCCESS';
export const GET_TYPE_ALERT_BY_ID_ERROR = 'GET_TYPE_ALERT_BY_ID_ERROR';

export const INACTIVE_TYPE_ALERT = 'INACTIVE_TYPE_ALERT';
export const INACTIVE_TYPE_ALERT_SUCCESS = 'INACTIVE_TYPE_ALERT_SUCCESS';
export const INACTIVE_TYPE_ALERT_ERROR = 'INACTIVE_TYPE_ALERT_ERROR';

export const GET_LIST_ACTIVE_TYPE_ALERT = 'GET_LIST_ACTIVE_TYPE_ALERT';
export const GET_LIST_ACTIVE_TYPE_ALERT_SUCCESS = 'GET_LIST_ACTIVE_TYPE_ALERT_SUCCESS';
export const GET_LIST_ACTIVE_TYPE_ALERT_ERROR = 'GET_LIST_ACTIVE_TYPE_ERROR';

export const SET_TYPE_ALERT = 'SET_TYPE_ALERT';

/******************************
 * Filtrar  tipos de activos *
 * Filtrar  tipos de activos *as
 ******************************/

export const findTypeAlert = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: FIND_TYPE_ALERT_LIST,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const findTypeAlertSuccess = (listResultSetTypeAlert) => ({
    type: FIND_TYPE_ALERT_LIST_SUCCESS,
    listResultSetTypeAlert
});

export const findTypeAlertError = (error) => ({
    type: FIND_TYPE_ALERT_LIST_ERROR,
    error
});

/******************************
 * Manejo de tipos de alerta *
 *******************************/

export const configureTypeAlert = (typeAlert, ownProps, onSuccess) => ({
    type: CONFIGURE_TYPE_ALERT,
    typeAlert,
    ownProps,
    onSuccess

});

export const configureTypeAlertSuccess = () => ({
    type: CONFIGURE_TYPE_ALERT_SUCCESS
});

export const configureTypeAlertError = (error) => ({
    type: CONFIGURE_TYPE_ALERT_ERROR,
    error
});

export const setTypeAlert = (typeAlert) => ({
    type: SET_TYPE_ALERT,
    typeAlert
});

/********************************
 * Buscar tipo de alerta por ID *
 *********************************/

export const getTypeAlertById = (id) => ({
    type: GET_TYPE_ALERT_BY_ID,
    id
});

export const getTypeAlertByIdSuccess = (typeAlert) => ({
    type: GET_TYPE_ALERT_BY_ID_SUCCESS,
    typeAlert
});

export const getTypeAlertByIdError = (error) => ({
    type: GET_TYPE_ALERT_BY_ID_ERROR,
    error
});

/*************************************
 * Desactivar tipo de alerta por ID *
 **************************************/

export const inactiveTypeAlert = (id, onSuccess) => ({
    type: INACTIVE_TYPE_ALERT,
    id,
    onSuccess

});

export const inactiveTypeAlertSuccess = () => ({
    type: INACTIVE_TYPE_ALERT_SUCCESS
});

export const inactiveTypeAlertError = (error) => ({
    type: INACTIVE_TYPE_ALERT_ERROR,
    error
});

/*************************************************
 * Recuperar listado de tipos de alertas en modo alertas *
 *************************************************/

export const getListActiveTypeAlert = (onSuccess) => ({
    type: GET_LIST_ACTIVE_TYPE_ALERT,
    onSuccess
});

export const getListActiveTypeAlertSuccess = (listTypeAlert) => ({
    type: GET_LIST_ACTIVE_TYPE_ALERT_SUCCESS,
    listTypeAlert
});

export const getListActiveTypeAlertError = (error) => ({
    type: GET_LIST_ACTIVE_TYPE_ALERT_ERROR,
    error
});