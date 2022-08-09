import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { getNumberRequestsSuccess, getNumberRequestsError, GET_NUMBER_REQUEST } from 'modules/reports/dashboard/DashboardActions.js';
import DashboardApi from 'modules/reports/dashboard/DashboardApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getNumberRequests = (action$, state$) => action$.pipe(
    ofType(GET_NUMBER_REQUEST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(DashboardApi.getNumberRequests())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getNumberRequestsSuccess(data.result));
                        //obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK");
                    } else if (response.status === 401) {
                        obs.next(getNumberRequestsError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(getNumberRequestsError(response.data.apiResponse.message));
                        //obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }
                })
                .catch(error => {
                    obs.next(getNumberRequestsError(error));
                    //obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(
            catchError(error => of(getNumberRequestsError("Error")
                , addMessage({ variant: "error", message: "Error" })
                , action.onSuccess("ERROR")
            )))
    )
);