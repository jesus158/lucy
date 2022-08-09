import {CARRIER_BREAK_SHIFT, CARRIER_BREAK_SHIFT_ERROR, CARRIER_BREAK_SHIFT_SUCCESS} from "../carriers/carrierActions";

export const GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER = "GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER";
export const GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER_SUCCESS = "GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER_SUCCESS";
export const GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTERV_ERROR = "GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTERV_ERROR";

export const CREATE_REQUEST = "CREATE_REQUEST";
export const CREATE_REQUEST_SUCCESS = "CREATE_REQUEST_SUCCESS";
export const CREATE_REQUEST_ERROR = "CREATE_REQUEST_ERROR";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_REQUEST_SUCCESS = "UPDATE_REQUEST_SUCCESS";
export const UPDATE_REQUEST_ERROR = "UPDATE_REQUEST_ERROR";

export const CARRIER_ACCEPTS_ASSIGNMENT = "CARRIER_ACCEPTS_ASSIGNMENT";
export const CARRIER_ACCEPTS_ASSIGNMENT_SUCCESS = "CARRIER_ACCEPTS_ASSIGNMENT_SUCCESS";
export const CARRIER_ACCEPTS_ASSIGNMENT_ERROR = "CARRIER_ACCEPTS_ASSIGNMENT_ERROR";

export const CARRIER_REJECTS_ASSIGNMENT = "CARRIER_REJECTS_ASSIGNMENT";
export const CARRIER_REJECTS_ASSIGNMENT_SUCCESS = "CARRIER_REJECTS_ASSIGNMENT_SUCCESS";
export const CARRIER_REJECTS_ASSIGNMENT_ERROR = "CARRIER_REJECTS_ASSIGNMENT_ERROR";

export const CANCELL_REQUEST = "CANCELL_REQUEST";
export const CANCELL_REQUEST_SUCCESS = "CANCELL_REQUEST_SUCCESS";
export const CANCELL_REQUEST_ERROR = "CANCELL_REQUEST_ERROR";

export const START_REQUEST = "START_REQUEST";
export const START_REQUEST_SUCCESS = "START_REQUEST_SUCCESS";
export const START_REQUEST_ERROR = "START_REQUEST_ERROR";

export const END_REQUEST = "END_REQUEST";
export const END_REQUEST_SUCCESS = "END_REQUEST_SUCCESS";
export const END_REQUEST_ERROR = "END_REQUEST_ERROR";

//Newness
export const CARRIER_NEWNESS_SHIFT = 'CARRIER_NEWNESS_SHIFT';
export const CARRIER_NEWNESS_SHIFT_SUCCESS = 'CARRIER_NEWNESS_SHIFT_SUCCESS';
export const CARRIER_NEWNESS_SHIFT_ERROR = 'CARRIER_NEWNESS_SHIFT_ERROR';

export const SET_REQUEST = "SET_REQUEST";
export const SET_TYPE_SERVICE = "SET_TYPE_SERVICE";
export const SET_UBICATION_BEGIN = "SET_UBICATION_BEGIN";
export const SET_UBICATION_END = "SET_UBICATION_END";
export const SET_CARRIER = "SET_CARRIER";
export const SET_MORE_INFORMATION = "SET_MORE_INFORMATION";
export const SET_TYPE_REJECT = "SET_TYPE_REJECT";
export const SET_TYPE_CANCELLATION = "SET_TYPE_CANCELLATION";

export const SET_ASSET = "SET_ASSET"

/**
 * Recupera el listado de las solicitudes no terminadas
 * y no canceladas, para el usuario actual, que en el caso
 * de un administrador recibe todas y en lo demás sólo en las
 * que se encuentra asociad, como operador o como solicitante
 * @param {*} apiPaginationAction
 * @param {*} apiPaginationCurrentPage
 * @param {*} apiPaginationDirection
 * @param {*} apiPaginationLimit
 * @param {*} apiPaginationOrderColumn
 * @param {*} apiPaginationMoveToPage
 * @param {*} apiPaginationFilter
 */
export const getRequestInProcessByUserByFilter = (
  onSuccess,
  listIdStates,
  apiPaginationAction,
  apiPaginationCurrentPage,
  apiPaginationDirection,
  apiPaginationLimit,
  apiPaginationOrderColumn,
  apiPaginationMoveToPage,
  apiPaginationFilter,
  multiAction
) => ({
  type: GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER,
  onSuccess,
  listIdStates,
  apiPaginationAction,
  apiPaginationCurrentPage,
  apiPaginationDirection,
  apiPaginationLimit,
  apiPaginationOrderColumn,
  apiPaginationMoveToPage,
  apiPaginationFilter,
  multiAction
});

export const getRequestInProcessByUserByFilterSuccess = (data,multiAction) => ({
  type: GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER_SUCCESS,
  data,
  multiAction
});

export const getRequestInProcessByUserByFilterError = error => ({
  type: GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTERV_ERROR,
  error
});
/**************************************
 * Crea una solicitud
**************************************/
export const createRequest = (
  onSuccess,
  idUbicationBegin,
  idUbicationEnd,
  idTypeService,
  idAsset,
  freeAsset,
  freeAssetTime,
  idCarrierUserSystemAccount,
  moreInformation) => ({
    type: CREATE_REQUEST,
    onSuccess,
    idUbicationBegin,
    idUbicationEnd,
    idTypeService,
    idAsset,
    freeAsset,
    freeAssetTime,
    idCarrierUserSystemAccount,
    moreInformation
  });

