// src/js/actions/index.js
import {
  ADD_ARTICLE,
  DATA_LOADED,
  INIT_LINE_CHART,
  START_TIMER,
  RESET_TIMER,
  SERVE_LINE_DATA,
  UPDATE_YEAR,
  INIT_COUNTRY,
  ADD_COUNTRY,
} from '../constants/action-types.js'
import Axios from 'axios'

export const addArticle = payload => {
  return { type: ADD_ARTICLE, payload }
}

export const getData = () => {
  return dispatch => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json })
      })
  }
}

export const initLineChart = () => {
  return dispatch => {
    return (
      Axios.get('./assets/data/expected_schooling.json')
        // .then(response => console.log(response))
        .then(json => {
          dispatch({ type: INIT_LINE_CHART, payload: json.data })
        })
    )
  }
}

export const initCountry = () => {
  return dispatch => {
    return Axios.get('./assets/data/country-mapping.json').then(json => {
      dispatch({ type: INIT_COUNTRY, payload: json.data })
    })
  }
}

export const serveLineData = () => {
  return { type: SERVE_LINE_DATA }
}

export const updateYear = (start, end) => {
  return { type: UPDATE_YEAR, start: start, end: end }
}

export const addCountry = name => {
  return { type: ADD_COUNTRY, country: name }
}
