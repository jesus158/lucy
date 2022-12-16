export const FIND_ALERT_LIST = 'FIND_ALERT_LIST';
export const FIND_ALERT_LIST_SUCCESS = 'FIND_ALERT_LIST_SUCCESS';
export const FIND_ALERT_LIST_ERROR = 'FIND_ALERT_LIST_ERROR';

export const GET_AVAILABLE_ASSETS = 'GET_AVAILABLE_ASSETS';
export const GET_AVAILABLE_ASSETS_SUCCESS = 'GET_AVAILABLE_ASSETS_SUCCESS';
export const GET_AVAILABLE_ASSETS_ERROR = 'GET_AVAILABLE_ASSETS_ERROR';

export const CONFIGURE_ALERT = 'CONFIGURE_ALERT';
export const CONFIGURE_ALERT_SUCCESS = 'CONFIGURE_ALERT_SUCCESS';
export const CONFIGURE_ALERT_ERROR = 'CONFIGURE_ALERT_ERROR';

export const GET_ALERT_BY_ID = 'GET_ALERT_BY_ID';
export const GET_ALERT_BY_ID_SUCCESS = 'GET_ALERT_BY_ID_SUCCESS';
export const GET_ALERT_BY_ID_ERROR = 'GET_ALERT_BY_ID_ERROR';

export const INACTIVE_ALERT = 'INACTIVE_ALERT';
export const INACTIVE_ALERT_SUCCESS = 'INACTIVE_ALERT_SUCCESS';
export const INACTIVE_ALERT_ERROR = 'INACTIVE_ALERT_ERROR';

export const SET_ALERT = 'SET_ALERT';

/******************************
 * Filtrar  tipos de servicio *
 ******************************/

export const findAlert = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_ALERT_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findAlertSuccess = (listResultSetAlert) => (
    {
        type: FIND_ALERT_LIST_SUCCESS
        , listResultSetAlert
    }
);

export const findAlertError = (error) => (
    {
        type: FIND_ALERT_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de servicio *
*******************************/

export const configureAlert = (Alert, onSuccess) => (
    {
        type: CONFIGURE_ALERT
        , Alert
        , onSuccess

    }
);

export const configureAlertSuccess = () => (
    {
        type: CONFIGURE_ALERT_SUCCESS
    }
);

export const configureAlertError = (error) => (
    {
        type: CONFIGURE_ALERT_ERROR
        , error
    }
);

export const setAlert = (alert) => (
    {
        type: SET_ALERT
        , alert
    }
);


/********************************
* Buscar activos disponiobles por antena para la configuracion de alertas
*********************************/

export const getAvailableAssets = (idUbication) => (
    {
        type: GET_AVAILABLE_ASSETS
        , idUbication
    }
);




export const getAvailableAssetsSuccess = (listResultSetAsset) => (
    {
        type: GET_AVAILABLE_ASSETS_SUCCESS
        , listResultSetAsset
    }
);




export const getAvailableAssetsError = (error) => (
    {
        type: GET_AVAILABLE_ASSETS_ERROR
        , error
    }
);


/********************************
* Buscar tipo de servcio por ID *
*********************************/

export const getAlertById = (id) => (
    {
        type: GET_ALERT_BY_ID
        , id
    }
);

export const getAlertByIdSuccess = (alert) => (
    {
        type: GET_ALERT_BY_ID_SUCCESS
        , alert
    }
);

export const getAlertByIdError = (error) => (
    {
        type: GET_ALERT_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de servicio por ID *
**************************************/

export const inactiveAlert = (id, onSuccess) => (
    {
        type: INACTIVE_ALERT
        , id
        , onSuccess

    }
);

export const inactiveAlertSuccess = () => (
    {
        type: INACTIVE_ALERT_SUCCESS
    }
);

export const inactiveAlertError = (error) => (
    {
        type: INACTIVE_ALERT_ERROR
        , error
    }
);