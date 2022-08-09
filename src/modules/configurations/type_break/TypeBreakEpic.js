import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureTypeBreakError, configureTypeBreakSuccess, CONFIGURE_TYPE_BREAK, findTypeBreakError, findTypeBreakSuccess, FIND_TYPE_BREAK_LIST, getActiveListTypeBreakError, getActiveListTypeBreakSuccess, getTypeBreakByIdError, getTypeBreakByIdSuccess, GET_ACTIVE_LIST_TYPE_BREAK, GET_TYPE_BREAK_BY_ID, inactiveTypeBreakError, inactiveTypeBreakSuccess, INACTIVE_TYPE_BREAK } from 'modules/configurations/type_break/TypeBreakActions.js';
import TypeBreakApiClient from 'modules/configurations/type_break/TypeBreakApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findTypeBreak = (action$, state$) => action$.pipe(
    ofType(FIND_TYPE_BREAK_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeBreakApiClient.filterTypeBreak(action.apiPaginationAction
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
                        obs.next(findTypeBreakSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findTypeBreakError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findTypeBreakError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findTypeBreakError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findTypeBreakError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureTypeBreak = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_TYPE_BREAK)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeBreakApiClient.configureTypeBreak(action.typeBreak))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureTypeBreakSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureTypeBreakError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureTypeBreakError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureTypeBreakError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureTypeBreakError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getTypeBreakById = (action$, state$) => action$.pipe(
    ofType(GET_TYPE_BREAK_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeBreakApiClient.getTypeBreakById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getTypeBreakByIdSuccess(data.typeBreak));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getTypeBreakByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getTypeBreakByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getTypeBreakByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getTypeBreakByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveTypeBreak = (action$, state$) => action$.pipe(
    ofType(INACTIVE_TYPE_BREAK)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeBreakApiClient.inactiveTypeBreak(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveTypeBreakSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveTypeBreakError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveTypeBreakError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveTypeBreakError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveTypeBreakError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getActiveListTypeBreak = (action$, state$) => action$.pipe(
    ofType(GET_ACTIVE_LIST_TYPE_BREAK)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TypeBreakApiClient.getActiveListTypeBreak(action.onSuccess))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getActiveListTypeBreakSuccess(data.listTypeBreak));
                        //obs.next(addMessage({variant:"success", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(getActiveListTypeBreakError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getActiveListTypeBreakError(response.data.apiResponse.message));
                        //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getActiveListTypeBreakError(error));
                    //obs.next(addMessage({variant:"error", message:error.message}));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(getActiveListTypeBreakError(error)
            //, addMessage({variant:"error", message:"Error"})
        )))
    )
);