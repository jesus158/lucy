import {
   LUCY_ACCOUNT_SERVICE
} from 'modules/utils/ApiUtil.js';
class ApiClient {

   constructor() {
      this.url = LUCY_ACCOUNT_SERVICE;;
   }

   filterUser = (apiPaginationAction, apiPaginationCurrentPage, apiPaginationDirection, apiPaginationLimit, apiPaginationOrderColumn, apiPaginationMoveToPage, apiPaginationFilter) => {

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
         url: `${this.url}/user/getByFilter/${this.account}/` + encodeURI(uriFilter),
         headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   /**
    * Crear o editar un usuario
    */
   configureUser = (user) => {
      let request = {
         method: 'post',
         url: `${this.url}/user/createUpdate`,
         data: user,
         headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   getUserById = (id) => {

      let request = {
         method: 'get',
         url: `${this.url}/user/getById?userSystemId=${id}`,
         headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   getUserByEmail = (email) => {
      let request = {
         method: 'get',
         url: `${this.url}/user/getByEmail?userSystemEmail=${email}`,
         headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }
      return request;
   }

   inactiveUser = (id) => {
      let request = {
         method: 'delete',
         url: `${this.url}/user/delete?userId=${id}`,
         headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   loginUser = (userLogin, byToken, token) => {
      if (byToken === true) {
         return {
            method: 'post',
            url: `${this.url}/access/login${token}`,
            headers: {
               "Content-Type": "application/json;charset=UTF-8",
               "Accept": "application/json;charset=UTF-8"
            }
         }
      } else {
         return {
            method: 'post',
            url: `${this.url}/access/login`,
            data: userLogin,
            headers: {
               "Content-Type": "application/json;charset=UTF-8",
               "Accept": "application/json;charset=UTF-8"
            }
         }
      }
   }

   getListTypeIdentification = () => {

      let request = {
         method: 'get',
         url: `${this.url}/user/getListActiveTypeIdentification`,
         headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   getListTypeProfile = () => {

      let request = {
         method: 'get',
         url: `${this.url}/user/getListActiveProfile`,
         headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   sendEmailRememberAccess = (email) => {
      let request = {
         method: 'post',
         url: `${this.url}/user/sendDataAccessByEmail?userEmail=` + encodeURI(email),
         headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

}
const UserApi = new ApiClient();
export default UserApi;