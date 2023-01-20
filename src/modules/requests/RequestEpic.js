import axios from "axios";
import { addMessage } from "layouts/MessagesActions";
import { 
  CANCELL_REQUEST, 
  cancelRequestError, 
  cancelRequestSuccess, 
  carrierAcceptsAssignmentError, 
  carrierAcceptsAssignmentSuccess,
  carrierRejectsAssignmentError, 
  carrierRejectsAssignmentSuccess, 
  CARRIER_ACCEPTS_ASSIGNMENT, 
  CARRIER_REJECTS_ASSIGNMENT, 
  createRequestError,
  createRequestSuccess, 
  CREATE_REQUEST, 
  endRequestError, 
  endRequestSuccess, 
  END_REQUEST, 
  getRequestInProcessByUserByFilterError,
  getRequestInProcessByUserByFilterSuccess, 
  GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER, 
  startRequestError,
  startRequestSuccess, 
  START_REQUEST, 
  UPDATE_REQUEST
} from "modules/requests/RequestActions.js";

import RequestApiClient from "modules/requests/RequestApiClient";
import { apiTimeout } from "modules/utils/ApiUtil";
import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";


export const getRequestInProcessByUserByFilter = (action$, state$) =>
  action$.pipe(
    ofType(GET_REQUEST_IN_PROCESS_BY_USER_BY_FILTER),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout * 5;
        axios(
          RequestApiClient.getRequestInProcessByUserByFilter(
            action.onSuccess,
            action.listIdStates,
            action.apiPaginationAction,
            action.apiPaginationCurrentPage,
            action.apiPaginationDirection,
            action.apiPaginationLimit,
            action.apiPaginationOrderColumn,
            action.apiPaginationMoveToPage,
            action.apiPaginationFilter
          )
        )
          .then(response => {
            let code = response.data.apiResponse.code;
            if (
              response.status >= 200 &&
              response.status < 300 &&
              code === 200
            ) {
              let data = response.data;
              //creado para tener la respuesta en partes diferentes del estado, dado que se puede borrar el contenido
              //entre el llamado a la función desde la misma venta, el caso del dashborad necesita esta consulta
              //para dos casos diferentes
              var multiAction = 'default';
              if (action.multiAction !== undefined) {
                multiAction = action.multiAction;
              }
              obs.next(getRequestInProcessByUserByFilterSuccess(data, multiAction));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(getRequestInProcessByUserByFilterError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            } else {
              obs.next(getRequestInProcessByUserByFilterError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            }
          })
          .catch(error => {
            obs.next(getRequestInProcessByUserByFilterError(error));
            //obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
            action.onSuccess("ERROR");
          });
      }).pipe(
        catchError(error =>
          of(
            getRequestInProcessByUserByFilterError("Error"),
            //addMessage({ variant: "error", message: "Error" }),
            action.onSuccess("ERROR")
          )
        )
      )
    )
  );

/**
 *
 * @param {*} action$
 * @param {*} state$
 */
