// src/js/reducers/index.js
import {
  ADD_ARTICLE,
  ADD_USER_PROFILE,
  DATA_LOADED,
  INIT_LINE_CHART,
  SERVE_LINE_DATA,
  UPDATE_YEAR,
  INIT_COUNTRY,
  ADD_COUNTRY,
} from '../constants/action-types.js'
import { yearSelection, years } from '../../assets/data/data.js'

const initialState = {
  articles: [],
  remoteArticles: [],
  lineChart: [],
  currentLineChart: [],
  timer: 0,
  years: yearSelection,
  yearsArr: years,
  countries: [],
  currentCountries: {
    USA: {
      iso2CountryCode: 'US',
      countryName: 'United States of America',
      isoNumericCountryCode: '840',
    },
    GBR: {
      iso2CountryCode: 'GB',
      countryName: 'United Kingdom',
      isoNumericCountryCode: '826',
    },
    CHN: {
      iso2CountryCode: 'CN',
      countryName: 'China',
      isoNumericCountryCode: '156',
    },
    CAN: {
      iso2CountryCode: 'CA',
      countryName: 'Canada',
      isoNumericCountryCode: '124',
    },
  },
}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload),
      })
    case DATA_LOADED:
      return Object.assign({}, state, {
        remoteArticles: state.remoteArticles.concat(action.payload),
      })
    case INIT_LINE_CHART:
      let init = []
      // console.log(action.payload)
      let pay = action.payload.data
      pay.forEach(obj => {
        if (state.currentCountries[obj.label]) {
          init.push({
            label: obj.label,
            data: [],
          })
        }
      })
      return Object.assign({}, state, {
        lineChart: action.payload.data,
        currentLineChart: init,
      })
    case SERVE_LINE_DATA:
      let prev = [...state.currentLineChart]
      prev.forEach((ele, index) => {
        let val = state.lineChart[index].data[state.timer]
        if (val !== undefined)
          ele.data.push(state.lineChart[index].data[state.timer])
      })
      return Object.assign({}, state, {
        timer: state.timer + 1,
        currentLineChart: prev,
      })
    case UPDATE_YEAR:
      let yearAr = Array(action.end - action.start + 1)
        .fill()
        .map((v, i) => i + 1990)
      let updatedYears = []
      yearAr.map(val => [
        updatedYears.push({
          label: val,
          value: val,
        }),
      ])
      return Object.assign({}, state, {
        years: updatedYears,
        yearsArr: yearAr,
      })
    case INIT_COUNTRY:
      return Object.assign({}, state, {
        countries: action.payload,
      })
    case ADD_COUNTRY:
      if (
        !state.currentCountries[action.country] &&
        state.countries[action.country]
      ) {
        let obj = Object.assign({}, state.currentCountries)
        let line = state.currentLineChart.slice()
        let curLen = state.currentLineChart[0].data.length
        let prev_data = state.lineChart
          .find(ele => {
            // console.log(ele)
            return ele.label === action.country
          })
          .data.slice(curLen)
        // console.log(prev_data)
        line.push({
          label: action.country,
          data: curLen === 0 ? [] : prev_data,
          // data:
        })
        obj[action.country] = state.countries[action.country]
        // console.log(state.currentLineChart)

        return Object.assign({}, state, {
          currentCountries: obj,
          currentLineChart: line,
        })
      }
    // fallback to default elsewise
    default:
      return state
  }
}
export default rootReducer
