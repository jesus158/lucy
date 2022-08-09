import { LUCY_CONFIGURATION_SERVICE } from 'modules/utils/ApiUtil.js';
class ApiClient {

   constructor() {
      this.url = LUCY_CONFIGURATION_SERVICE;
   }

   /**************************************
    * TIME_ALERT_SERVICE_WITHOUT_CARRIER *
    **************************************/

   getTimeAlertServiceWithoutCarrier = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/timeAlertServiceWithoutCarrier/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureTimeAlertServiceWithoutCarrier = (typeAbsence) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/timeAlertServiceWithoutCarrier/createUpdate/${this.account}`
         , data: typeAbsence
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveTimeAlertServiceWithoutCarrier = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/timeAlertServiceWithoutCarrier/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }


   /*******************************
    * TIME_ALERT_FINALIZE_REQUEST *
    *******************************/

   getTimeAlertFinalizeRequest = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/timeAlertFinalizeRequest/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureTimeAlertFinalizeRequest = (timeAlertFinalizeRequest) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/timeAlertFinalizeRequest/createUpdate/${this.account}`
         , data: timeAlertFinalizeRequest
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveTimeAlertFinalizeRequest = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/timeAlertFinalizeRequest/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }


   /*********************************
    * TIME_ALERT_CARRIER_INACTIVITY *
    *********************************/

   getTimeAlertCarrierInactivity = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/timeAlertCarrierInactivity/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureTimeAlertCarrierInactivity = (typeAbsence) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/timeAlertCarrierInactivity/createUpdate/${this.account}`
         , data: typeAbsence
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveTimeAlertCarrierInactivity = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/timeAlertCarrierInactivity/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }


   /******************************************
   * NUMBER_ATTENTIONS_HIGH_PRIORITY_WAITING *
   *******************************************/

   getNumberAttentionsHighPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/numberAttentionsHighPriorityWaiting/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureNumberAttentionsHighPriorityWaiting = (numberAttentionsHighPriorityWaiting) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/numberAttentionsHighPriorityWaiting/createUpdate/${this.account}`
         , data: numberAttentionsHighPriorityWaiting
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveNumberAttentionsHighPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/numberAttentionsHighPriorityWaiting/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   /*********************************************
    * NUMBER_ATTENTIONS_MEDIUM_PRIORITY_WAITING *
    *********************************************/

   getNumberAttentionsMediumPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/numberAttentionsMediumPriorityWaiting/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureNumberAttentionsMediumPriorityWaiting = (numberAttentionsMediumPriorityWaiting) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/numberAttentionsMediumPriorityWaiting/createUpdate/${this.account}`
         , data: numberAttentionsMediumPriorityWaiting
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveNumberAttentionsMediumPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/numberAttentionsMediumPriorityWaiting/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   /*******************************************
     * NUMBER_ATTENTIONS_LOW_PRIORITY_WAITING *
     ******************************************/

   getNumberAttentionsLowPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];

      let request = {
         method: 'get'
         , url: `${this.url}/numberAttentionsLowPriorityWaiting/get/${this.account}`
         , headers: {
            "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   configureNumberAttentionsLowPriorityWaiting = (numberAttentionsLowPriorityWaiting) => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'post'
         , url: `${this.url}/numberAttentionsLowPriorityWaiting/createUpdate/${this.account}`
         , data: numberAttentionsLowPriorityWaiting
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

   inactiveNumberAttentionsLowPriorityWaiting = () => {
      this.account = sessionStorage["accountCode"];
      let request = {
         method: 'delete'
         , url: `${this.url}/numberAttentionsLowPriorityWaiting/delete/${this.account}`
         , headers: {
            "Content-Type": "application/json;charset=UTF-8"
            , "Accept": "application/json;charset=UTF-8"
         }
      }

      return request;
   }

}

const GeneralParametersApi = new ApiClient();
export default GeneralParametersApi;