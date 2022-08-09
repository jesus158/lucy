export const GET_IN_SHIFT_BY_FILTER = 'GET_IN_SHIFT_BY_FILTER';
export const GET_IN_SHIFT_BY_FILTER_SUCCESS = 'GET_IN_SHIFT_BY_FILTER_SUCCESS';
export const GET_IN_SHIFT_BY_FILTER_ERROR = 'GET_IN_SHIFT_BY_FILTER_ERROR';

export const GET_CARRIER_BY_ID = 'GET_CARRIER_BY_ID';
export const GET_CARRIER_BY_ID_SUCCESS = 'GET_CARRIER_BY_ID_SUCCESS';
export const GET_CARRIER_BY_ID_ERROR = 'GET_CARRIER_BY_ID_ERROR';

export const CARRIER_END_SHIFT = 'CARRIER_END_SHIFT';
export const CARRIER_END_SHIFT_SUCCESS = 'CARRIER_END_SHIFT_SUCCESS';
export const CARRIER_END_SHIFT_ERROR = 'CARRIER_END_SHIFT_ERROR';

export const CARRIER_START_SHIFT = 'CARRIER_START_SHIFT';
export const CARRIER_START_SHIFT_SUCCESS = 'CARRIER_START_SHIFT_SUCCESS';
export const CARRIER_START_SHIFT_ERROR = 'CARRIER_START_SHIFT_ERROR';

export const CARRIER_BREAK_SHIFT = 'CARRIER_BREAK_SHIFT';
export const CARRIER_BREAK_SHIFT_SUCCESS = 'CARRIER_BREAK_SHIFT_SUCCESS';
export const CARRIER_BREAK_SHIFT_ERROR = 'CARRIER_BREAK_SHIFT_ERROR';

export const END_CARRIER_BREAK_SHIFT = 'END_CARRIER_BREAK_SHIFT';
export const END_CARRIER_BREAK_SHIFT_SUCCESS = 'END_CARRIER_BREAK_SHIFT_SUCCESS';
export const END_CARRIER_BREAK_SHIFT_ERROR = 'END_CARRIER_BREAK_SHIFT_ERROR';

export const END_CARRIER_ABSENCE_SHIFT = 'END_CARRIER_ABSENCE_SHIFT';
export const END_CARRIER_ABSENCE_SHIFT_SUCCESS = 'END_CARRIER_ABSENCE_SHIFT_SUCCESS';
export const END_CARRIER_ABSENCE_SHIFT_ERROR = 'END_CARRIER_ABSENCE_SHIFT_ERROR';

export const CARRIER_ABSENCE_SHIFT = 'CARRIER_ABSENCE_SHIFT';
export const CARRIER_ABSENCE_SHIFT_SUCCESS = 'CARRIER_ABSENCE_SHIFT_SUCCESS';
export const CARRIER_ABSENCE_SHIFT_ERROR = 'CARRIER_ABSENCE_SHIFT_ERROR';

export const GET_CARRIER_LIST = 'GET_CARRIER_LIST';
export const GET_CARRIER_LIST_SUCCESS = 'GET_CARRIER_LIST_SUCCESS';
export const GET_CARRIER_LIST_ERROR = 'GET_CARRIER_LIST_ERROR';

/******************************
 * Listado de transportistas
 * en turno y disponibles *
 ******************************/

export const getInShiftByFilter = (
    apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter
    ) => (
        {
            type: GET_IN_SHIFT_BY_FILTER
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter
        }
    );

export const getInShiftByFilterSuccess = (listCarrierLocation,apiPagination) => (
    {
        type: GET_IN_SHIFT_BY_FILTER_SUCCESS
        , listCarrierLocation
        , apiPagination
    }
);

export const getInShiftByFilterError = (error) => (
    {
        type: GET_IN_SHIFT_BY_FILTER_ERROR
        , error
    }
);

/******************************
 * Estado actual del operador
 * solicitado
 ******************************/

