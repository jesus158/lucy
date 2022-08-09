import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }


    filterTypeCancellation = (apiPaginationAction
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
            , url: `${this.url}/typeCancellation/getByFilter/${this.account}` + encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureTypeCancellation = (typeCancellation) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post'
            , url: `${this.url}/typeCancellation/createUpdate/${this.account}`
            , data: typeCancellation
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getTypeCancellationById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeCancellation/getById/${this.account}?idTypeCancellation=${id}`
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeCancellation = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/typeCancellation/delete/${this.account}?idTypeCancellation=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    /**
     * Genera la URL de consulta, para hacer uso
     * de los microservicios expuestos en el 
     * backend
     */
    getListActiveTypeCancellation = (onSuccess) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: "get",
            url:
                `${this.url}/typeCancellation/getListActive/${this.account}`,
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

}

const TypeCancellationApi = new ApiClient();
export default TypeCancellationApi;