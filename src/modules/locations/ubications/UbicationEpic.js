import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { changeTwoUbicationsError, changeTwoUbicationsSuccess, CHANGE_TWO_UBICATIONS, createUpdateUbicationError, createUpdateUbicationSuccess, CREATE_UPDATE_UBICATION, deleteUbicationError, deleteUbicationSuccess, DELETE_UBICATION, getListActiveShowError, getListActiveShowSuccess, getUbicationByFilterError, getUbicationByFilterSuccess, GET_LIST_ACTIVE_SHOW, GET_UBICATIONS_BY_FILTER } from 'modules/locations/ubications/UbicationActions.js';
import UbicationServicesApi from 'modules/locations/ubications/UbicationApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil.js';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const getUbicationByFilter = (action$, state$) =>
  action$.pipe(
    ofType(GET_UBICATIONS_BY_FILTER),
    mergeMap(action =>
      Observable.create(obs => {
        axios.defaults.timeout = apiTimeout * 5;
        axios(
          UbicationServicesApi.getUbicationByFilter(
            action.onSuccess,
            action.apiPaginationAction,
            action.apiPaginationCurrentPage,
            action.apiPaginationDirection,
            action.apiPaginationLimit,
            action.apiPaginationOrderColumn,
            action.apiPaginationMoveToPage,
            action.apiPaginationFilter
          )
        )
          .then(response => {
            let code = response.data.apiResponse.code;
            if (
              response.status >= 200 &&
              response.status < 300 &&
              code === 200
            ) {
              let data = response.data;
              obs.next(getUbicationByFilterSuccess(data));
              obs.complete();
              action.onSuccess("OK");
            } else if (response.status === 401) {
              obs.next(getUbicationByFilterError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            } else {
              obs.next(getUbicationByFilterError(response.data.apiResponse.message));
              //obs.next(addMessage({variant: "error",message: response.data.apiResponse.message}));
              obs.complete();
              action.onSuccess("ERROR");
            }
          })
          .catch(error => {
            obs.next(getUbicationByFilterError(error));
            //obs.next(addMessage({ variant: "error", message: error.message }));
            obs.complete();
            action.onSuccess("ERROR");
          });
      }).pipe(
        catchError(error =>
          of(
            getUbicationByFilterError("Error"),
            //addMessage({ variant: "error", message: "Error" }),
            action.onSuccess("ERROR")
          )
        )
      )
    )
  );

export const getListActiveShowService = (action$, state$) => action$.pipe(
  ofType(GET_LIST_ACTIVE_SHOW)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(UbicationServicesApi.getListActiveShowService())
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            let data = response.data;
            obs.next(getListActiveShowSuccess(data.listUbication));
            obs.complete();
          } else if (response.status === 401) {
            obs.next(getListActiveShowError(response.data.apiResponse.message));
            // obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
            obs.complete();
          } else {
            obs.next(getListActiveShowError(response.data.apiResponse.message));
            //obs.next(addMessage({variant:"error", message:response.data.apiResponse.message}));
            obs.complete();
          }

        })
        .catch(error => {
          obs.next(getListActiveShowError(error));
          //obs.next(addMessage({variant:"error", message:error.message}));
          obs.complete();
        });
    }).pipe(
      catchError(error => of(getListActiveShowError("Error")
        //, addMessage({variant:"error", message:"Error"})
      )))
  )
);

export const createUpdateUbication = (action$, state$) => action$.pipe(
  ofType(CREATE_UPDATE_UBICATION)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(UbicationServicesApi.createUpdateUbication(action.onSuccess, action.Ubication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(createUpdateUbicationSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(createUpdateUbicationError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(createUpdateUbicationError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(createUpdateUbicationError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(createUpdateUbicationError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const changeTwoUbications = (action$, state$) => action$.pipe(
  ofType(CHANGE_TWO_UBICATIONS)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(UbicationServicesApi.changeTwoUbications(action.onSuccess, action.idUbication1, action.idUbication2))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(changeTwoUbicationsSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(changeTwoUbicationsError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(changeTwoUbicationsError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(changeTwoUbicationsError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(changeTwoUbicationsError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);

export const deleteUbication = (action$, state$) => action$.pipe(
  ofType(DELETE_UBICATION)
  , mergeMap(action =>
    Observable.create(obs => {
      axios.defaults.timeout = apiTimeout;
      axios(UbicationServicesApi.deleteUbication(action.onSuccess, action.idUbication))
        .then(response => {
          let code = response.data.apiResponse.code;
          if (response.status >= 200 && response.status < 300 && code === 200) {
            obs.next(deleteUbicationSuccess());
            obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("OK");
          } else if (response.status === 401) {
            obs.next(deleteUbicationError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          } else {
            obs.next(deleteUbicationError(response.data.apiResponse.message));
            obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
            obs.complete();
            action.onSuccess("ERROR");
          }
        })
        .catch(error => {
          obs.next(deleteUbicationError(error));
          obs.next(addMessage({ variant: "error", message: error.message }));
          obs.complete();
          action.onSuccess("ERROR");
        });
    }).pipe(
      catchError(error => of(deleteUbicationError("Error")
        , addMessage({ variant: "error", message: "Error" })
        , action.onSuccess("ERROR")
      )))
  )
);
