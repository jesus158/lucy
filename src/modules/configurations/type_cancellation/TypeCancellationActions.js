export const FIND_TYPE_CANCELLATION_LIST = 'FIND_TYPE_CANCELLATION_LIST';
export const FIND_TYPE_CANCELLATION_LIST_SUCCESS = 'FIND_TYPE_CANCELLATION_LIST_SUCCESS';
export const FIND_TYPE_CANCELLATION_LIST_ERROR = 'FIND_TYPE_CANCELLATION_LIST_ERROR';

export const CONFIGURE_TYPE_CANCELLATION = 'CONFIGURE_TYPE_CANCELLATION';
export const CONFIGURE_TYPE_CANCELLATION_SUCCESS = 'CONFIGURE_TYPE_CANCELLATION_SUCCESS';
export const CONFIGURE_TYPE_CANCELLATION_ERROR = 'CONFIGURE_TYPE_CANCELLATION_ERROR';

export const GET_TYPE_CANCELLATION_BY_ID = 'GET_TYPE_CANCELLATION_BY_ID';
export const GET_TYPE_CANCELLATION_BY_ID_SUCCESS = 'GET_TYPE_CANCELLATION_BY_ID_SUCCESS';
export const GET_TYPE_CANCELLATION_BY_ID_ERROR = 'GET_TYPE_CANCELLATION_BY_ID_ERROR';

export const INACTIVE_TYPE_CANCELLATION = 'INACTIVE_TYPE_CANCELLATION';
export const INACTIVE_TYPE_CANCELLATION_SUCCESS = 'INACTIVE_TYPE_CANCELLATION_SUCCESS';
export const INACTIVE_TYPE_CANCELLATION_ERROR = 'INACTIVE_TYPE_CANCELLATION_ERROR';

export const GET_LIST_ACTIVE_TYPE_CANCELLATION = 'GET_LIST_ACTIVE_TYPE_CANCELLATION';
export const GET_LIST_ACTIVE_TYPE_CANCELLATION_SUCCESS = 'GET_LIST_ACTIVE_TYPE_CANCELLATION_SUCCESS';
export const GET_LIST_ACTIVE_TYPE_CANCELLATION_ERROR = 'GET_LIST_ACTIVE_TYPE_CANCELLATION_ERROR';

export const SET_TYPE_CANCELLATION = 'SET_TYPE_CANCELLATIONS';

/*********************************
 * Filtrar  tipos de Cancelación *
 *********************************/

export const findTypeCancellation = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_CANCELLATION_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeCancellationSuccess = (listResultSetTypeCancellation) => (
    {
        type: FIND_TYPE_CANCELLATION_LIST_SUCCESS
        , listResultSetTypeCancellation
    }
);

export const findTypeCancellationError = (error) => (
    {
        type: FIND_TYPE_CANCELLATION_LIST_ERROR
        , error
    }
);

/*********************************
* Manejo de tipos de Cancelación *
**********************************/

export const configureTypeCancellation = (typeCancellation, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_CANCELLATION
        , typeCancellation
        , ownProps
        , onSuccess

    }
);

export const configureTypeCancellationSuccess = () => (
    {
        type: CONFIGURE_TYPE_CANCELLATION_SUCCESS
    }
);

export const configureTypeCancellationError = (error) => (
    {
        type: CONFIGURE_TYPE_CANCELLATION_ERROR
        , error
    }
);

export const setTypeCancellation = (typeCancellation) => (
    {
        type: SET_TYPE_CANCELLATION
        , typeCancellation
    }
);

/************************************
* Buscar tipo de cancelación por ID *
*************************************/

export const getTypeCancellationById = (id) => (
    {
        type: GET_TYPE_CANCELLATION_BY_ID
        , id
    }
);

export const getTypeCancellationByIdSuccess = (typeCancellation) => (
    {
        type: GET_TYPE_CANCELLATION_BY_ID_SUCCESS
        , typeCancellation
    }
);

export const getTypeCancellationByIdError = (error) => (
    {
        type: GET_TYPE_CANCELLATION_BY_ID_ERROR
        , error
    }
);

/****************************************
* Desactivar tipo de cancelación por ID *
*****************************************/

export const inactiveTypeCancellation = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_CANCELLATION
        , id
        , onSuccess

    }
);

export const inactiveTypeCancellationSuccess = () => (
    {
        type: INACTIVE_TYPE_CANCELLATION_SUCCESS
    }
);

export const inactiveTypeCancellationError = (error) => (
    {
        type: INACTIVE_TYPE_CANCELLATION_ERROR
        , error
    }
);

/*************************************
* Recupera el listado de los tipos *
* de rechazo activos               *
**************************************/

export const getListActiveTypeCancellation = (onSuccess) => (
    {
        type: GET_LIST_ACTIVE_TYPE_CANCELLATION
        , onSuccess
    }
);

export const getListActiveTypeCancellationSuccess = (listTypeCancellation) => (
    {
        type: GET_LIST_ACTIVE_TYPE_CANCELLATION_SUCCESS,
        listTypeCancellation
    }
);

export const getListActiveTypeCancellationError = (error) => (
    {
        type: GET_LIST_ACTIVE_TYPE_CANCELLATION_ERROR
        , error
    }
);