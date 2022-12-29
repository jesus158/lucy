export const FIND_IDEAL_TIME_LIST = 'FIND_IDEAL_TIME_LIST';
export const FIND_IDEAL_TIME_LIST_SUCCESS = 'FIND_IDEAL_TIME_LIST_SUCCESS';
export const FIND_IDEAL_TIME_LIST_ERROR = 'FIND_IDEAL_TIME_LIST_ERROR';

export const CONFIGURE_IDEAL_TIME = 'CONFIGURE_IDEAL_TIME';
export const CONFIGURE_IDEAL_TIME_SUCCESS = 'CONFIGURE_IDEAL_TIME_SUCCESS';
export const CONFIGURE_IDEAL_TIME_ERROR = 'CONFIGURE_IDEAL_TIME_ERROR';

export const GET_IDEAL_TIME_BY_ID = 'GET_IDEAL_TIME_BY_ID';
export const GET_IDEAL_TIME_BY_ID_SUCCESS = 'GET_IDEAL_TIME_BY_ID_SUCCESS';
export const GET_IDEAL_TIME_BY_ID_ERROR = 'GET_IDEAL_TIME_BY_ID_ERROR';

export const INACTIVE_IDEAL_TIME = 'INACTIVE_IDEAL_TIME';
export const INACTIVE_IDEAL_TIME_SUCCESS = 'INACTIVE_IDEAL_TIME_SUCCESS';
export const INACTIVE_IDEAL_TIME_ERROR = 'INACTIVE_IDEAL_TIME_ERROR';

export const GET_LIST_ACTIVE_IDEAL_TIME = 'GET_LIST_ACTIVE_IDEAL_TIME';
export const GET_LIST_ACTIVE_IDEAL_TIME_SUCCESS = 'GET_LIST_ACTIVE_IDEAL_TIME_SUCCESS';
export const GET_LIST_ACTIVE_IDEAL_TIME_ERROR = 'GET_LIST_ACTIVE_TYPE_ERROR';

export const SET_IDEAL_TIME = 'SET_IDEAL_TIME';

// Ubicaciones
export const GET_LIST_ACTIVE_SHOW = 'GET_LIST_ACTIVE_SHOW';
export const GET_LIST_ACTIVE_SHOW_SUCCESS = 'GET_LIST_ACTIVE_SHOW_SUCCESS';
export const GET_LIST_ACTIVE_SHOW_ERROR = 'GET_LIST_ACTIVE_SHOW_ERROR';


/******************************
 * Filtrar Habitaciones y Camas *
 * Filtrar Habitaciones y Camas *as
 ******************************/

export const findIdealTime = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => ({
    type: FIND_IDEAL_TIME_LIST,
    apiPaginationAction,
    apiPaginationCurrentPage,
    apiPaginationDirection,
    apiPaginationLimit,
    apiPaginationOrderColumn,
    apiPaginationMoveToPage,
    apiPaginationFilter
});

export const findIdealTimeListSuccess = (listResultSetIdealTime) => ({
    type: FIND_IDEAL_TIME_LIST_SUCCESS,
    listResultSetIdealTime
});

export const findIdealTimeListError = (error) => ({
    type: FIND_IDEAL_TIME_LIST_ERROR,
    error
});

/******************************
 * Manejo de Habitaciones - camas *
 *******************************/

export const configureIdealTime = (idealTime, ownProps, onSuccess) => ({
    type: CONFIGURE_IDEAL_TIME,
    idealTime,
    ownProps,
    onSuccess

});

export const configureIdealTimeSuccess = () => ({
    type: CONFIGURE_IDEAL_TIME_SUCCESS
});

export const configureIdealTimeError = (error) => ({
    type: CONFIGURE_IDEAL_TIME_ERROR,
    error
});

export const setIdealTime = (idealTime) => ({
    type: SET_IDEAL_TIME,
    idealTime
});

/********************************
 * Buscar habitación/cama por ID *
 *********************************/

export const getIdealTimeById = (id) => ({
    type: GET_IDEAL_TIME_BY_ID,
    id
});

export const getIdealTimeByIdSuccess = (idealTime) => ({
    type: GET_IDEAL_TIME_BY_ID_SUCCESS,
    idealTime
});

export const getIdealTimeByIdError = (error) => ({
    type: GET_IDEAL_TIME_BY_ID_ERROR,
    error
});

/*************************************
 * Desactivar habitación/cama por ID *
 **************************************/

export const inactiveIdealTime = (id, onSuccess) => ({

    type: INACTIVE_IDEAL_TIME,
    id,
    onSuccess

});

export const inactiveIdealTimeSuccess = () => ({
    type: INACTIVE_IDEAL_TIME_SUCCESS
});

export const inactiveIdealTimeError = (error) => ({
    type: INACTIVE_IDEAL_TIME_ERROR,
    error
});

export const getListActiveIdealTime = (onSuccess) => ({
    type: GET_LIST_ACTIVE_IDEAL_TIME,
    onSuccess
})

export const getListActiveIdealTimeSuccess = (data) => ({
    type: GET_LIST_ACTIVE_IDEAL_TIME_SUCCESS,
    data
})

export const getListActiveIdealTimeError = (error) => ({
    type: GET_LIST_ACTIVE_IDEAL_TIME_ERROR,
    error
})

export const getListActiveShowService = () => ({
    type: GET_LIST_ACTIVE_SHOW
});

export const getListActiveShowSuccess = (listUbication) => ({
    type: GET_LIST_ACTIVE_SHOW_SUCCESS
    , listUbication
});

export const getListActiveShowError = (error) => ({
    type: GET_LIST_ACTIVE_SHOW_ERROR
    , error
});