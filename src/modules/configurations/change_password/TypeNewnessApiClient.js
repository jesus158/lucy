import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';
import { LUCY_REQUEST_SERVICE } from 'modules/utils/ApiUtil.js'
class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
        this.url1 = LUCY_REQUEST_SERVICE;
    }

    filterTypeNewness = (apiPaginationAction
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
            , url: `${this.url}/typeNewness/getByFilter/${this.account}` + encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureTypeNewness = (typeNewness) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post'
            , url: `${this.url}/typeNewness/createUpdate/${this.account}`
            , data: typeNewness
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getTypeNewnessById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeNewness/getById/${this.account}?idTypeNewness=${id}`
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeNewness = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/typeNewness/delete/${this.account}?idTypeNewness=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    };

    /**
     * Retorna la url para el consumo del servicio
     * que retorna el listado de los tipos de novedades
     * que se ecuentran activos
     */
    getActiveListTypeNewness = (onSuccess) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeNewness/getListActive/${this.account}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }
        return request;
    }

    /**
     * Retorna la url para el consumo del servicio
     * que retorna el listado de las novedades
     * que se ecuentran asociadas a una solicitud
     */
    getListRequestTypeNewness = (onSuccess, idRequest) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeNewness/getListRequestTypeNewness/${this.account}?idRequest=${idRequest}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }
        return request;
    }





    //carrierNewnessShift Guarda la novedad para el operador en turno

    /**
     * Genera la URL para solicitar la novedad del turno actual
     */
    carrierNewnessShift = (onSuccess, idTypeNewness , idRequest) => {
        this.account = sessionStorage["accountCode"];
        var uriFilter = "";
        var prefix = "&";
        if (idTypeNewness !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idTypeNewness=" + idTypeNewness;
        }
        if (idRequest !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idRequest=" + idRequest;
        }
        let request = {
            method: "put",
            url:
                `${this.url1}/requestNewness/requestNewnessShift/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

}

const TypeNewnessApi = new ApiClient();
export default TypeNewnessApi;