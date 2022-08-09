import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions';
import { trackingStateSOSError, trackingStateSOSSuccess, trackingStateAlertsError, trackingStateAlertsSuccess,trackingStateUsersError, trackingStateAssetsError, 
    trackingStateUsersSuccess, trackingStateAssetsSuccess, TRACKING_STATE_SOS,TRACKING_STATE_ALERTS, TRACKING_STATE_USERS, TRACKING_STATE_ASSETS,closeAlertError, closeAlertSuccess, CLOSE_ALERT } from 'modules/reports/tracking/TrackingActions.js';
import TrackingApi from 'modules/reports/tracking/TrackingApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

export const trackingStateUsers = (action$, state$) => action$.pipe(
    ofType(TRACKING_STATE_USERS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TrackingApi.trackingStateUsers(action.apiPaginationAction
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
                        obs.next(trackingStateUsersSuccess(data.listUsers, data.apiPagination));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(trackingStateUsersError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(trackingStateUsersError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(trackingStateUsersError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(trackingStateUsersError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const trackingStateAssets = (action$, state$) => action$.pipe(
    ofType(TRACKING_STATE_ASSETS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TrackingApi.trackingStateAssets(action.apiPaginationAction
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
                        obs.next(trackingStateAssetsSuccess(data.listAssets, data.apiPagination));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(trackingStateAssetsError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(trackingStateAssetsError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(trackingStateAssetsError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(trackingStateAssetsError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const trackingStateSOS = (action$, state$) => action$.pipe(
    ofType(TRACKING_STATE_SOS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TrackingApi.trackingStateSOS(action.apiPaginationAction
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
                        obs.next(trackingStateSOSSuccess(data.listSOS, data.apiPagination));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(trackingStateSOSError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(trackingStateSOSError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(trackingStateSOSError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(trackingStateSOSError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const trackingStateAlerts = (action$, state$) => action$.pipe(
    ofType(TRACKING_STATE_ALERTS)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TrackingApi.trackingStateAlerts(action.apiPaginationAction
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
                        obs.next(trackingStateAlertsSuccess(data.listAlerts, data.apiPagination));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(trackingStateAlertsError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(trackingStateAlertsError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(trackingStateAlertsError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(trackingStateAlertsError("Error")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const closeAlert = (action$, state$) => action$.pipe(
    ofType(CLOSE_ALERT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(TrackingApi.closeAlert(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(closeAlertSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(closeAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(closeAlertError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(closeAlertError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(closeAlertError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);