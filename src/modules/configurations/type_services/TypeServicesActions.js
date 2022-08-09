export const FIND_TYPE_SERVICE_LIST = 'FIND_TYPE_SERVICE_LIST';
export const FIND_TYPE_SERVICE_LIST_SUCCESS = 'FIND_TYPE_SERVICE_LIST_SUCCESS';
export const FIND_TYPE_SERVICE_LIST_ERROR = 'FIND_TYPE_SERVICE_LIST_ERROR';

export const CONFIGURE_TYPE_SERVICE = 'CONFIGURE_TYPE_SERVICE';
export const CONFIGURE_TYPE_SERVICE_SUCCESS = 'CONFIGURE_TYPE_SERVICE_SUCCESS';
export const CONFIGURE_TYPE_SERVICE_ERROR = 'CONFIGURE_TYPE_SERVICE_ERROR';

export const GET_TYPE_SERVICE_BY_ID = 'GET_TYPE_SERVICE_BY_ID';
export const GET_TYPE_SERVICE_BY_ID_SUCCESS = 'GET_TYPE_SERVICE_BY_ID_SUCCESS';
export const GET_TYPE_SERVICE_BY_ID_ERROR = 'GET_TYPE_SERVICE_BY_ID_ERROR';

export const INACTIVE_TYPE_SERVICE = 'INACTIVE_TYPE_SERVICE';
export const INACTIVE_TYPE_SERVICE_SUCCESS = 'INACTIVE_TYPE_SERVICE_SUCCESS';
export const INACTIVE_TYPE_SERVICE_ERROR = 'INACTIVE_TYPE_SERVICE_ERROR';

export const GET_LIST_ACTIVE_TYPE_SERVICE = 'GET_LIST_ACTIVE_TYPE_SERVICE';
export const GET_LIST_ACTIVE_TYPE_SERVICE_SUCCESS = 'GET_LIST_ACTIVE_TYPE_SERVICE_SUCCESS';
export const GET_LIST_ACTIVE_TYPE_SERVICE_ERROR = 'GET_LIST_ACTIVE_TYPE_ERROR';

export const SET_TYPE_SERVICE = 'SET_TYPE_SERVICES';

/******************************
 * Filtrar  tipos de servicio *
 ******************************/

export const findTypeService = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_SERVICE_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeServiceSuccess = (listResultSetTypeService) => (
    {
        type: FIND_TYPE_SERVICE_LIST_SUCCESS
        , listResultSetTypeService
    }
);

export const findTypeServiceError = (error) => (
    {
        type: FIND_TYPE_SERVICE_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de servicio *
*******************************/

export const configureTypeService = (typeService, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_SERVICE
        , typeService
        , ownProps
        , onSuccess

    }
);

export const configureTypeServiceSuccess = () => (
    {
        type: CONFIGURE_TYPE_SERVICE_SUCCESS
    }
);

export const configureTypeServiceError = (error) => (
    {
        type: CONFIGURE_TYPE_SERVICE_ERROR
        , error
    }
);

export const setTypeService = (typeService) => (
    {
        type: SET_TYPE_SERVICE
        , typeService
    }
);

/********************************
* Buscar tipo de servcio por ID *
*********************************/

export const getTypeServiceById = (id) => (
    {
        type: GET_TYPE_SERVICE_BY_ID
        , id
    }
);

export const getTypeServiceByIdSuccess = (typeService) => (
    {
        type: GET_TYPE_SERVICE_BY_ID_SUCCESS
        , typeService
    }
);

export const getTypeServiceByIdError = (error) => (
    {
        type: GET_TYPE_SERVICE_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de servicio por ID *
**************************************/

export const inactiveTypeService = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_SERVICE
        , id
        , onSuccess

    }
);

export const inactiveTypeServiceSuccess = () => (
    {
        type: INACTIVE_TYPE_SERVICE_SUCCESS
    }
);

export const inactiveTypeServiceError = (error) => (
    {
        type: INACTIVE_TYPE_SERVICE_ERROR
        , error
    }
);

/*************************************************
* Recuperar listado de tipos de servicio activos *
*************************************************/

export const getListActiveTypeService = (onSuccess) => (
    {
        type: GET_LIST_ACTIVE_TYPE_SERVICE
        , onSuccess
    }
);

export const getListActiveTypeServiceSuccess = (listTypeService) => (
    {
        type: GET_LIST_ACTIVE_TYPE_SERVICE_SUCCESS
        , listTypeService
    }
);

export const getListActiveTypeServiceError = (error) => (
    {
        type: GET_LIST_ACTIVE_TYPE_SERVICE_ERROR
        , error
    }
);