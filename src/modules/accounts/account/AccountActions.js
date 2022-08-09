export const FIND_ACCOUNT_LIST = 'FIND_ACCOUNT_LIST';
export const FIND_ACCOUNT_LIST_SUCCESS = 'FIND_ACCOUNT_LIST_SUCCESS';
export const FIND_ACCOUNT_LIST_ERROR = 'FIND_ACCOUNT_LIST_ERROR';

export const FETCH_ALL_ACCOUNT_LIST = 'FETCH_ALL_ACCOUNT_LIST';
export const FETCH_ALL_ACCOUNT_LIST_SUCCESS = 'FETCH_ALL_ACCOUNT_LIST_SUCCESS';
export const FETCH_ALL_ACCOUNT_LIST_ERROR = 'FETCH_ALL_ACCOUNT_LIST_ERROR';

export const CONFIGURE_ACCOUNT = 'CONFIGURE_ACCOUNT';
export const CONFIGURE_ACCOUNT_SUCCESS = 'CONFIGURE_ACCOUNT_SUCCESS';
export const CONFIGURE_ACCOUNT_ERROR = 'CONFIGURE_ACCOUNT_ERROR';

export const GET_ACCOUNT_BY_ID = 'GET_ACCOUNT_BY_ID';
export const GET_ACCOUNT_BY_ID_SUCCESS = 'GET_ACCOUNT_BY_ID_SUCCESS';
export const GET_ACCOUNT_BY_ID_ERROR = 'GET_ACCOUNT_BY_ID_ERROR';

export const INACTIVE_ACCOUNT = 'INACTIVE_ACCOUNT';
export const INACTIVE_ACCOUNT_SUCCESS = 'INACTIVE_ACCOUNT_SUCCESS';
export const INACTIVE_ACCOUNT_ERROR = 'INACTIVE_ACCOUNT_ERROR';

export const GET_LIST_COST_CENTER = 'GET_LIST_COST_CENTER';
export const GET_LIST_COST_CENTER_SUCCESS = 'GET_LIST_COST_CENTER_SUCCESS';
export const GET_LIST_COST_CENTER_ERROR = 'GET_LIST_COST_CENTER_ERROR';

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_ACCOUNT_CODE = 'SET_ACCOUNT_CODE';


/********************
 * Filtrar  cuentas *
 ********************/

export const findAccount = (apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
      type: FIND_ACCOUNT_LIST
      , apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter
    }
  );

export const findAccountSuccess = (listResultSetAccount) => (
  {
    type: FIND_ACCOUNT_LIST_SUCCESS
    , listResultSetAccount
  }
);

export const findAccountError = (error) => (
  {
    type: FIND_ACCOUNT_LIST_ERROR
    , error
  }
);

/***************************
 * Traer todas las cuentas *
 ***************************/

export const fetchAllAccount = (success) => (
  {
    type: FETCH_ALL_ACCOUNT_LIST,
    success
  }
);

export const fetchAllAccountSuccess = (accounts) => (
  {
    type: FETCH_ALL_ACCOUNT_LIST_SUCCESS
    , accounts
  }
);

export const fetchAllAccountError = (error) => (
  {
    type: FETCH_ALL_ACCOUNT_LIST_ERROR
    , error
  }
);

/*********************
 * Manejo de cuentas *
 *********************/

export const configureAccount = (account, ownProps, onSuccess) => (
  {
    type: CONFIGURE_ACCOUNT
    , account
    , ownProps
    , onSuccess

  }
);

export const configureAccountSuccess = () => (
  {
    type: CONFIGURE_ACCOUNT_SUCCESS
  }
);

export const configureAccountError = (error) => (
  {
    type: CONFIGURE_ACCOUNT_ERROR
    , error
  }
);

export const setAccount = (account) => (
  {
    type: SET_ACCOUNT
    , account
  }
);

/***********************
* Buscar cuenta por ID *
************************/

export const getAccountById = (id) => (
  {
    type: GET_ACCOUNT_BY_ID
    , id
  }
);

export const getAccountByIdSuccess = (account) => (
  {
    type: GET_ACCOUNT_BY_ID_SUCCESS
    , account
  }
);

export const getAccountByIdError = (error) => (
  {
    type: GET_ACCOUNT_BY_ID_ERROR
    , error
  }
);

/****************************
 * Desactivar cuenta por ID *
 ****************************/

export const inactiveAccount = (id, onSuccess) => (
  {
    type: INACTIVE_ACCOUNT
    , id
    , onSuccess

  }
);

export const inactiveAccountSuccess = () => (
  {
    type: INACTIVE_ACCOUNT_SUCCESS
  }
);

export const inactiveAccountError = (error) => (
  {
    type: INACTIVE_ACCOUNT_ERROR
    , error
  }
);

/************************************************
 *  Listado de los centros de costo disponibles *
 ************************************************/
export const getListCostCenter = (onSuccess) => (
  {
    type: GET_LIST_COST_CENTER
    , onSuccess

  }
);

export const getListCostCenterSuccess = (listCostCenter) => (
  {
    type: GET_LIST_COST_CENTER_SUCCESS
    , listCostCenter

  }
);

export const getListCostCenterError = (error) => (
  {
    type: GET_LIST_COST_CENTER_ERROR
    , error

  }
);

export const setAccountCode = (accountCode) => (
  {
    type: SET_ACCOUNT_CODE
    , accountCode
  }
);