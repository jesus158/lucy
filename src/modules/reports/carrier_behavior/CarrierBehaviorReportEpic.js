import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { getCarrierBehaviorError, getCarrierBehaviorExportError, getCarrierBehaviorExportSuccess, getCarrierBehaviorSuccess, GET_CARRIER_BEHAVIOR, GET_CARRIER_BEHAVIOR_EXPORT } from 'modules/reports/carrier_behavior/CarrierBehaviorReportActions.js';
import CarrierBehaviorReportApiClient from 'modules/reports/carrier_behavior/CarrierBehaviorReportApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getCarrierBehavior = (action$, state$) => action$.pipe(
    ofType(GET_CARRIER_BEHAVIOR)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierBehaviorReportApiClient.getCarrierBehavior(
                action.beginDate,
                action.endDate,
                action.listIdStates,
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
                        obs.next(getCarrierBehaviorSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getCarrierBehaviorError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getCarrierBehaviorError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getCarrierBehaviorError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getCarrierBehaviorError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);

export const getCarrierBehaviorExport = (action$, state$) => action$.pipe(
    ofType(GET_CARRIER_BEHAVIOR_EXPORT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(CarrierBehaviorReportApiClient.getCarrierBehavior(
                action.beginDate,
                action.endDate,
                action.listIdStates,
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
                        obs.next(getCarrierBehaviorExportSuccess(data));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getCarrierBehaviorExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getCarrierBehaviorExportError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getCarrierBehaviorExportError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getCarrierBehaviorExportError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);