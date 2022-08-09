import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }


    filterTypeService = (apiPaginationAction
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
            , url: `${this.url}/typeService/getByFilter/${this.account}` + encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureTypeService = (typeService) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post'
            , url: `${this.url}/typeService/createUpdate/${this.account}`
            , data: typeService
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getTypeServiceById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeService/getById/${this.account}?idTypeService=${id}`
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeService = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/typeService/delete/${this.account}?idTypeService=${id}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getListActiveTypeService = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/typeService/getListActive/${this.account}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const TypeServicesApi = new ApiClient();
export default TypeServicesApi;