export const getCarrierById = (onSuccess) => (
    {
        type: GET_CARRIER_BY_ID,
        onSuccess
    }
);

export const getCarrierByIdSuccess = (carrierLocation) => (
    {
        type: GET_CARRIER_BY_ID_SUCCESS
        , carrierLocation
    }
);

export const getCarrierByIdError = (error) => (
    {
        type: GET_CARRIER_BY_ID_ERROR
        , error
    }
);

/******************************
 * Termina el turno
 ******************************/

export const carrierEndShift = (onSuccess) => (
    {
        type: CARRIER_END_SHIFT,
        onSuccess
    }
);

export const carrierEndShiftSuccess = () => (
    {
        type: CARRIER_END_SHIFT_SUCCESS
    }
);

export const carrierEndShiftError = (error) => (
    {
        type: CARRIER_END_SHIFT_ERROR
        , error
    }
);


/******************************
 * Termina el turno
 ******************************/

export const carrierStartShift = (onSuccess) => (
    {
        type: CARRIER_START_SHIFT,
        onSuccess
    }
);

export const carrierStartShiftSuccess = () => (
    {
        type: CARRIER_START_SHIFT_SUCCESS
    }
);

export const carrierStartShiftError = (error) => (
    {
        type: CARRIER_START_SHIFT_ERROR
        , error
    }
);

/******************************
 * Toma un receso del turno
 ******************************/

export const carrierBreakShift = (onSuccess, idTypeBreak, minutesBreak) => (
    {
        type: CARRIER_BREAK_SHIFT,
        onSuccess,
        idTypeBreak,
        minutesBreak
    }
);

export const carrierBreakShiftSuccess = () => (
    {
        type: CARRIER_BREAK_SHIFT_SUCCESS
    }
);

export const carrierBreakShiftError = (error) => (
    {
        type: CARRIER_BREAK_SHIFT_ERROR
        , error
    }
);
/******************************
 * Termina la usencia
 ******************************/

 export const endCarrierAbsenceShift = (onSuccess) => (
    {
        type: END_CARRIER_ABSENCE_SHIFT,
        onSuccess
    }
);

export const endCarrierAbsenceShiftSuccess = () => (
    {
        type: END_CARRIER_ABSENCE_SHIFT_SUCCESS
    }
);

export const endCarrierAbsenceShiftError = (error) => (
    {
        type: END_CARRIER_ABSENCE_SHIFT_ERROR
        , error
    }
);
/******************************
 * Termina el receso
 ******************************/

 export const endCarrierBreakShift = (onSuccess) => (
    {
        type: END_CARRIER_BREAK_SHIFT,
        onSuccess
    }
);

export const endCarrierBreakShiftSuccess = () => (
    {
        type: END_CARRIER_BREAK_SHIFT_SUCCESS
    }
);

export const endCarrierBreakShiftError = (error) => (
    {
        type: END_CARRIER_BREAK_SHIFT_ERROR
        , error
    }
);
/*******************************************
 * Gestiona la ausencia del turno
 ******************************************/

export const carrierAbsenceShift = (onSuccess, idTypeAbsence, minutesAbsence) => (
    {
        type: CARRIER_ABSENCE_SHIFT,
        onSuccess,
        idTypeAbsence,
        minutesAbsence,
    }
);

export const carrierAbsenceShiftSuccess = () => (
    {
        type: CARRIER_ABSENCE_SHIFT_SUCCESS
    }
);

export const carrierAbsenceShiftError = (error) => (
    {
        type: CARRIER_ABSENCE_SHIFT_ERROR
        , error
    }
);

/******************************
 * Listado de transportistas
 ******************************/

export const getCarrierList = (onSuccess) => (
        {
            type: GET_CARRIER_LIST
            , onSuccess
        }
    );

export const getCarrierListSuccess = (listCarrier) => (
    {
        type: GET_CARRIER_LIST_SUCCESS
        , listCarrier
    }
);

export const getCarrierListError = (error) => (
    {
        type: GET_CARRIER_LIST_ERROR
        , error
    }
);
