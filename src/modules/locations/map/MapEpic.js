import axios from "axios";
import { getMapError, getMapSuccess, GET_MAP } from "modules/locations/map/MapActions.js";
import MapApiClient from "modules/locations/map/MapApiClient.js";
import { apiTimeout } from "modules/utils/ApiUtil.js";
import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

export const getMap = (action$, state$) =>
  action$.pipe(
    ofType(GET_MAP),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout * 5;
        axios(MapApiClient.getMap(action.onSuccess))
          .then(response => {
            let code = response.data.apiResponse.code;
            if (
              response.status >= 200 &&
              response.status < 300 &&
              code === 200
            ) {
              let data = response.data;
              obs.next(getMapSuccess(data.matrixZoneUbication));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(getMapError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            } else {
              obs.next(getMapError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            }
          })
          .catch(error => {
            obs.next(getMapError(error));
            //obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
            action.onSuccess("ERROR");
          });
      }).pipe(
        catchError(error =>
          of(
            getMapError("Error"),
            //addMessage({ variant: "error", message: "Error" }),
            action.onSuccess("ERROR")
          )
        )
      )
    )
  );