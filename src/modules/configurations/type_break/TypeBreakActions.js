export const FIND_TYPE_BREAK_LIST = 'FIND_TYPE_BREAK_LIST';
export const FIND_TYPE_BREAK_LIST_SUCCESS = 'FIND_TYPE_BREAK_LIST_SUCCESS';
export const FIND_TYPE_BREAK_LIST_ERROR = 'FIND_TYPE_BREAK_LIST_ERROR';

export const CONFIGURE_TYPE_BREAK = 'CONFIGURE_TYPE_BREAK';
export const CONFIGURE_TYPE_BREAK_SUCCESS = 'CONFIGURE_TYPE_BREAK_SUCCESS';
export const CONFIGURE_TYPE_BREAK_ERROR = 'CONFIGURE_TYPE_BREAK_ERROR';

export const GET_TYPE_BREAK_BY_ID = 'GET_TYPE_BREAK_BY_ID';
export const GET_TYPE_BREAK_BY_ID_SUCCESS = 'GET_TYPE_BREAK_BY_ID_SUCCESS';
export const GET_TYPE_BREAK_BY_ID_ERROR = 'GET_TYPE_BREAK_BY_ID_ERROR';

export const INACTIVE_TYPE_BREAK = 'INACTIVE_TYPE_BREAK';
export const INACTIVE_TYPE_BREAK_SUCCESS = 'INACTIVE_TYPE_BREAK_SUCCESS';
export const INACTIVE_TYPE_BREAK_ERROR = 'INACTIVE_TYPE_BREAK_ERROR';

export const GET_ACTIVE_LIST_TYPE_BREAK = 'GET_ACTIVE_LIST_TYPE_BREAK';
export const GET_ACTIVE_LIST_TYPE_BREAK_SUCCESS = 'GET_ACTIVE_LIST_TYPE_BREAK_SUCCESS';
export const GET_ACTIVE_LIST_TYPE_BREAK_ERROR = 'GET_ACTIVE_LIST_TYPE_BREAK_ERROR';

export const SET_TYPE_BREAK = 'SET_TYPE_BREAKS';

/******************************
 * Filtrar  tipos de Descanso *
 ******************************/

export const findTypeBreak = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_BREAK_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeBreakSuccess = (listResultSetTypeBreak) => (
    {
        type: FIND_TYPE_BREAK_LIST_SUCCESS
        , listResultSetTypeBreak
    }
);

export const findTypeBreakError = (error) => (
    {
        type: FIND_TYPE_BREAK_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de Descanso *
*******************************/

export const configureTypeBreak = (typeBreak, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_BREAK
        , typeBreak
        , ownProps
        , onSuccess

    }
);

export const configureTypeBreakSuccess = () => (
    {
        type: CONFIGURE_TYPE_BREAK_SUCCESS
    }
);

export const configureTypeBreakError = (error) => (
    {
        type: CONFIGURE_TYPE_BREAK_ERROR
        , error
    }
);

export const setTypeBreak = (typeBreak) => (
    {
        type: SET_TYPE_BREAK
        , typeBreak
    }
);

/*********************************
* Buscar tipo de Descanso por ID *
**********************************/

export const getTypeBreakById = (id) => (
    {
        type: GET_TYPE_BREAK_BY_ID
        , id
    }
);

export const getTypeBreakByIdSuccess = (typeBreak) => (
    {
        type: GET_TYPE_BREAK_BY_ID_SUCCESS
        , typeBreak
    }
);

export const getTypeBreakByIdError = (error) => (
    {
        type: GET_TYPE_BREAK_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de Descanso por ID *
**************************************/

export const inactiveTypeBreak = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_BREAK
        , id
        , onSuccess

    }
);

export const inactiveTypeBreakSuccess = () => (
    {
        type: INACTIVE_TYPE_BREAK_SUCCESS
    }
);

export const inactiveTypeBreakError = (error) => (
    {
        type: INACTIVE_TYPE_BREAK_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de Descanso por ID *
**************************************/

export const getActiveListTypeBreak = (onSuccess) => (
    {
        type: GET_ACTIVE_LIST_TYPE_BREAK
        , onSuccess

    }
);

export const getActiveListTypeBreakSuccess = (listTypeBreak) => (
    {
        type: GET_ACTIVE_LIST_TYPE_BREAK_SUCCESS
        , listTypeBreak
    }
);

export const getActiveListTypeBreakError = (error) => (
    {
        type: GET_ACTIVE_LIST_TYPE_BREAK_ERROR
        , error
    }
);