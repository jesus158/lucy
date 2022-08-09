import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureTypeAbsenceError, configureTypeAbsenceSuccess, CONFIGURE_TYPE_ABSENCE, findTypeAbsenceError, findTypeAbsenceSuccess, FIND_TYPE_ABSENCE_LIST, getActiveListTypeAbsenceError, getActiveListTypeAbsenceSuccess, getTypeAbsenceByIdError, getTypeAbsenceByIdSuccess, GET_ACTIVE_LIST_TYPE_ABSENCE, GET_TYPE_ABSENCE_BY_ID, inactiveTypeAbsenceError, inactiveTypeAbsenceSuccess, INACTIVE_TYPE_ABSENCE } from 'modules/configurations/type_absence/TypeAbsenceActions.js';
import TypeAbsenceApiClient from 'modules/configurations/type_absence/TypeAbsenceApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findTypeAbsence = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_ABSENCE_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAbsenceApiClient.filterTypeAbsence(action.apiPaginationAction
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
                        obs.next(findTypeAbsenceSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeAbsenceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeAbsenceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeAbsenceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeAbsenceError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeAbsence = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_ABSENCE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAbsenceApiClient.configureTypeAbsence(action.typeAbsence))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeAbsenceSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeAbsenceError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeAbsenceError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeAbsenceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeAbsenceError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeAbsenceById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_ABSENCE_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAbsenceApiClient.getTypeAbsenceById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeAbsenceByIdSuccess(data.typeAbsence));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeAbsenceByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeAbsenceByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeAbsenceByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeAbsenceByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeAbsence = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_ABSENCE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAbsenceApiClient.inactiveTypeAbsence(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeAbsenceSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeAbsenceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeAbsenceError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeAbsenceError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeAbsenceError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

/**
 * Consume el servicio, que retorna el listado de 
 * tipos de ausencias activas en el sistema.
 * @param {*} action$ 
 * @param {*} state$ 
 */
export const getActiveListTypeAbsence = (action$, state$) => action$.pipe(
    ofType(GET_ACTIVE_LIST_TYPE_ABSENCE)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeAbsenceApiClient.getActiveListTypeAbsence())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getActiveListTypeAbsenceSuccess(data.listTypeAbsence));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getActiveListTypeAbsenceError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getActiveListTypeAbsenceError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(getActiveListTypeAbsenceError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getActiveListTypeAbsenceError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);