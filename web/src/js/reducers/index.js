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
    REMOVE_ALL,
} from '../constants/action-types.js'
import {yearSelection, years, defaultCountry} from '../../assets/data/data.js'
import {UPDATE_VIEW} from '../constants/action-types'
import {ifElse} from 'ramda'

const initialState = {
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
    currentData: 'Loading..',
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
                overallSubset: updateYears(state.overall, action.start, action.end)
            })
        case INIT_COUNTRY:
            return Object.assign({}, state, {
                countries: action.payload,
            })
        case INIT_AREA_BUMP:
            const payloadSubset = action.payload.filter(obj => defaultCountry.includes(obj.id))
            let cur = ''
            if (action.file === 'expected_years_of_schooling')
                cur = 'Expected Years of Schooling (years)'
            else if (action.file === 'mortality_rate')
                cur = 'Female Adult Mortality Rate (per 1,000 people)'
            else if (action.file === 'seats_in_parliament')
                cur = 'Share of seats in parliament (% held by women)'
            else if (action.file === 'senior_and_middle_management')
                cur = 'Female share of employment in senior and middle management(%)'
            return {
                ...state,
                raw: action.payload,
                overall: payloadSubset,
                overallSubset: payloadSubset,
                currentData: cur,
            }
        case REMOVE_ALL:
            return {
                ...state,
                overall: [],
                overallSubset: [],
            }
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
            if (!state.overall.some(e => e.id === action.country)) {
                const found = state.raw.filter(obj => obj.id === action.country)
                if (found.length > 0) {
                    return {
                        ...state,
                        overall: [...state.overall, found[0]],
                        overallSubset: [...state.overallSubset, found[0]]
                    }
                } else {
                    console.log('not found')
                }
            }
            return state
        // fallback to default elsewise
        default:
            return state
    }
}

export default rootReducer
