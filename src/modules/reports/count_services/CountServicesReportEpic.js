import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { getServiceAccountExportSuccess, getServiceAccountExportError, GET_SERVICE_ACCOUNT_EXPORT,getServiceAccountSuccess, getServiceAccountError, GET_SERVICE_ACCOUNT } from 'modules/reports/count_services/CountServicesReportActions.js';
import CountServicesReportApiClient from 'modules/reports/count_services/CountServicesReportApiClient';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getServiceAccount = (action$, state$) => action$.pipe(
    ofType(GET_SERVICE_ACCOUNT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CountServicesReportApiClient.getServiceAccount(
                    action.beginDate,
                    action.endDate,
                    action.groupBy,
                    action.apiPaginationAction,
                    action.apiPaginationCurrentPage,
                    action.apiPaginationDirection,
                    action.apiPaginationLimit,
                    action.apiPaginationOrderColumn,
                    action.apiPaginationMoveToPage,
                    action.apiPaginationFilter
                ))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getServiceAccountSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getServiceAccountError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getServiceAccountError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getServiceAccountError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getServiceAccountError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);

export const getServiceAccountExport = (action$, state$) => action$.pipe(
    ofType(GET_SERVICE_ACCOUNT_EXPORT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CountServicesReportApiClient.getServiceAccount(
                    action.beginDate,
                    action.endDate,
                    action.groupBy,
                    action.apiPaginationAction,
                    action.apiPaginationCurrentPage,
                    action.apiPaginationDirection,
                    action.apiPaginationLimit,
                    action.apiPaginationOrderColumn,
                    action.apiPaginationMoveToPage,
                    action.apiPaginationFilter
                ))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getServiceAccountExportSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getServiceAccountExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getServiceAccountExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getServiceAccountExportError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getServiceAccountExportError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);