export const createRequestSuccess = data => ({
  type: CREATE_REQUEST_SUCCESS,
  data
});

export const createRequestError = error => ({
  type: CREATE_REQUEST_ERROR,
  error
});
/**************************************
 * Actualiza el campo more información de una solicitud
 **************************************/
export const updateRequest = (
    onSuccess,
    idUpdateRequest,
    idUbicationBegin,
    idUbicationEnd,
    idTypeService,
    idAsset,
    freeAsset,
    freeAssetTime,
    idCarrierUserSystemAccount,
    newInfo) => ({
  type: UPDATE_REQUEST,
  onSuccess,
  idUpdateRequest,
  idUbicationBegin,
  idUbicationEnd,
  idTypeService,
  idAsset,
  freeAsset,
  freeAssetTime,
  idCarrierUserSystemAccount,
  newInfo
});

export const updateRequestSuccess = data => ({
  type: UPDATE_REQUEST_SUCCESS,
  data
});

export const updateRequestError = error => ({
  type: UPDATE_REQUEST_ERROR,
  error
});
/**************************************
 * Aceptar la solicitud asignada
**************************************/
export const carrierAcceptsAssignment = (onSuccess, idRequest, idUserSystemAccount) => ({
  type: CARRIER_ACCEPTS_ASSIGNMENT,
  onSuccess,
  idRequest,
  idUserSystemAccount
});

export const carrierAcceptsAssignmentSuccess = () => ({
  type: CARRIER_ACCEPTS_ASSIGNMENT_SUCCESS
});

export const carrierAcceptsAssignmentError = error => ({
  type: CARRIER_ACCEPTS_ASSIGNMENT_ERROR,
  error
});

/**************************************
 * Rechaza la solicitud asignada
**************************************/
export const carrierRejectsAssignment = (onSuccess, idRequest, idUserSystemAccount, idTypeReject) => ({
  type: CARRIER_REJECTS_ASSIGNMENT,
  onSuccess,
  idRequest,
  idUserSystemAccount,
  idTypeReject
});

export const carrierRejectsAssignmentSuccess = () => ({
  type: CARRIER_REJECTS_ASSIGNMENT_SUCCESS
});

export const carrierRejectsAssignmentError = error => ({
  type: CARRIER_REJECTS_ASSIGNMENT_ERROR,
  error
});

/**************************************
 * Cancela la solicitud
**************************************/
export const cancelRequest = (onSuccess, idRequest, idTypeCancellation) => ({
  type: CANCELL_REQUEST,
  onSuccess,
  idRequest,
  idTypeCancellation,
});

export const cancelRequestSuccess = () => ({
  type: CANCELL_REQUEST_SUCCESS
});

export const cancelRequestError = error => ({
  type: CANCELL_REQUEST_ERROR,
  error
});

/**************************************
 * Inicia la solicitud
**************************************/
export const startRequest = (onSuccess, idRequest) => ({
  type: START_REQUEST,
  onSuccess,
  idRequest
});

export const startRequestSuccess = () => ({
  type: START_REQUEST_SUCCESS
});

export const startRequestError = error => ({
  type: START_REQUEST_ERROR,
  error
});

/**************************************
 * Termina la solicitud
**************************************/
export const endRequest = (onSuccess, idRequest) => ({
  type: END_REQUEST,
  onSuccess,
  idRequest
});

export const endRequestSuccess = () => ({
  type: END_REQUEST_SUCCESS
});

export const endRequestError = error => ({
  type: END_REQUEST_ERROR,
  error
});


/******************************
 * Registra una novedad en el turno
 ******************************/

export const carrierNewnessShift = (onSuccess, idTypeNewness, idRequest) => (
    {
      type: CARRIER_NEWNESS_SHIFT,
      onSuccess,
      idTypeNewness,
      idRequest
    }
);

export const carrierNewnessShiftSuccess = () => (
    {
      type: CARRIER_NEWNESS_SHIFT_SUCCESS
    }
);

export const carrierNewnessShiftError = (error) => (
    {
      type: CARRIER_NEWNESS_SHIFT_ERROR
      , error
    }
);



/**************************************
 * valor local para el tipo de solicitud
 ***************************************/
export const setRequest = request => ({
  type: SET_REQUEST,
  request
});

export const setTypeService = typeService => ({
  type: SET_TYPE_SERVICE,
  typeService
});

export const setAsset = asset => ({
  type: SET_ASSET,
  asset
})

export const setUbicationBegin = ubicationBegin => ({
  type: SET_UBICATION_BEGIN,
  ubicationBegin
});

export const setUbicationEnd = ubicationEnd => ({
  type: SET_UBICATION_END,
  ubicationEnd
});

export const setCarrier = carrier => ({
  type: SET_CARRIER,
  carrier
});

export const setMoreInformation = moreInformation => ({
  type: SET_MORE_INFORMATION,
  moreInformation
});

export const setTypeReject = (typeReject, onSuccess) => ({
  type: SET_TYPE_REJECT,
  typeReject,
  onSuccess,
});

export const setTypeCancellation = typeCancellation => ({
  type: SET_TYPE_CANCELLATION,
  typeCancellation
});
