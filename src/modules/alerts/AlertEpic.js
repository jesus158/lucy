import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { configureAlertError, configureAlertSuccess, CONFIGURE_ALERT, findAlertError, findAlertSuccess, FIND_ALERT_LIST, getAlertByIdError, getAlertByIdSuccess, GET_ALERT_BY_ID, inactiveAlertError, inactiveAlertSuccess, INACTIVE_ALERT } from 'modules/alerts/AlertActions.js';
import AlertApi from 'modules/alerts/AlertApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

 
export const findAlert = (action$, state$) => action$.pipe(
    ofType(FIND_ALERT_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AlertApi.filterAlert(action.apiPaginationAction
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
                        obs.next(findAlertSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(findAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(findAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(findAlertError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findAlertError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureAlert = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_ALERT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AlertApi.configureAlert(action.Alert))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureAlertSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureAlertError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureAlertError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(configureAlertError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureAlertError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getAlertById = (action$, state$) => action$.pipe(
    ofType(GET_ALERT_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AlertApi.getAlertById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        let AlertClient = {
                            id: data.alert.id,
                            active: data.alert.active,
                            ubication: { id: data.alert.alertGateway },
                            asset: { id: data.alert.alertTag },
                            typeAlert: { id: data.alert.typeAlert.id },
                            time: data.alert.time
                          };

                        obs.next(getAlertByIdSuccess(AlertClient));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getAlertByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getAlertByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getAlertByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getAlertByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveAlert = (action$, state$) => action$.pipe(
    ofType(INACTIVE_ALERT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AlertApi.inactiveAlert(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveAlertSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveAlertError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveAlertError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);