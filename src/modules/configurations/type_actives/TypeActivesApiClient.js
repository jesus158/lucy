import {
    LUCY_CONFIGURATION_SERVICE
} from 'modules/utils/ApiUtil.js'

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }

    filterTypeAsset = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => {
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
            method: 'get',
            url: `${this.url}/typeAsset/getByFilter/${this.account}` + encodeURI(uriFilter),
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }


        return request;
    }

    configureTypeAsset = (typeAsset) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post',
            url: `${this.url}/typeAsset/createUpdate/${this.account}`,
            data: typeAsset,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getTypeAssetById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeAsset/getById/${this.account}?idTypeAsset=${id}`,
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveTypeAsset = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete',
            url: `${this.url}/typeAsset/delete/${this.account}?idTypeAsset=${id}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getListActiveTypeAsset = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/typeAsset/getListActive/${this.account}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

}

const TypeAssetApi = new ApiClient();
export default TypeAssetApi;