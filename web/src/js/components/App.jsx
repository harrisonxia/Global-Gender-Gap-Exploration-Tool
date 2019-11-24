import * as React from 'react'
import Header from './HeadBar.jsx'
import {Element} from 'react-scroll'
import TechStack from './TechStack.jsx'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import appStyles from '../../css/App.css'
import WindowContainer from './WindowContainer.jsx'
import {Button, Select, reset, themes, TextField} from 'react95'
import {connect} from 'react-redux'
import {
    initAreaBump,
    initCountry,
    initLineChart,
    serveLineData,
    updateYear,
    addCountry,
    resetAll,
} from '../actions/index.js'
import {yearSelection} from '../../assets/data/data.js'
import MyResponsiveAreaBump from './BumpArea.jsx'
import styles from '../../css/Window.css'
import Countries from './Countries.jsx'

const ResetStyles = createGlobalStyle`
  ${reset}
`

class App extends React.Component {
    intervalId = 0
    startYear = 1990
    endYear = 1991
    state = {
        country: '',
        show: false,
    }

    componentDidMount() {
        this.props.initCountry()
        this.props.initAreaBump()
        // this.props.initLineChart()
    }

    startTimer = () => {
        this.props.serveLineData()
    }
    startOnClick = () => {
        this.pauseOnClick()
        this.intervalId = setInterval(this.startTimer.bind(this), 500)
    }
    pauseOnClick = () => {
        clearInterval(this.intervalId)
    }
    startYearOnChange = val => {
        this.startYear = val
    }
    endYearOnChange = val => {
        this.endYear = val
    }
    updateYear = (start, end) => {
        this.props.updateYear(start, end)
    }
    handleCountryChange = val => {
        this.setState({
            country: val.target.value,
        })
    }
    getCurView = () => {
        this.setState((currentState) => ({show: !currentState.show}))
    }

    download(text) {
        let currentdate = new Date()
        let filename = 'current_data_' + currentdate.getDate() + '_'
            + (currentdate.getMonth() + 1) + '_'
            + currentdate.getFullYear() + '@'
            + currentdate.getHours() + ':'
            + currentdate.getMinutes() + ':'
            + currentdate.getSeconds() + '.json'
        let element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }

    getCurrentCountry() {
        let s = {}
        const full = this.props.overall.map(({id}) => {
            return id
        })
        const sub = this.props.overallSubset.map(({id}) => {
            return id
        })
        for (let i = 0; i < full.length; i++) {
            s[full[i]] = false
            for (let j = 0; j < sub.length; j++) {
                if (sub[j] === full[i]) {
                    s[full[i]] = true
                }
            }
        }

        return s
    }

    render() {

        // console.log(this.props.overall)
        return (
            <div styleName='appStyles.mainDiv'>
                <ResetStyles/>
                <ThemeProvider theme={themes.coldGray}>
                    <Header/>
                    <div styleName='appStyles.control'>
                        <TextField
                            value={this.country}
                            onChange={this.handleCountryChange}
                            width={50}
                        />
                        <Button onClick={() => this.props.addCountry(this.state.country)}>
                            <span>Add a country</span>
                        </Button>
                        <Countries
                            data={this.props.overall.map(({id}) => {
                                return id
                            })}
                            currentList={this.props.overallSubset.map(({id}) => {
                                return id
                            })}
                            init={this.getCurrentCountry()}
                        />
                        <div styleName='styles.buttonGroup'>
                            <Select
                                items={yearSelection}
                                onChange={this.startYearOnChange}
                                height={100}
                                width={100}
                            />
                            <Select
                                items={yearSelection.slice(1)}
                                onChange={this.endYearOnChange}
                                height={100}
                                width={100}
                            />
                        </div>
                        <div styleName='styles.buttons'>
                            <Button
                                onClick={() => this.updateYear(this.startYear, this.endYear)}
                            >
                                <span>Update Years</span>
                            </Button>
                            <Button
                                onClick={() => this.props.resetAll()}
                            >
                                <span>Reset All</span>
                            </Button>
                            {/*<Button*/}
                            {/*    onClick={() => this.getCurView()}>*/}
                            {/*    <span>{!this.state.show ? 'Get current data' : 'Hide current data'}</span>*/}
                            {/*</Button>*/}
                            <Button
                                onClick={() => this.download(this.props.overallSubset)}>
                                <span>Download Current Data</span>
                            </Button>
                        </div>
                        {/*{*/}
                        {/*    this.state.show &&*/}
                        {/*    (<div styleName='appStyles.curDate'>*/}
                        {/*        {this.props.overallSubset.map(obj => {*/}
                        {/*            console.log(obj.id)*/}
                        {/*            return (*/}
                        {/*                <div key={obj.id + 'curdatasubset'}>*/}
                        {/*                    {obj.id}:<br/>*/}
                        {/*                    {obj.data.map((x => {*/}
                        {/*                        return (*/}
                        {/*                            <div key={obj.id + x.x}>*/}
                        {/*                                <span>Year: {x.x}</span><br/>*/}
                        {/*                                <span>Data: {x.y}</span>*/}
                        {/*                            </div>*/}
                        {/*                        )*/}
                        {/*                    }))}*/}
                        {/*                </div>)*/}
                        {/*        })}*/}
                        {/*    </div>)*/}
                        {/*}*/}

                        {/*<div styleName='styles.buttonGroup'>*/}
                        {/*    <Button onClick={() => this.startOnClick()}>*/}
                        {/*        <span>Start Drawing</span>*/}
                        {/*    </Button>*/}
                        {/*    <Button onClick={() => this.pauseOnClick()}>*/}
                        {/*        <span>Pause Drawing</span>*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                    <div styleName='appStyles.mainContainer'>
                        <div styleName='appStyles.windowContainer'>
                            <Element name='intro'>
                                <div styleName='appStyles.areaBump'>
                                    <MyResponsiveAreaBump
                                        data={this.props.overallSubset}
                                    />
                                    {/*<WindowContainer*/}
                                    {/*  dataset={this.props.currentLineChart}*/}
                                    {/*  years={this.props.yearsArr}*/}
                                    {/*  currentExpChart={this.props.currentExpChart}*/}
                                    {/*/>*/}
                                </div>
                            </Element>
                        </div>

                        <div styleName='appStyles.windowContainer'>
                            <Element name='techStack'>{/* <TechStack/> */}</Element>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentLineChart: state.currentLineChart,
        currentExpChart: state.currentExpChart,
        years: state.years,
        yearsArr: state.yearsArr,
        overall: state.overall,
        overallSubset: state.overallSubset,
    }
}

export default connect(
    mapStateToProps,
    {initAreaBump, initCountry, initLineChart, serveLineData, updateYear, addCountry, resetAll},
)(App)
