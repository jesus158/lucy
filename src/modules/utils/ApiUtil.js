const apiTimeout = 60000;
/** 
 * PRODUCTION API'S
 */

// const LUCY_LOCATION_SERVICE = "http://44.227.228.174:8080/lucy-locations-services";
// const LUCY_ACCOUNT_SERVICE = "http://44.227.228.174:8080/lucy-account-services";
// const LUCY_CONFIGURATION_SERVICE = "http://44.227.228.174:8080/lucy-configuration-services";
// const LUCY_REQUEST_SERVICE = "http://44.227.228.174:8080/lucy-requests-services";
// const LUCY_REPORT_SERVICE = "http://44.227.228.174:8080/lucy-reports-services";



/**
 * TEST API'S
 */

const URL_BASE = "http://44.227.228.174:8080";

const LUCY_LOCATION_SERVICE = URL_BASE+"/lucy-locations-services-dev";
const LUCY_ACCOUNT_SERVICE = URL_BASE+"/lucy-account-services";
const LUCY_CONFIGURATION_SERVICE = URL_BASE+"/lucy-configuration-services-dev";
const LUCY_REQUEST_SERVICE = URL_BASE+"/lucy-requests-services-dev";
const LUCY_REPORT_SERVICE = URL_BASE+"/lucy-reports-services-dev";


//const URL_BASE = (window.location.protocol.startsWith('https') ? 'https':'http')+"://"+window.location.hostname+":"+window.location.port;
// const URL_BASE = 'http://44.227.228.174:8080';

// const LUCY_LOCATION_SERVICE = URL_BASE+"/lucy-locations-services";
// const LUCY_ACCOUNT_SERVICE = URL_BASE+"/lucy-account-services";
// const LUCY_CONFIGURATION_SERVICE = URL_BASE+"/lucy-configuration-services";
// const LUCY_REQUEST_SERVICE = URL_BASE+"/lucy-requests-services";
// const LUCY_REPORT_SERVICE = URL_BASE+"/lucy-reports-services";



/**
 * LOCALHOST DEVELOPMENT API'S LEANDRO
 */

// const URL_BASE = "http://localhost:8080";

// const LUCY_LOCATION_SERVICE = URL_BASE+"/lucy-locations-services";
// const LUCY_ACCOUNT_SERVICE = "http://44.227.228.174:8080" +"/lucy-account-services";
// const LUCY_CONFIGURATION_SERVICE = URL_BASE+"/lucy-configuration-services";
// const LUCY_REQUEST_SERVICE = URL_BASE+"/lucy-requests-services";
// const LUCY_REPORT_SERVICE = URL_BASE+"/lucy-reports-services";



/**
 * LOCALHOST DEVELOPMENT API'S
 */

//const LUCY_LOCATION_SERVICE = "http://localhost:8081/lucy-locations-services";

/*const LUCY_LOCATION_SERVICE = "http://44.227.228.174:8080/lucy-locations-services-dev";
const LUCY_ACCOUNT_SERVICE = "http://localhost:8081/lucy-account-services";
const LUCY_CONFIGURATION_SERVICE = "http://localhost:8084/lucy-configuration-services";
const LUCY_REQUEST_SERVICE = "http://localhost:8082/lucy-requests-services";
const LUCY_REPORT_SERVICE = "http://localhost:8083/lucy-reports-services";*/

/*const LUCY_LOCATION_SERVICE = "http://192.168.1.72:8080/lucy-locations-services";
const LUCY_ACCOUNT_SERVICE = "http://192.168.1.72:8080/lucy-account-services";
const LUCY_CONFIGURATION_SERVICE = "http://192.168.1.72:8080/lucy-configuration-services";
const LUCY_REQUEST_SERVICE = "http://192.168.1.72:8081/lucy-requests-services";
const LUCY_REPORT_SERVICE = "http://192.168.1.72:8080/lucy-reports-services";
*/



