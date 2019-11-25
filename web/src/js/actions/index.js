// src/js/actions/index.js
import {
    UPDATE_YEAR,
    INIT_COUNTRY,
    ADD_COUNTRY,
    INIT_AREA_BUMP,
    UPDATE_VIEW,
    RESET_ALL,
    REMOVE_ALL,
} from '../constants/action-types.js'
import Axios from 'axios'

export const loadData = (file) => {
    return dispatch => {
        return Axios.get('./assets/data/'+file+'.json').then(json => {
            dispatch({type: INIT_AREA_BUMP, payload: json.data, file: file})
        })
    }
}

export const initCountry = () => {
    return dispatch => {
        return Axios.get('./assets/data/country-mapping.json').then(json => {
            dispatch({type: INIT_COUNTRY, payload: json.data})
        })
    }
}

export const updateYear = (start, end) => {
    return {type: UPDATE_YEAR, start: start, end: end}
}

export const addCountry = name => {
    return {type: ADD_COUNTRY, country: name}
}

export const updateView = (name, value) => {
    return {type: UPDATE_VIEW, country: name, value: value}
}

export const resetAll = () => {
    return {type: RESET_ALL}
}

export const removeAll = () => {
    return {type: REMOVE_ALL}
}