export const FIND_TYPE_ABSENCE_LIST = 'FIND_TYPE_ABSENCE_LIST';
export const FIND_TYPE_ABSENCE_LIST_SUCCESS = 'FIND_TYPE_ABSENCE_LIST_SUCCESS';
export const FIND_TYPE_ABSENCE_LIST_ERROR = 'FIND_TYPE_ABSENCE_LIST_ERROR';

export const CONFIGURE_TYPE_ABSENCE = 'CONFIGURE_TYPE_ABSENCE';
export const CONFIGURE_TYPE_ABSENCE_SUCCESS = 'CONFIGURE_TYPE_ABSENCE_SUCCESS';
export const CONFIGURE_TYPE_ABSENCE_ERROR = 'CONFIGURE_TYPE_ABSENCE_ERROR';

export const GET_TYPE_ABSENCE_BY_ID = 'GET_TYPE_ABSENCE_BY_ID';
export const GET_TYPE_ABSENCE_BY_ID_SUCCESS = 'GET_TYPE_ABSENCE_BY_ID_SUCCESS';
export const GET_TYPE_ABSENCE_BY_ID_ERROR = 'GET_TYPE_ABSENCE_BY_ID_ERROR';

export const INACTIVE_TYPE_ABSENCE = 'INACTIVE_TYPE_ABSENCE';
export const INACTIVE_TYPE_ABSENCE_SUCCESS = 'INACTIVE_TYPE_ABSENCE_SUCCESS';
export const INACTIVE_TYPE_ABSENCE_ERROR = 'INACTIVE_TYPE_ABSENCE_ERROR';

export const GET_ACTIVE_LIST_TYPE_ABSENCE = 'GET_ACTIVE_LIST_TYPE_ABSENCE';
export const GET_ACTIVE_LIST_TYPE_ABSENCE_SUCCESS = 'GET_ACTIVE_LIST_TYPE_ABSENCE_SUCCESS';
export const GET_ACTIVE_LIST_TYPE_ABSENCE_ERROR = 'GET_ACTIVE_LIST_TYPE_ABSENCE_ERROR';

export const SET_TYPE_ABSENCE = 'SET_TYPE_ABSENCES';

/******************************
 * Filtrar  tipos de Ausencia *
 ******************************/

export const findTypeAbsence = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => (
        {
            type: FIND_TYPE_ABSENCE_LIST
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const findTypeAbsenceSuccess = (listResultSetTypeAbsence) => (
    {
        type: FIND_TYPE_ABSENCE_LIST_SUCCESS
        , listResultSetTypeAbsence
    }
);

export const findTypeAbsenceError = (error) => (
    {
        type: FIND_TYPE_ABSENCE_LIST_ERROR
        , error
    }
);

/******************************
* Manejo de tipos de Ausencia *
*******************************/

export const configureTypeAbsence = (typeAbsence, ownProps, onSuccess) => (
    {
        type: CONFIGURE_TYPE_ABSENCE
        , typeAbsence
        , ownProps
        , onSuccess

    }
);

export const configureTypeAbsenceSuccess = () => (
    {
        type: CONFIGURE_TYPE_ABSENCE_SUCCESS
    }
);

export const configureTypeAbsenceError = (error) => (
    {
        type: CONFIGURE_TYPE_ABSENCE_ERROR
        , error
    }
);

export const setTypeAbsence = (typeAbsence) => (
    {
        type: SET_TYPE_ABSENCE
        , typeAbsence
    }
);

/*********************************
* Buscar tipo de Ausencia por ID *
**********************************/

export const getTypeAbsenceById = (id) => (
    {
        type: GET_TYPE_ABSENCE_BY_ID
        , id
    }
);

export const getTypeAbsenceByIdSuccess = (typeAbsence) => (
    {
        type: GET_TYPE_ABSENCE_BY_ID_SUCCESS
        , typeAbsence
    }
);

export const getTypeAbsenceByIdError = (error) => (
    {
        type: GET_TYPE_ABSENCE_BY_ID_ERROR
        , error
    }
);

/*************************************
* Desactivar tipo de Ausencia por ID *
**************************************/

export const inactiveTypeAbsence = (id, onSuccess) => (
    {
        type: INACTIVE_TYPE_ABSENCE
        , id
        , onSuccess

    }
);

export const inactiveTypeAbsenceSuccess = () => (
    {
        type: INACTIVE_TYPE_ABSENCE_SUCCESS
    }
);

export const inactiveTypeAbsenceError = (error) => (
    {
        type: INACTIVE_TYPE_ABSENCE_ERROR
        , error
    }
);

/*************************************
* Recuperar el listado de tipos
* de ausencias activas
**************************************/

export const getActiveListTypeAbsence = (onSuccess) => (
    {
        type: GET_ACTIVE_LIST_TYPE_ABSENCE
        , onSuccess

    }
);

export const getActiveListTypeAbsenceSuccess = (listTypeAbsence) => (
    {
        type: GET_ACTIVE_LIST_TYPE_ABSENCE_SUCCESS,
        listTypeAbsence
    }
);

export const getActiveListTypeAbsenceError = (error) => (
    {
        type: GET_ACTIVE_LIST_TYPE_ABSENCE_ERROR
        , error
    }
);