export const createRequest = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_REQUEST),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.createRequest(action.onSucess, action.idUbicationBegin, action.idUbicationEnd, action.idTypeService, action.idAsset, action.freeAsset, action.freeAssetTime, action.idCarrierUserSystemAccount, action.moreInformation, action.nameReceived))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              console.log("Request OK1");
              let data = response.data;
              obs.next(createRequestSuccess(data));
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
              console.log("Request OK2");
            } else if (response.status === 401) {
              obs.next(
                createRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              console.log("Request Error 1");
              action.onSuccess("error");
            } else {
              obs.next(
                createRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              console.log("Request Error 2");
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(createRequestError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
            console.log("Request Error 3");
          });
      }).pipe(
        catchError(error =>
          of(
            createRequestError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );


/**
 *
 * @param {*} action$
 * @param {*} state$
 */
export const updateRequest = (action$, state$) =>
    action$.pipe(
        ofType(UPDATE_REQUEST),
        mergeMap(action =>
            Observable.create(obs => {
                axios.defaults.timeout = apiTimeout;
                axios(RequestApiClient.updateRequest(action.idUpdateRequest, action.idUbicationBegin, action.idUbicationEnd, action.idTypeService, action.idAsset, action.freeAsset, action.freeAssetTime, action.idCarrierUserSystemAccount, action.newInfo, action.nameReceived))
                    .then(response => {
                        let code = response.data.apiResponse.code;
                        if (response.status >= 200 && response.status < 300 && code === 200) {
                            let data = response.data;
                            obs.next(createRequestSuccess(data));
                            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                            obs.complete();
                            action.onSuccess("OK");
                        } else if (response.status === 401) {
                            obs.next(
                                createRequestError(
                                    response.data.apiResponse.message
                                )
                            );
                            obs.next(
                                addMessage({
                                    variant: "error",
                                    message: response.data.apiResponse.message
                                })
                            );
                            obs.complete();
                            action.onSuccess("error");
                        } else {
                            obs.next(
                                createRequestError(
                                    response.data.apiResponse.message
                                )
                            );
                            obs.next(
                                addMessage({
                                    variant: "error",
                                    message: response.data.apiResponse.message
                                })
                            );
                            obs.complete();
                        }
                    })
                    .catch(error => {
                        obs.next(createRequestError(error));
                        obs.next(addMessage({ variant: "error", message: error.message }));
                        obs.complete();
                    });
            }).pipe(
                catchError(error =>
                    of(
                        createRequestError("Error"),
                        addMessage({ variant: "error", message: "Error" })
                    )
                )
            )
        )
    );


export const carrierAcceptsAssignment = (action$, state$) =>
  action$.pipe(
    ofType(CARRIER_ACCEPTS_ASSIGNMENT),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.carrierAcceptsAssignment(action.onSuccess, action.idRequest, action.idUserSystemAccount))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              obs.next(carrierAcceptsAssignmentSuccess());
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(
                carrierAcceptsAssignmentError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              action.onSuccess("error");
            } else {
              obs.next(
                carrierAcceptsAssignmentError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(carrierAcceptsAssignmentError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
          });
      }).pipe(
        catchError(error =>
          of(
            carrierAcceptsAssignmentError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );

/**
 * Ejecuta las acciones sobre el backend
 * solicitando el rechazo de una asignación
 * de servicio sobre el operador
 * @param {*} action$
 * @param {*} state$
 */
export const carrierRejectsAssignment = (action$, state$) =>
  action$.pipe(
    ofType(CARRIER_REJECTS_ASSIGNMENT),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.carrierRejectsAssignment(action.onSuccess, action.idRequest, action.idUserSystemAccount, action.idTypeReject))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              obs.next(carrierRejectsAssignmentSuccess());
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(
                carrierRejectsAssignmentError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              action.onSuccess("error");
            } else {
              obs.next(
                carrierRejectsAssignmentError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(carrierRejectsAssignmentError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
          });
      }).pipe(
        catchError(error =>
          of(
            carrierRejectsAssignmentError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );

/**
 * Aplica la solicitud de cancelar una solicitud,
 * dando el número del requerimiento,
 * el usurio que realiza la operación,
 * el motivo de la cancelación
 * @param {*} action$
 * @param {*} state$
 */
export const cancelRequest = (action$, state$) =>
  action$.pipe(
    ofType(CANCELL_REQUEST),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.cancelRequest(action.onSuccess, action.idRequest, action.idTypeCancellation))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              obs.next(cancelRequestSuccess());
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(
                cancelRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              action.onSuccess("error");
            } else {
              obs.next(
                cancelRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(cancelRequestError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
          });
      }).pipe(
        catchError(error =>
          of(
            cancelRequestError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );

/**
 * Inicia una solicitud
 * @param {*} action$
 * @param {*} state$
 */
export const startRequest = (action$, state$) =>
  action$.pipe(
    ofType(START_REQUEST),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.startRequest(action.onSuccess, action.idRequest))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              obs.next(startRequestSuccess());
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(
                startRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              action.onSuccess("error");
            } else {
              obs.next(
                startRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(startRequestError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
          });
      }).pipe(
        catchError(error =>
          of(
            startRequestError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );

/**
 * Consume el servcio que se encarga de terminar manualmente una solicitud
 * @param {*} action$
 * @param {*} state$
 */
export const endRequest = (action$, state$) =>
  action$.pipe(
    ofType(END_REQUEST),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout;
        axios(RequestApiClient.endRequest(action.onSuccess, action.idRequest))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (response.status >= 200 && response.status < 300 && code === 200) {
              obs.next(endRequestSuccess());
              obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(
                endRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
              action.onSuccess("error");
            } else {
              obs.next(
                endRequestError(
                  response.data.apiResponse.message
                )
              );
              obs.next(
                addMessage({
                  variant: "error",
                  message: response.data.apiResponse.message
                })
              );
              obs.complete();
            }
          })
          .catch(error => {
            obs.next(endRequestError(error));
            obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
          });
      }).pipe(
        catchError(error =>
          of(
            endRequestError("Error"),
            addMessage({ variant: "error", message: "Error" })
          )
        )
      )
    )
  );
