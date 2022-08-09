import { LUCY_REQUEST_SERVICE } from 'modules/utils/ApiUtil';
class ApiClient {

  constructor() {
    this.url = LUCY_REQUEST_SERVICE;
  }
  /**
   * recuperar el listado de los transportistas
   * en turno, recuperación filtrada
   */
  getInShiftByFilter = (
    apiPaginationAction
    , apiPaginationCurrentPage
    , apiPaginationDirection
    , apiPaginationLimit
    , apiPaginationOrderColumn
    , apiPaginationMoveToPage
    , apiPaginationFilter
   ) => {
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
    this.account = sessionStorage["accountCode"];
    let request = {
      method: 'get'
      , url: `${this.url}/carrier/getInShiftByFilter/${this.account}` + encodeURI(uriFilter)
      , headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    }
    return request;
  };

  /**
   * URL para consumir el servicio
   * que recupera el estado actual
   * del operador
   */
  getCarrierById = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";

    if (this.idUserSystemAccount !== undefined) {
      var prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }

    let request = {
      method: "get",
      url:
        `${this.url}/carrier/getById/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };

  /**
   * Retorna la URL de consumo, para que un 
   * operador cierre su turno
   */
  carrierEndShift = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";

    if (this.idUserSystemAccount !== undefined) {
      var prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }

    let request = {
      method: "put",
      url:
        `${this.url}/carrier/endsShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };

  /**
   * Genera la url para consumir el servicio
   * que le permite a un operador iniciar
   * el turno
   */
  carrierStartShift = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";

    if (this.idUserSystemAccount !== undefined) {
      var prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }

    let request = {
      method: "put",
      url:
        `${this.url}/carrier/startsShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };
  
  /**
   * Genera la URL para solicitar el receso del turno actual
   */
  carrierBreakShift = (onSuccess, idTypeBreak, minutesBreak) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";
    var prefix = "&";
    if (idTypeBreak !== undefined) {
      prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idTypeBreak=" + idTypeBreak;
    }
    if (this.idUserSystemAccount !== undefined) {
      prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }
    if (minutesBreak !== undefined) {
      prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "minutesBreak=" + minutesBreak;
    }

    let request = {
      method: "put",
      url:
        `${this.url}/carrier/breakShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };

  /**
   * Genera la URL para solicitar la terminación de la ausencia del turno actual
   */
  endCarrierAbsenceShift = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";
    var prefix = "&";
    if (this.idUserSystemAccount !== undefined) {
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }

    return {
      method: "put",
      url:
        `${this.url}/carrier/endAbsenceShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
  };
/**
   * Genera la URL para solicitar la terminación del receso del turno actual
   */
  endCarrierBreakShift = (onSuccess) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";
    var prefix = "&";
    if (this.idUserSystemAccount !== undefined) {
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }

    return{
      method: "put",
      url:
        `${this.url}/carrier/endBreakShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
  };


/**
 * Retorna la URL para consumir el servicio que permite
 * a un operador ausentarse del turno
 */
  carrierAbsenceShift = (onSuccess, idTypeAbsence,minutesAbsence) => {
    this.account = sessionStorage["accountCode"];
    this.idUserSystemAccount = sessionStorage["userAccountId"];
    this.idProfileUser = sessionStorage["userAccountProfileId"];
    var uriFilter = "";
    var prefix = "&";

    if (idTypeAbsence !== undefined) {
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idTypeAbsence=" + idTypeAbsence;
    }
    if (this.idUserSystemAccount !== undefined) {
      prefix = "&";
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
    }
    if (minutesAbsence !== undefined) {
      if (uriFilter.length < 1) {
        prefix = "?"
      }
      uriFilter += prefix + "minutesAbsence=" + minutesAbsence;
    }

    let request = {
      method: "put",
      url:
        `${this.url}/carrier/absentShift/${this.account}` + encodeURI(uriFilter),
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };

  /**
   * Listado
   */
  getCarrierList = () => {
    this.account = sessionStorage["accountCode"];

    let request = {
      method: "get",
      url:
        `${this.url}/carrier/getList/${this.account}`,
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    return request;
  };
  

}

const CarrierApi = new ApiClient();
export default CarrierApi;