import {LUCY_REQUEST_SERVICE} from 'modules/utils/ApiUtil';

class ApiClient {
    constructor() {
        this.url = LUCY_REQUEST_SERVICE;
        this.headerGet = {
            Accept: "application/json;charset=UTF-8"
        };
        this.headerPost = {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json;charset=UTF-8"
        };
    }

    getRequestInProcessByUserByFilter = (
        onSuccess,
        listIdStates,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
    ) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
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

        if (listIdStates !== undefined) {
            uriFilter += "&listIdStates=" + listIdStates;
        }

        if (this.idProfileUser === "4") {//como es un súper administrador hacemos un cambio a administrador para que la consulta traiga todos los datos
            this.idProfileUser = 1;
        }

        let request = {
            method: "get",
            url:
                `${this.url}/requests/getRequestInProcessByUserByFilter/${this.account}/${this.idUserSystemAccount}/${this.idProfileUser}` +
                encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

    createRequest = (
        onSucess,
        idUbicationBegin,
        idUbicationEnd,
        idTypeService,
        idAsset,
        freeAsset,
        freeAssetTime,
        idCarrierUserSystemAccount,
        moreInformation,
        nameReceived,
    ) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idCarrierUserSystemAccount !== undefined) {
            uriFilter += "?idCarrierUserSystemAccount=" + idCarrierUserSystemAccount;
        }

        if (moreInformation !== undefined) {
            var prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "moreInformation=" + moreInformation;
        }
        
        let request = {
            method: "post",
            url:
                `${this.url}/requests/create/${this.account}/${idUbicationBegin}/${idUbicationEnd}/${this.idUserSystemAccount}/${idTypeService}/${idAsset}/${freeAsset}/${freeAssetTime}` +
                encodeURI(uriFilter)+"&nameReceived="+nameReceived,
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

    /**
     * Genera la actualizacion de la solicitud
     * para guardar los datos con la edicion
     * del campo Informacion
     */
    updateRequest = (
        idUpdateRequest,
        idUbicationBegin,
        idUbicationEnd,
        idTypeService,
        idAsset,
        freeAsset,
        freeAssetTime,
        idCarrierUserSystemAccount,
        moreInformation,
        nameReceived,
    ) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idCarrierUserSystemAccount !== undefined) {
            uriFilter += "?idCarrierUserSystemAccount=" + idCarrierUserSystemAccount;
        }

        if (moreInformation !== undefined) {
            var prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "moreInformation=" + moreInformation;
        }

        let request = {
            method: "post",
            url:
                `${this.url}/requests/update/${idUpdateRequest}/${this.account}/${idUbicationBegin}/${idUbicationEnd}/${this.idUserSystemAccount}/${idTypeService}/${idAsset}/${freeAsset}/${freeAssetTime}`+
                encodeURI(uriFilter)+"&nameReceived="+nameReceived,
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };


    /**
     * URL para aceptar una solicitud que se le ha asignado
     * al operador
     */
    carrierAcceptsAssignment = (
        onSuccess, idRequest, idUserSystemAccount
    ) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idRequest !== undefined) {
            uriFilter += "?idRequest=" + idRequest;
        }

        if (idUserSystemAccount !== undefined) {
            var prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idUserSystemAccount=" + idUserSystemAccount;
        }

        let request = {
            method: "put",
            url:
                `${this.url}/requests/carrierAcceptsAssignment/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

    /**
     * Genera la url para consumir el servicio que permite
     * a un operador rechazar una asignación
     * realizada
     */
    carrierRejectsAssignment = (
        onSuccess, idRequest, idUserSystemAccount, idTypeReject
    ) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idRequest !== undefined) {
            uriFilter += "?idRequest=" + idRequest;
        }
        var prefix = "&";
        if (idUserSystemAccount !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idUserSystemAccount=" + idUserSystemAccount;
        }

        if (idTypeReject !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idTypeReject=" + idTypeReject;
        }

        let request = {
            method: "put",
            url:
                `${this.url}/requests/carrierRejectsAssignment/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

    /**
     * Genera la url para consumir el servicio, que
     * permite realizar la cancelación de un servicio
     */
    cancelRequest = (onSuccess, idRequest, idTypeCancellation) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idRequest !== undefined) {
            uriFilter += "?idRequest=" + idRequest;
        }
        var prefix = "&";
        if (this.idUserSystemAccount !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idUserSystemAccount=" + this.idUserSystemAccount;
        }

        if (idTypeCancellation !== undefined) {
            prefix = "&";
            if (uriFilter.length < 1) {
                prefix = "?"
            }
            uriFilter += prefix + "idTypeCancellation=" + idTypeCancellation;
        }

        let request = {
            method: "put",
            url:
                `${this.url}/requests/cancel/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

    /**
     * Url para iniciar con una solicitud
     */
    startRequest = (onSuccess, idRequest) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idRequest !== undefined) {
            uriFilter += "?idRequest=" + idRequest;
        }

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
                `${this.url}/requests/manualStart/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };


    /**
     *
     */
    endRequest = (onSuccess, idRequest) => {
        this.account = sessionStorage["accountCode"];
        this.idUserSystemAccount = sessionStorage["userAccountId"];
        this.idProfileUser = sessionStorage["userAccountProfileId"];
        var uriFilter = "";

        if (idRequest !== undefined) {
            uriFilter += "?idRequest=" + idRequest;
        }

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
                `${this.url}/requests/manualEnd/${this.account}` + encodeURI(uriFilter),
            headers: {
                Accept: "application/json;charset=UTF-8"
            }
        };
        return request;
    };

}

const RequestApiClient = new ApiClient();
export default RequestApiClient;
