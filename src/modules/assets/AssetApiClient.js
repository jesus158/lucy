import {
    LUCY_CONFIGURATION_SERVICE
} from 'modules/utils/ApiUtil.js'

class ApiClient {

    constructor() {
        this.url = LUCY_CONFIGURATION_SERVICE;
    }

    filterAsset = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => {
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
            url: `${this.url}/asset/getByFilter/${this.account}`,
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    configureAsset = (asset) => {
       this.account = sessionStorage["accountCode"];
       // console.log(asset);
        let request = {
            method: 'post',
            url: `${this.url}/asset/createUpdate/${this.account}`,
            data: asset,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }
        //console.log(request)
        return request;
    }

    getAssetById = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/asset/getById/${this.account}?idAsset=${id}`,
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    inactiveAsset = (id) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete',
            url: `${this.url}/asset/delete/${this.account}?idAsset=${id}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }

    getListActiveAsset = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get',
            url: `${this.url}/asset/getListActive/${this.account}`,
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

const AssetApi = new ApiClient();
export default AssetApi;