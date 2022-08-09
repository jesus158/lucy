import { GET_MAP, GET_MAP_ERROR, GET_MAP_SUCCESS } from "modules/locations/map/MapActions.js";

const initialState = {
    data: {
        isActivityIndicatorShown: false,
        apiPagination: {},
        matrixZoneUbication: [[null]],
    }
};

const addNewCells = (mat) => {
    if (mat === undefined) {
        mat = [[null]];
    }
    if (mat === null) {
        mat = [[null]];
    }
    if (mat === []) {
        mat = [[null]];
    }
    try {
        var posRow = 0;
        var lenRow = mat.length;
        while (posRow < lenRow) {
            var lenCol = mat[posRow].length;
            var posCol = 0;
            while (posCol < lenCol) {
                try {
                    if (mat[posRow][posCol].matrixFloor !== undefined) {
                        mat[posRow][posCol].matrixFloor = addNewCells(mat[posRow][posCol].matrixFloor);
                    }
                    if (mat[posRow][posCol].matrixFloor === null || mat[posRow][posCol].matrixFloor === undefined) {
                        mat[posRow][posCol].matrixFloor = [[null, null], [null, null]];
                    }
                } catch (exloca) { }

                try {
                    if (mat[posRow][posCol].matrixUbication !== undefined) {
                        mat[posRow][posCol].matrixUbication = addNewCells(mat[posRow][posCol].matrixUbication);
                    }
                    if (mat[posRow][posCol].matrixUbication === null || mat[posRow][posCol].matrixUbication === undefined) {
                        mat[posRow][posCol].matrixUbication = [[null, null], [null, null]];
                    }
                } catch (exLocal) { }
                posCol++;
            }
            posRow++;
        }
    } catch (exception) {

    }
    try {

        mat.forEach((localMat) => {
            localMat.push(null);
        })
        var len = mat[0].length;
        var pos = 0;
        var cols = [];
        while (pos < len) {
            cols.push(null);
            pos++;
        }
        mat.push(cols);
        return mat;
    } catch (ex) {
        return mat;
    }
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MAP:
            return {
                ...state,
                isActivityIndicatorShown: true
            };

        case GET_MAP_SUCCESS:
            return {
                ...state,
                matrixZoneUbication: addNewCells(action.matrixZoneUbication),
                isActivityIndicatorShown: false
            };

        case GET_MAP_ERROR:
            return {
                ...state,
                isActivityIndicatorShown: false
            };

        default:
            return state;
    }
};

export default mapReducer;
