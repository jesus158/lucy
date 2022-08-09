import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { endCarrierBreakShiftError,endCarrierBreakShiftSuccess,endCarrierAbsenceShiftError,endCarrierAbsenceShiftSuccess,carrierAbsenceShiftError, carrierAbsenceShiftSuccess, carrierBreakShiftError, carrierBreakShiftSuccess, carrierEndShiftError, carrierEndShiftSuccess, carrierStartShiftError, carrierStartShiftSuccess,END_CARRIER_BREAK_SHIFT,END_CARRIER_ABSENCE_SHIFT, CARRIER_ABSENCE_SHIFT, CARRIER_BREAK_SHIFT, CARRIER_END_SHIFT, CARRIER_START_SHIFT, GET_CARRIER_LIST, getCarrierByIdError, getCarrierByIdSuccess, getInShiftByFilterError, getInShiftByFilterSuccess, GET_CARRIER_BY_ID, GET_IN_SHIFT_BY_FILTER, getCarrierListSuccess, getCarrierListError } from 'modules/carriers/carrierActions.js';
import CarrierApi from 'modules/carriers/carrierApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getInShiftByFilter = (action$, state$) => action$.pipe(
    ofType(GET_IN_SHIFT_BY_FILTER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.getInShiftByFilter(action.apiPaginationAction
                , action.apiPaginationCurrentPage
                , action.apiPaginationDirection
                , action.apiPaginationLimit
                , action.apiPaginationOrderColumn
                , action.apiPaginationMoveToPage
                , action.apiPaginationFilter))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getInShiftByFilterSuccess(data.listCarrierLocation,data.apiPagination));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getInShiftByFilterError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getInShiftByFilterError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(getInShiftByFilterError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(getInShiftByFilterError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const getCarrierById = (action$, state$) => action$.pipe(
    ofType(GET_CARRIER_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.getCarrierById(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getCarrierByIdSuccess(data.carrierLocation));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getCarrierByIdError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getCarrierByIdError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getCarrierByIdError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getCarrierByIdError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);

/**
 * Esta es forma de ejecutar el consumo del servicio
 * que permite a un operador terminar
 * su turno
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const carrierEndShift = (action$, state$) => action$.pipe(
    ofType(CARRIER_END_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.carrierEndShift(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(carrierEndShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(carrierEndShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(carrierEndShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(carrierEndShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(carrierEndShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

/**
 * Consume el servicio que permite
 * a un operador iniciar su turno
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const carrierStartShift = (action$, state$) => action$.pipe(
    ofType(CARRIER_START_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.carrierStartShift(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(carrierStartShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(carrierStartShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(carrierStartShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(carrierStartShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(carrierStartShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

/**
 * Ejecuta el consumo del servicio que permite
 * tomar un receso del turno del operador
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const carrierBreakShift = (action$, state$) => action$.pipe(
    ofType(CARRIER_BREAK_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.carrierBreakShift(action.onSuccess, action.idTypeBreak, action.minutesBreak))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(carrierBreakShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(carrierBreakShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(carrierBreakShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(carrierBreakShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(carrierBreakShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);
/**
 * Ejecuta el consumo del servicio que permite
 * tomar un receso del turno del operador
 * @param {*} action$ 
 * @param {*} state$ 
 */
 export const endCarrierBreakShift = (action$, state$) => action$.pipe(
    ofType(END_CARRIER_BREAK_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.endCarrierBreakShift(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(endCarrierBreakShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(endCarrierBreakShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(endCarrierBreakShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(endCarrierBreakShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(endCarrierBreakShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);
/**
 * Ejecuta el consumo del servicio que permite
 * terminar una ausencia del operador
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const endCarrierAbsenceShift = (action$, state$) => action$.pipe(
    ofType(END_CARRIER_ABSENCE_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.endCarrierAbsenceShift(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(endCarrierAbsenceShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(endCarrierAbsenceShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(endCarrierAbsenceShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(endCarrierAbsenceShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(endCarrierAbsenceShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);
/**
 * Consume el servicio que permite 
 * ausentarse del turno a un operador
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const carrierAbsenceShift = (action$, state$) => action$.pipe(
    ofType(CARRIER_ABSENCE_SHIFT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.carrierAbsenceShift(action.onSuccess, action.idTypeAbsence, action.minutesAbsence))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(carrierAbsenceShiftSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.next(carrierAbsenceShiftError(response.data.apiResponse.message));
                        obs.complete();
                        action.onSuccess("error");
                    } else {
                        obs.next(carrierAbsenceShiftError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }
                })
                .catch(error => {
                    obs.next(carrierAbsenceShiftError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(carrierAbsenceShiftError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const getCarrierList = (action$, state$) => action$.pipe(
    ofType(GET_CARRIER_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierApi.getCarrierList())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getCarrierListSuccess(data.listCarrier));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getCarrierListError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getCarrierListError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getCarrierListError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getCarrierListError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);