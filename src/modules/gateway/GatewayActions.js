export const FIND_GATEWAY_LIST = 'FIND_GATEWAY_LIST';
export const FIND_GATEWAY_LIST_SUCCESS = 'FIND_GATEWAY_LIST_SUCCESS';
export const FIND_GATEWAY_LIST_ERROR = 'FIND_GATEWAY_LIST_ERROR';

export const CONFIGURE_GATEWAY = 'CONFIGURE_GATEWAY';
export const CONFIGURE_GATEWAY_SUCCESS = 'CONFIGURE_GATEWAY_SUCCESS';
export const CONFIGURE_GATEWAY_ERROR = 'CONFIGURE_GATEWAY_ERROR';

export const GET_GATEWAY_BY_ID = 'GET_GATEWAY_BY_ID';
export const GET_GATEWAY_BY_ID_SUCCESS = 'GET_GATEWAY_BY_ID_SUCCESS';
export const GET_GATEWAY_BY_ID_ERROR = 'GET_GATEWAY_BY_ID_ERROR';

export const INACTIVE_GATEWAY = 'INACTIVE_GATEWAY';
export const INACTIVE_GATEWAY_SUCCESS = 'INACTIVE_GATEWAY_SUCCESS';
export const INACTIVE_GATEWAY_ERROR = 'INACTIVE_GATEWAY_ERROR';

export const SET_GATEWAY = 'SET_GATEWAYS';

/******************************
 * Filtrar  tipos de servicio *
 ******************************/

export const findGateway = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_GATEWAY_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findGatewaySuccess = (listResultSetGateway) => (
    {
        type: FIND_GATEWAY_LIST_SUCCESS
        , listResultSetGateway
    }
);

export const findGatewayError = (error) => (
    {
        type: FIND_GATEWAY_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de servicio *
*******************************/

export const configureGateway = (typeService, ownProps, onSuccess) => (
    {
        type: CONFIGURE_GATEWAY
        , typeService
        , ownProps
        , onSuccess

    }
);

export const configureGatewaySuccess = () => (
    {
        type: CONFIGURE_GATEWAY_SUCCESS
    }
);

export const configureGatewayError = (error) => (
    {
        type: CONFIGURE_GATEWAY_ERROR
        , error
    }
);

export const setGateway = (typeService) => (
    {
        type: SET_GATEWAY
        , typeService
    }
);

/********************************
* Buscar tipo de servcio por ID *
*********************************/

export const getGatewayById = (id) => (
    {
        type: GET_GATEWAY_BY_ID
        , id
    }
);

export const getGatewayByIdSuccess = (typeService) => (
    {
        type: GET_GATEWAY_BY_ID_SUCCESS
        , typeService
    }
);

export const getGatewayByIdError = (error) => (
    {
        type: GET_GATEWAY_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de servicio por ID *
**************************************/

export const inactiveGateway = (id, onSuccess) => (
    {
        type: INACTIVE_GATEWAY
        , id
        , onSuccess

    }
);

export const inactiveGatewaySuccess = () => (
    {
        type: INACTIVE_GATEWAY_SUCCESS
    }
);

export const inactiveGatewayError = (error) => (
    {
        type: INACTIVE_GATEWAY_ERROR
        , error
    }
);