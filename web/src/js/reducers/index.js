// src/js/reducers/index.js
import {
    INIT_LINE_CHART,
    INIT_EXP_CHART,
    SERVE_LINE_DATA,
    UPDATE_YEAR,
    INIT_COUNTRY,
    ADD_COUNTRY,
    INIT_AREA_BUMP,
    RESET_ALL,
} from '../constants/action-types.js'
import {yearSelection, years} from '../../assets/data/data.js'
import {UPDATE_VIEW} from '../constants/action-types'

const initialState = {
    articles: [],
    remoteArticles: [],
    lineChart: [],
    currentLineChart: [],
    expChart: [],
    currentExpChart: [
        {
            label: 'CAN',
            data: [0],
        },
    ],
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
    overall: [{
        'id': 'CAN',
        'data': [
            {
                'x': 1,
                'y': 1,
            },
        ],
    }],
    overallSubset: [{
        'id': 'CAN',
        'data': [
            {
                'x': 1,
                'y': 1,
            },
        ],
    }],
}

const updateYears = (dataset, start, end) => {
    return dataset.map(obj => {
        return {
            'id': obj.id,
            'data': obj.data.filter(yearObj => yearObj.x >= start && yearObj.x <= end),
        }
    })
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
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
        case INIT_EXP_CHART:
            init = []
            // console.log(action.payload)
            pay = action.payload.data
            pay.forEach(obj => {
                if (state.currentCountries[obj.label]) {
                    init.push({
                        label: obj.label,
                        data: [],
                    })
                }
            })
            return Object.assign({}, state, {
                expChart: action.payload.data,
                currentExpChart: init,
            })
        case SERVE_LINE_DATA:
            if (state.timer !== 29) {
                let prev = [...state.currentLineChart]
                let prev_exp = [...state.currentExpChart]
                prev.forEach(ele => {
                    let found = state.lineChart.find(obj => {
                        return obj.label === ele.label
                    })
                    if (found) ele.data.push(found.data[state.timer])
                })

                prev_exp.forEach(ele => {
                    let found = state.expChart.find(obj => {
                        return obj.label === ele.label
                    })
                    if (found) ele.data.push(found.data[state.timer])
                })
                return Object.assign({}, state, {
                    timer: state.timer + 1,
                    currentLineChart: prev,
                    currentExpChart: prev_exp,
                })
            }
            return state
        case UPDATE_YEAR:
            // state.overallSubset
            return Object.assign({}, state, {
                overallSubset: updateYears(state.overallSubset, action.start, action.end)
            })
        case INIT_COUNTRY:
            return Object.assign({}, state, {
                countries: action.payload,
            })
        case INIT_AREA_BUMP:
            return Object.assign({}, state, {
                overall: action.payload,
                overallSubset: action.payload,
            })
        case UPDATE_VIEW:
            let subset
            if (action.value === false) {
                subset = state.overallSubset.filter(obj => obj.id !== action.country)
            } else {
                let found = state.overall.find(obj => obj.id === action.country)
                subset = Array.from(state.overallSubset)
                subset.push(found)
            }
            return Object.assign({}, state, {
                overallSubset: subset,
            })
        case RESET_ALL:
            return Object.assign({}, state, {
                overallSubset: state.overall,
            })
        case ADD_COUNTRY:
            if (
                !state.currentCountries[action.country] &&
                state.countries[action.country]
            ) {
                let obj = Object.assign({}, state.currentCountries)
                let line = state.currentLineChart.slice()
                let exp = state.currentExpChart.slice()
                let curLen = state.currentLineChart[0].data.length
                let prev_data = state.lineChart.find(ele => {
                    // console.log(ele)
                    return ele.label === action.country
                })

                // console.log(prev_data.data)
                prev_data = prev_data.data.slice(0, curLen)
                // console.log(prev_data)
                let prev_exp_data = state.expChart
                    .find(ele => {
                        // console.log(ele)
                        return ele.label === action.country
                    })
                    .data.slice(0, curLen)
                line.push({
                    label: action.country,
                    data: prev_data,
                })
                exp.push({
                    label: action.country,
                    data: prev_exp_data,
                })

                obj[action.country] = state.countries[action.country]
                // console.log(state.currentLineChart)

                return Object.assign({}, state, {
                    currentCountries: obj,
                    currentLineChart: line,
                    currentExpChart: exp,
                })
            }
        // fallback to default elsewise
        default:
            return state
    }
}

export default rootReducer