// ---------------------------------------------pre_prod----------------------------------------------------------------
/*const LUCY_LOCATION_SERVICE = "http://201.184.163.99:83/lucy-locations-services";
const LUCY_ACCOUNT_SERVICE = "http://201.184.163.99:83/lucy-account-services";
const LUCY_CONFIGURATION_SERVICE = "http://201.184.163.99:83/lucy-configuration-services";
const LUCY_REQUEST_SERVICE = "http://201.184.163.99:83/lucy-requests-services";
const LUCY_REPORT_SERVICE = "http://201.184.163.99:83/lucy-reports-services";*/
// -------------------------------------------END_pre_prod--------------------------------------------------------------


const ADMIN = 1;
const MILI_SECONDS_REFRESH_LIST = 10000;
const MILI_SECONDS_REFRESH_TRACKING = 5000;
const MILI_SECONDS_REFRESH_LIST_CARRIERS = 5000;
const ROW_GRAY = '#f7f7f7';
const ROW_WHITE = '#ffffff';
const NAME_OPERATOR = "operador";
const NAME_OPERATOR_TITLE = "Operador";
const BEACON_NAME = 'TAG de localización';
const GATEWAY_NAME = 'TAG de zona';
const PATTERN_BEACONS = "[a-zA-Z0-9 \\:\\-]";
const PATTERN_LETTERS = "[a-zA-Z]";
const PATTERN_NUMEROS = "[0-9]";
const PATTERN_LETTERS_NUMEROS = "[a-zA-Z0-9]";
const PATTERN_TEXTOS = "[áéíóúüÁÉÍÓÚÜñÑa-zA-Z ]";
const PATTERN_TEXTOS_NUMEROS = "[áéíóúüÁÉÍÓÚÜñÑa-zA-Z0-9 ]";
const PATTERN_TEXTOS_NUMEROS_CARACTERES = "[áéíóúüÁÉÍÓÚÜñÑa-zA-Z0-9 \\.\\(\\)\\;\\:\\,\\-\\?\\¿\\@]";
const PATTERN_PHONE_EXTENSIONS = "[+áéíóúüÁÉÍÓÚÜñÑ˜´a-zA-Z0-9 ]";
const PATTERN_EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * toma un texto y el patrón permitido para el texto y retorna
 * un texto con solo los caracteres que son permitidos
 * @param {*} dataActual 
 * @param {*} pattern 
 */
const utilConverTextToPattern = (dataActual, pattern) => {
    var permited = "";
    try {
        if (pattern !== undefined) {
            if (pattern !== "") {
                let regex = new RegExp(pattern);

                for (let i = 0; i < dataActual.length; i++) {
                    if (regex.test(dataActual[i])) {
                        permited += dataActual[i];
                    }
                }
            } else {
                permited = dataActual;
            }
        } else {
            permited = dataActual;
        }
    } catch (except) {}
    return permited;
}


//import { MILI_SECONDS_REFRESH_LIST,ROW_GRAY,ROW_WHITE } from "modules/utils/ApiUtil.js";
module.exports = {
    apiTimeout,
    LUCY_LOCATION_SERVICE,
    LUCY_ACCOUNT_SERVICE,
    LUCY_CONFIGURATION_SERVICE,
    LUCY_REQUEST_SERVICE,
    LUCY_REPORT_SERVICE,
    ADMIN,
    MILI_SECONDS_REFRESH_LIST,
    ROW_GRAY,
    ROW_WHITE,
    PATTERN_BEACONS,
    PATTERN_LETTERS,
    PATTERN_NUMEROS,
    PATTERN_LETTERS_NUMEROS,
    PATTERN_TEXTOS_NUMEROS,
    PATTERN_TEXTOS_NUMEROS_CARACTERES,
    PATTERN_EMAIL,
    PATTERN_TEXTOS,
    PATTERN_PHONE_EXTENSIONS,
    utilConverTextToPattern,
    MILI_SECONDS_REFRESH_TRACKING,
    MILI_SECONDS_REFRESH_LIST_CARRIERS,
    NAME_OPERATOR,
    NAME_OPERATOR_TITLE,
    BEACON_NAME,
    GATEWAY_NAME,
};
