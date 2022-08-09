import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { getHistoryRequestExportSuccess, getHistoryRequestExportError, GET_HISTORY_REQUEST_EXPORT ,getHistoryRequestSuccess, getHistoryRequestError, GET_HISTORY_REQUEST } from 'modules/reports/history_request/HistoryRequestActions.js';
import HistoryRequestApiClient from 'modules/reports/history_request/HistoryRequestApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getHistoryRequest = (action$, state$) => action$.pipe(
    ofType(GET_HISTORY_REQUEST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HistoryRequestApiClient.getHistoryRequest(
                action.beginDate
                , action.endDate
                , action.idTypeService
                , action.stateRequest
                , action.idCarrier
                , action.locationBegin
                , action.locationEnd
                , action.apiPaginationAction
                , action.apiPaginationCurrentPage
                , action.apiPaginationDirection
                , action.apiPaginationLimit
                , action.apiPaginationOrderColumn
                , action.apiPaginationMoveToPage
                , action.apiPaginationFilter
                ))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    console.log(response)
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        //console.log(this.state)
                        obs.next(getHistoryRequestSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getHistoryRequestError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getHistoryRequestError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getHistoryRequestError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getHistoryRequestError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);

export const getHistoryRequestExport = (action$, state$) => action$.pipe(
    ofType(GET_HISTORY_REQUEST_EXPORT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(HistoryRequestApiClient.getHistoryRequest(
                action.beginDate
                , action.endDate
                , action.idTypeService
                , action.stateRequest
                , action.idCarrier
                , action.locationBegin
                , action.locationEnd
                , action.apiPaginationAction
                , action.apiPaginationCurrentPage
                , action.apiPaginationDirection
                , action.apiPaginationLimit
                , action.apiPaginationOrderColumn
                , action.apiPaginationMoveToPage
                , action.apiPaginationFilter
                ))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getHistoryRequestExportSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getHistoryRequestExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getHistoryRequestExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getHistoryRequestExportError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getHistoryRequestExportError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);