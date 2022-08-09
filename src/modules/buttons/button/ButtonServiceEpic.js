import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureCallButtonError, configureCallButtonSuccess, CONFIGURE_CALL_BUTTON, findCallButtonError, findCallButtonSuccess, FIND_CALL_BUTTON_LIST, getCallButtonByIdError, getCallButtonByIdSuccess, GET_CALL_BUTTON_BY_ID, inactiveCallButtonError, inactiveCallButtonSuccess, INACTIVE_CALL_BUTTON } from 'modules/buttons/button/ButtonServiceActions.js';
import ButtonServiceApi from 'modules/buttons/button/ButtonServiceApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findCallButton = (action$, state$) => action$.pipe(
    ofType(FIND_CALL_BUTTON_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(ButtonServiceApi.filterCallButton(action.apiPaginationAction
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
                        obs.next(findCallButtonSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findCallButtonError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findCallButtonError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findCallButtonError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findCallButtonError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureCallButton = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_CALL_BUTTON)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(ButtonServiceApi.configureCallButton(action.CallButton))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureCallButtonSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureCallButtonError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureCallButtonError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(configureCallButtonError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureCallButtonError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getCallButtonById = (action$, state$) => action$.pipe(
    ofType(GET_CALL_BUTTON_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(ButtonServiceApi.getCallButtonById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getCallButtonByIdSuccess(data.callButton));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getCallButtonByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getCallButtonByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getCallButtonByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getCallButtonByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveCallButton = (action$, state$) => action$.pipe(
    ofType(INACTIVE_CALL_BUTTON)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(ButtonServiceApi.inactiveCallButton(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveCallButtonSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveCallButtonError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveCallButtonError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveCallButtonError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveCallButtonError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);