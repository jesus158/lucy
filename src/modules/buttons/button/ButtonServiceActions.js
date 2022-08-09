export const FIND_CALL_BUTTON_LIST = 'FIND_CALL_BUTTON_LIST';
export const FIND_CALL_BUTTON_LIST_SUCCESS = 'FIND_CALL_BUTTON_LIST_SUCCESS';
export const FIND_CALL_BUTTON_LIST_ERROR = 'FIND_CALL_BUTTON_LIST_ERROR';

export const CONFIGURE_CALL_BUTTON = 'CONFIGURE_CALL_BUTTON';
export const CONFIGURE_CALL_BUTTON_SUCCESS = 'CONFIGURE_CALL_BUTTON_SUCCESS';
export const CONFIGURE_CALL_BUTTON_ERROR = 'CONFIGURE_CALL_BUTTON_ERROR';

export const GET_CALL_BUTTON_BY_ID = 'GET_CALL_BUTTON_BY_ID';
export const GET_CALL_BUTTON_BY_ID_SUCCESS = 'GET_CALL_BUTTON_BY_ID_SUCCESS';
export const GET_CALL_BUTTON_BY_ID_ERROR = 'GET_CALL_BUTTON_BY_ID_ERROR';

export const INACTIVE_CALL_BUTTON = 'INACTIVE_CALL_BUTTON';
export const INACTIVE_CALL_BUTTON_SUCCESS = 'INACTIVE_CALL_BUTTON_SUCCESS';
export const INACTIVE_CALL_BUTTON_ERROR = 'INACTIVE_CALL_BUTTON_ERROR';

export const SET_CALL_BUTTON = 'SET_CALL_BUTTON';

/******************************
 * Filtrar  tipos de servicio *
 ******************************/

export const findCallButton = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_CALL_BUTTON_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findCallButtonSuccess = (listResultSetCallButton) => (
    {
        type: FIND_CALL_BUTTON_LIST_SUCCESS
        , listResultSetCallButton
    }
);

export const findCallButtonError = (error) => (
    {
        type: FIND_CALL_BUTTON_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de servicio *
*******************************/

export const configureCallButton = (CallButton, onSuccess) => (
    {
        type: CONFIGURE_CALL_BUTTON
        , CallButton
        , onSuccess

    }
);

export const configureCallButtonSuccess = () => (
    {
        type: CONFIGURE_CALL_BUTTON_SUCCESS
    }
);

export const configureCallButtonError = (error) => (
    {
        type: CONFIGURE_CALL_BUTTON_ERROR
        , error
    }
);

export const setCallButton = (callButton) => (
    {
        type: SET_CALL_BUTTON
        , callButton
    }
);

/********************************
* Buscar tipo de servcio por ID *
*********************************/

export const getCallButtonById = (id) => (
    {
        type: GET_CALL_BUTTON_BY_ID
        , id
    }
);

export const getCallButtonByIdSuccess = (callButton) => (
    {
        type: GET_CALL_BUTTON_BY_ID_SUCCESS
        , callButton
    }
);

export const getCallButtonByIdError = (error) => (
    {
        type: GET_CALL_BUTTON_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de servicio por ID *
**************************************/

export const inactiveCallButton = (id, onSuccess) => (
    {
        type: INACTIVE_CALL_BUTTON
        , id
        , onSuccess

    }
);

export const inactiveCallButtonSuccess = () => (
    {
        type: INACTIVE_CALL_BUTTON_SUCCESS
    }
);

export const inactiveCallButtonError = (error) => (
    {
        type: INACTIVE_CALL_BUTTON_ERROR
        , error
    }
);