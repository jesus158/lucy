import { LUCY_ACCOUNT_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

    constructor() {
       this.url = LUCY_ACCOUNT_SERVICE;
    }


    filterAccount = (apiPaginationAction
                , apiPaginationCurrentPage
                , apiPaginationDirection
                , apiPaginationLimit
                , apiPaginationOrderColumn
                , apiPaginationMoveToPage
                , apiPaginationFilter) => {
        
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
           , url: `${this.url}/account/getByFilter`+ encodeURI(uriFilter)
           , headers: {
              "Accept": "application/json;charset=UTF-8"
            }
         }
  
         return request;
     }

     fetchAllAccount = () => {

            var uriFilter = '';

            uriFilter += '?ApiPaginationAction=0';
            uriFilter += '&ApiPaginationDirection=0'
            uriFilter += '&ApiPaginationLimit=10000' 
            uriFilter += '&ApiPaginationOrderColumn=3' 

            let request = {
            method: 'get'
            , url: `${this.url}/account/getByFilter`+ encodeURI(uriFilter)
            , headers: {
                "Accept": "application/json;charset=UTF-8"
                }
            }

            return request;
    }

     configureAccount = (account) => {
        let request = {
           method: 'post'
           , url: `${this.url}/account/createUpdate`
           , data: account
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
  
         return request;
     }

     getAccountById = (id) => {

        let request = {
           method: 'get'
           , url: `${this.url}/account/getById?accountId=${id}`
           , headers: {
              "Accept": "application/json;charset=UTF-8"
            }
         }
  
         return request;
     }

     inactiveAccount = (id) => {  
        let request = {
           method: 'delete'
           , url: `${this.url}/account/delete?accountId=${id}`
           , headers: {
              "Content-Type": "application/json;charset=UTF-8"
              ,"Accept": "application/json;charset=UTF-8"
            }
         }
  
         return request;
     }

     getListCostCenter = () => {
        this.account = sessionStorage["accountCode"];
        let request = {
           method: 'get'
           ,url:`${this.url}/account/getListCostCenter/${this.account}`
           , headers: {
              "Accept": "application/json;charset=UTF-8"
            }
         }
         return request;
     }
     
}

const AccountApi = new ApiClient();
export default AccountApi;