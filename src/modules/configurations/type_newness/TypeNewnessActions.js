export const FIND_TYPE_NEWNESS_LIST = 'FIND_TYPE_NEWNESS_LIST';
export const FIND_TYPE_NEWNESS_LIST_SUCCESS = 'FIND_TYPE_NEWNESS_LIST_SUCCESS';
export const FIND_TYPE_NEWNESS_LIST_ERROR = 'FIND_TYPE_NEWNESS_LIST_ERROR';

export const CONFIGURE_TYPE_NEWNESS = 'CONFIGURE_TYPE_NEWNESS';
export const CONFIGURE_TYPE_NEWNESS_SUCCESS = 'CONFIGURE_TYPE_NEWNESS_SUCCESS';
export const CONFIGURE_TYPE_NEWNESS_ERROR = 'CONFIGURE_TYPE_NEWNESS_ERROR';

export const GET_TYPE_NEWNESS_BY_ID = 'GET_TYPE_NEWNESS_BY_ID';
export const GET_TYPE_NEWNESS_BY_ID_SUCCESS = 'GET_TYPE_NEWNESS_BY_ID_SUCCESS';
export const GET_TYPE_NEWNESS_BY_ID_ERROR = 'GET_TYPE_NEWNESS_BY_ID_ERROR';

export const INACTIVE_TYPE_NEWNESS = 'INACTIVE_TYPE_NEWNESS';
export const INACTIVE_TYPE_NEWNESS_SUCCESS = 'INACTIVE_TYPE_NEWNESS_SUCCESS';
export const INACTIVE_TYPE_NEWNESS_ERROR = 'INACTIVE_TYPE_NEWNESS_ERROR';

export const GET_ACTIVE_LIST_TYPE_NEWNESS = 'GET_ACTIVE_LIST_TYPE_NEWNESS';
export const GET_ACTIVE_LIST_TYPE_NEWNESS_SUCCESS = 'GET_ACTIVE_LIST_TYPE_NEWNESS_SUCCESS';
export const GET_ACTIVE_LIST_TYPE_NEWNESS_ERROR = 'GET_ACTIVE_LIST_TYPE_NEWNESS_ERROR';

//getListRequestTypeNewness Trae la lista de novedades asociadas a la solicitud
export const GET_LIST_REQUEST_TYPE_NEWNESS = 'GET_LIST_REQUEST_TYPE_NEWNESS';
export const GET_LIST_REQUEST_TYPE_NEWNESS_SUCCESS = 'GET_LIST_REQUEST_TYPE_NEWNESS_SUCCESS';
export const GET_LIST_REQUEST_TYPE_NEWNESS_ERROR = 'GET_LIST_REQUEST_TYPE_NEWNESS_ERROR';




export const SET_TYPE_NEWNESS = 'SET_TYPE_NEWNESS';

/******************************
 * Filtrar  tipos de Novedad *
 ******************************/

export const findTypeNewness = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_NEWNESS_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeNewnessSuccess = (listResultSetTypeNewness) => (
    {
        type: FIND_TYPE_NEWNESS_LIST_SUCCESS
        , listResultSetTypeNewness
    }
);

export const findTypeNewnessError = (error) => (
    {
        type: FIND_TYPE_NEWNESS_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de Novedad *
*******************************/

export const configureTypeNewness = (typeNewness, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_NEWNESS
        , typeNewness
        , ownProps
        , onSuccess

    }
);

export const configureTypeNewnessSuccess = () => (
    {
        type: CONFIGURE_TYPE_NEWNESS_SUCCESS
    }
);

export const configureTypeNewnessError = (error) => (
    {
        type: CONFIGURE_TYPE_NEWNESS_ERROR
        , error
    }
);

export const setTypeNewness = (typeNewness) => (
    {
        type: SET_TYPE_NEWNESS
        , typeNewness
    }
);

/*********************************
* Buscar tipo de Novedad por ID *
**********************************/

export const getTypeNewnessById = (id) => (
    {
        type: GET_TYPE_NEWNESS_BY_ID
        , id
    }
);

export const getTypeNewnessByIdSuccess = (typeNewness) => (
    {
        type: GET_TYPE_NEWNESS_BY_ID_SUCCESS
        , typeNewness
    }
);

export const getTypeNewnessByIdError = (error) => (
    {
        type: GET_TYPE_NEWNESS_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de Novedad por ID *
**************************************/

export const inactiveTypeNewness = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_NEWNESS
        , id
        , onSuccess

    }
);

export const inactiveTypeNewnessSuccess = () => (
    {
        type: INACTIVE_TYPE_NEWNESS_SUCCESS
    }
);

export const inactiveTypeNewnessError = (error) => (
    {
        type: INACTIVE_TYPE_NEWNESS_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de Novedad por ID *
**************************************/

export const getActiveListTypeNewness = (onSuccess) => (
    {
        type: GET_ACTIVE_LIST_TYPE_NEWNESS
        , onSuccess

    }
);

export const getActiveListTypeNewnessSuccess = (listTypeNewness) => (
    {
        type: GET_ACTIVE_LIST_TYPE_NEWNESS_SUCCESS
        , listTypeNewness
    }
);

export const getActiveListTypeNewnessError = (error) => (
    {
        type: GET_ACTIVE_LIST_TYPE_NEWNESS_ERROR
        , error
    }
);


/*************************************
 *  tipo de Novedad por ID *
 **************************************/

export const getListRequestTypeNewness = (onSuccess , idRequest) => (
    {
        type: GET_LIST_REQUEST_TYPE_NEWNESS
        , onSuccess
        , idRequest

    }
);

export const getListRequestTypeNewnessSuccess = (listTypeNewness) => (
    {
        type: GET_LIST_REQUEST_TYPE_NEWNESS_SUCCESS
        , listTypeNewness
    }
);

export const getListRequestTypeNewnessError = (error) => (
    {
        type: GET_LIST_REQUEST_TYPE_NEWNESS_ERROR
        , error
    }
);