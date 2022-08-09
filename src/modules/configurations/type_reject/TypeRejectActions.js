export const FIND_TYPE_REJECT_LIST = 'FIND_TYPE_REJECT_LIST';
export const FIND_TYPE_REJECT_LIST_SUCCESS = 'FIND_TYPE_REJECT_LIST_SUCCESS';
export const FIND_TYPE_REJECT_LIST_ERROR = 'FIND_TYPE_REJECT_LIST_ERROR';

export const CONFIGURE_TYPE_REJECT = 'CONFIGURE_TYPE_REJECT';
export const CONFIGURE_TYPE_REJECT_SUCCESS = 'CONFIGURE_TYPE_REJECT_SUCCESS';
export const CONFIGURE_TYPE_REJECT_ERROR = 'CONFIGURE_TYPE_REJECT_ERROR';

export const GET_TYPE_REJECT_BY_ID = 'GET_TYPE_REJECT_BY_ID';
export const GET_TYPE_REJECT_BY_ID_SUCCESS = 'GET_TYPE_REJECT_BY_ID_SUCCESS';
export const GET_TYPE_REJECT_BY_ID_ERROR = 'GET_TYPE_REJECT_BY_ID_ERROR';

export const INACTIVE_TYPE_REJECT = 'INACTIVE_TYPE_REJECT';
export const INACTIVE_TYPE_REJECT_SUCCESS = 'INACTIVE_TYPE_REJECT_SUCCESS';
export const INACTIVE_TYPE_REJECT_ERROR = 'INACTIVE_TYPE_REJECT_ERROR';

export const GET_LIST_ACTIVE_TYPE_REJECT = 'GET_LIST_ACTIVE_TYPE_REJECT';
export const GET_LIST_ACTIVE_TYPE_REJECT_SUCCESS = 'GET_LIST_ACTIVE_TYPE_REJECT_SUCCESS';
export const GET_LIST_ACTIVE_TYPE_REJECT_ERROR = 'GET_LIST_ACTIVE_TYPE_REJECT_ERROR';

export const SET_TYPE_REJECT = 'SET_TYPE_REJECTS';

/*****************************
 * Filtrar  tipos de rechazo *
 *****************************/

export const findTypeReject = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_REJECT_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeRejectSuccess = (listResultSetTypeReject) => (
    {
        type: FIND_TYPE_REJECT_LIST_SUCCESS
        , listResultSetTypeReject
    }
);

export const findTypeRejectError = (error) => (
    {
        type: FIND_TYPE_REJECT_LIST_ERROR
        , error
    }
);

/*****************************
* Manejo de tipos de rechazo *
******************************/

export const configureTypeReject = (typeReject, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_REJECT
        , typeReject
        , ownProps
        , onSuccess

    }
);

export const configureTypeRejectSuccess = () => (
    {
        type: CONFIGURE_TYPE_REJECT_SUCCESS
    }
);

export const configureTypeRejectError = (error) => (
    {
        type: CONFIGURE_TYPE_REJECT_ERROR
        , error
    }
);

export const setTypeReject = (typeReject) => (
    {
        type: SET_TYPE_REJECT
        , typeReject
    }
);

/********************************
* Buscar tipo de rechazo por ID *
*********************************/

export const getTypeRejectById = (id) => (
    {
        type: GET_TYPE_REJECT_BY_ID
        , id
    }
);

export const getTypeRejectByIdSuccess = (typeReject) => (
    {
        type: GET_TYPE_REJECT_BY_ID_SUCCESS
        , typeReject
    }
);

export const getTypeRejectByIdError = (error) => (
    {
        type: GET_TYPE_REJECT_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de rechazo por ID *
**************************************/

export const inactiveTypeReject = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_REJECT
        , id
        , onSuccess

    }
);

export const inactiveTypeRejectSuccess = () => (
    {
        type: INACTIVE_TYPE_REJECT_SUCCESS
    }
);

export const inactiveTypeRejectError = (error) => (
    {
        type: INACTIVE_TYPE_REJECT_ERROR
        , error
    }
);

/*************************************
* Recupera el listado de los tipos *
* de rechazo activos               *
**************************************/

export const getListActiveTypeReject = (onSuccess) => (
    {
        type: GET_LIST_ACTIVE_TYPE_REJECT
        , onSuccess
    }
);

export const getListActiveTypeRejectSuccess = (listTypeReject) => (
    {
        type: GET_LIST_ACTIVE_TYPE_REJECT_SUCCESS,
        listTypeReject
    }
);

export const getListActiveTypeRejectError = (error) => (
    {
        type: GET_LIST_ACTIVE_TYPE_REJECT_ERROR
        , error
    }
);