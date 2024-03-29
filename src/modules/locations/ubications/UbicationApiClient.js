import { LUCY_LOCATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

    constructor() {
        this.url = LUCY_LOCATION_SERVICE;
    }

    getUbicationByFilter = (
        onSuccess,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
      ) => {
        this.account = sessionStorage["accountCode"];
        var uriFilter = "";
        if (apiPaginationAction !== undefined) {
          uriFilter += "?ApiPaginationAction=" + apiPaginationAction;
        } else {
          uriFilter += "?ApiPaginationAction=0";
        }
    
        if (apiPaginationCurrentPage !== undefined) {
          uriFilter += "&ApiPaginationCurrentPage=" + apiPaginationCurrentPage;
        }
    
        if (apiPaginationDirection !== undefined) {
          uriFilter += "&ApiPaginationDirection=" + apiPaginationDirection;
        }
    
        if (apiPaginationLimit !== undefined) {
          uriFilter += "&ApiPaginationLimit=" + apiPaginationLimit;
        }
    
        if (apiPaginationOrderColumn !== undefined) {
          uriFilter += "&ApiPaginationOrderColumn=" + apiPaginationOrderColumn;
        }
    
        if (apiPaginationMoveToPage !== undefined) {
          uriFilter += "&ApiPaginationMoveToPage=" + apiPaginationMoveToPage;
        }
    
        if (apiPaginationFilter !== undefined) {
          uriFilter += "&ApiPaginationFilter=" + apiPaginationFilter;
        }
    
        let request = {
          method: "get",
          url:
            `${this.url}/ubication/getByFilter/${this.account}` + encodeURI(uriFilter),
          headers: {
            Accept: "application/json;charset=UTF-8"
          }
        };
        return request;
      };

    createUpdateUbication = (onSuccess, Ubication) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'post'
            , url: `${this.url}/ubication/createUpdate/${this.account}`
            , data: Ubication
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }
        return request;
    }

    changeTwoUbications = (onSuccess, idUbication1, idUbication2) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'put'
            , url: `${this.url}/ubication/changeTwoUbications/${this.account}/${idUbication1}/${idUbication2}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }
        return request;
    }

    deleteUbication = (onSuccess, idUbication) => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'delete'
            , url: `${this.url}/ubication/delete/${this.account}?idUbication=${idUbication}`
            , headers: {
                "Content-Type": "application/json;charset=UTF-8"
                , "Accept": "application/json;charset=UTF-8"
            }
        }
        return request;
    }

    getListActiveShowService = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
            method: 'get'
            , url: `${this.url}/ubication/getListActiveShow/${this.account}`
            , headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        }

        return request;
    }
}

const UbicationServicesApi = new ApiClient();
export default UbicationServicesApi;