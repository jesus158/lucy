import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';

class ApiClient {

  constructor() {
    this.url = LUCY_CONFIGURATION_SERVICE;
  }


  filterTypeReject = (apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter) => {
    this.account = sessionStorage["accountCode"];
    var uriFilter = '';

    if (apiPaginationAction !== undefined) {
      uriFilter += '?ApiPaginationAction=' + apiPaginationAction
    } else {
      uriFilter += '?ApiPaginationAction=0';
    }

    if (apiPaginationCurrentPage !== undefined) {
      uriFilter += '&ApiPaginationCurrentPage=' + apiPaginationCurrentPage
    }

    if (apiPaginationDirection !== undefined) {
      uriFilter += '&ApiPaginationDirection=' + apiPaginationDirection
    }

    if (apiPaginationLimit !== undefined) {
      uriFilter += '&ApiPaginationLimit=' + apiPaginationLimit
    }

    if (apiPaginationOrderColumn !== undefined) {
      uriFilter += '&ApiPaginationOrderColumn=' + apiPaginationOrderColumn
    }

    if (apiPaginationMoveToPage !== undefined) {
      uriFilter += '&ApiPaginationMoveToPage=' + apiPaginationMoveToPage
    }

    if (apiPaginationFilter !== undefined) {
      uriFilter += '&ApiPaginationFilter=' + apiPaginationFilter
    }

    let request = {
      method: 'get'
      , url: `${this.url}/typeReject/getByFilter/${this.account}` + encodeURI(uriFilter)
      , headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    }

    return request;
  }

  configureTypeReject = (typeReject) => {
    this.account = sessionStorage["accountCode"];
    let request = {
      method: 'post'
      , url: `${this.url}/typeReject/createUpdate/${this.account}`
      , data: typeReject
      , headers: {
        "Content-Type": "application/json;charset=UTF-8"
        , "Accept": "application/json;charset=UTF-8"
      }
    }

    return request;
  }

  getTypeRejectById = (id) => {
    this.account = sessionStorage["accountCode"];
    let request = {
      method: 'get'
      , url: `${this.url}/typeReject/getById/${this.account}?idTypeReject=${id}`
      , headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    }

    return request;
  }

  inactiveTypeReject = (id) => {
    this.account = sessionStorage["accountCode"];
    let request = {
      method: 'delete'
      , url: `${this.url}/typeReject/delete/${this.account}?idTypeReject=${id}`
      , headers: {
        "Content-Type": "application/json;charset=UTF-8"
        , "Accept": "application/json;charset=UTF-8"
      }
    }

    return request;
  }

  /**
   * Retorna la URL con la información para consumir
   * el servicio de listado de los tipos de rechazo
   * activos en el sistema
   */
  getListActiveTypeReject = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    let request = {
      method: "get",
      url:
        `${this.url}/typeReject/getListActive/${this.account}`,
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };

}

const TypeRejectApi = new ApiClient();
export default TypeRejectApi;