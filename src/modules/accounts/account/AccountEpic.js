/* eslint-disable prettier/prettier */
import axios from 'axios';
import { addMessage } from 'layouts/MessagesActions.js';
import { getListCostCenterSuccess, getListCostCenterError, GET_LIST_COST_CENTER, configureAccountError, configureAccountSuccess, CONFIGURE_ACCOUNT, fetchAllAccountError, fetchAllAccountSuccess, FETCH_ALL_ACCOUNT_LIST, findAccountError, findAccountSuccess, FIND_ACCOUNT_LIST, getAccountByIdError, getAccountByIdSuccess, GET_ACCOUNT_BY_ID, inactiveAccountError, inactiveAccountSuccess, INACTIVE_ACCOUNT } from 'modules/accounts/account/AccountActions.js';
import AccountApi from 'modules/accounts/account/AccountApiClient.js';
import { apiTimeout } from 'modules/utils/ApiUtil.js';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';


export const findAccount = (action$, state$) => action$.pipe(
    ofType(FIND_ACCOUNT_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.filterAccount(action.apiPaginationAction
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
                        obs.next(findAccountSuccess(data));
                        obs.complete();
                    } else if (response.status === 401) {
                        //obs.next(findAccountError(error));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        //obs.next(findAccountError(data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    //obs.next(findAccountError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(findAccountError("")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);

export const fetchAllAccount = (action$, state$) => action$.pipe(
    ofType(FETCH_ALL_ACCOUNT_LIST)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.fetchAllAccount())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;

                        let accounts = data.accounts
                            .map(object => {
                                return (
                                    { id: object.id, code: object.schemaAccount, name: object.nameAccount, userAccountId: 0, userAccountProfileId: 4, userAccountProfileName: "Súper Administrador", canMakeRequest: 0 }
                                );
                            });
                        try {
                            sessionStorage["accountId"] = accounts[0].id;
                            sessionStorage["accountCode"] = accounts[0].code;
                            sessionStorage["accountName"] = accounts[0].name;
                            sessionStorage["userAccountId"] = accounts[0].userAccountId;
                            sessionStorage["userAccountProfileId"] = accounts[0].userAccountProfileId;
                            sessionStorage["userAccountProfileName"] = accounts[0].userAccountProfileName;
                            sessionStorage["canMakeRequest"] = accounts[0].canMakeRequest;
                            sessionStorage["accounts"] = JSON.stringify(accounts);
                        } catch (exc) { }

                        obs.next(fetchAllAccountSuccess(accounts));
                        obs.complete();
                        action.success("OK");
                    } else if (response.status === 401) {
                        obs.next(fetchAllAccountError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(fetchAllAccountError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(fetchAllAccountError(error.message));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(
            catchError(error => of(fetchAllAccountError("")
                , addMessage({ variant: "error", message: "Error" })
            )))
    )
);


export const configureAccount = (action$, state$) => action$.pipe(
    ofType(CONFIGURE_ACCOUNT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.configureAccount(action.account))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(configureAccountSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(configureAccountError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(configureAccountError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(configureAccountError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(configureAccountError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getAccountById = (action$, state$) => action$.pipe(
    ofType(GET_ACCOUNT_BY_ID)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.getAccountById(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getAccountByIdSuccess(data.account));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getAccountByIdError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getAccountByIdError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getAccountByIdError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getAccountByIdError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const getListCostCenter = (action$, state$) => action$.pipe(
    ofType(GET_LIST_COST_CENTER)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.getListCostCenter())
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        let data = response.data;
                        obs.next(getListCostCenterSuccess(data.listCostCenter));
                        obs.complete();
                    } else if (response.status === 401) {
                        obs.next(getListCostCenterError(""));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    } else {
                        obs.next(getListCostCenterError(response.data.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                    }

                })
                .catch(error => {
                    obs.next(getListCostCenterError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                });
        }).pipe(catchError(error => of(getListCostCenterError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);

export const inactiveAccount = (action$, state$) => action$.pipe(
    ofType(INACTIVE_ACCOUNT)
    , mergeMap(action =>
        Observable.create(obs => {
            axios.defaults.timeout = apiTimeout;
            axios(AccountApi.inactiveAccount(action.id))
                .then(response => {
                    let code = response.data.apiResponse.code;
                    if (response.status >= 200 && response.status < 300 && code === 200) {
                        obs.next(inactiveAccountSuccess());
                        obs.next(addMessage({ variant: "success", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("OK"); //Callback de suceso
                    } else if (response.status === 401) {
                        obs.next(inactiveAccountError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    } else {
                        obs.next(inactiveAccountError(response.data.apiResponse.message));
                        obs.next(addMessage({ variant: "error", message: response.data.apiResponse.message }));
                        obs.complete();
                        action.onSuccess("ERROR");
                    }

                })
                .catch(error => {
                    obs.next(inactiveAccountError(error));
                    obs.next(addMessage({ variant: "error", message: error.message }));
                    obs.complete();
                    action.onSuccess("ERROR");
                });
        }).pipe(catchError(error => of(inactiveAccountError(error)
            , addMessage({ variant: "error", message: "Error" })
        )))
    )
);