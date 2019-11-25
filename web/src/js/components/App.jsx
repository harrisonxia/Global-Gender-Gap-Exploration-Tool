import * as React from 'react'
import Header from './HeadBar.jsx'
import {Element} from 'react-scroll'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import appStyles from '../../css/App.css'
import {
    Radio,
    Toolbar,
    Divider,
    Button,
    Select,
    reset,
    themes,
    TextField,
    WindowHeader,
    WindowContent,
    Fieldset,
    Window,
} from 'react95'
import {connect} from 'react-redux'
import {
    loadData,
    initCountry,
    initLineChart,
    serveLineData,
    updateYear,
    addCountry,
    resetAll,
    removeAll,
} from '../actions/index.js'
import {yearSelection} from '../../assets/data/data.js'
import AreaBump from './BumpArea.jsx'
import styles from '../../css/Window.css'
import Countries from './Countries.jsx'
import Map from './Map.jsx'
import Bullet from './Bullet.jsx'

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
        this.props.loadData('expected_years_of_schooling')
    }
    startTimer = () => {
        this.props.serveLineData()
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
        return (
            <div styleName='appStyles.mainDiv'>
                <ResetStyles/>
                <ThemeProvider theme={themes.coldGray}>
                    <Header/>
                    <div styleName='appStyles.control'>
                        <Countries
                            data={this.props.overall.map(({id}) => {
                                return id
                            })}
                            currentList={this.props.overallSubset.map(({id}) => {
                                return id
                            })}
                            init={this.getCurrentCountry()}
                            styleName='styles.elementMargin'
                        />
                        <Divider styleName='styles.divider'/>
                        <div styleName='styles.addCountry'>
                            <TextField
                                value={this.country}
                                onChange={this.handleCountryChange}
                                width={175}
                                styleName='styles.elementMargin'
                            />
                            <Button
                                styleName='styles.elementMargin'
                                onClick={() => this.props.addCountry(this.state.country)}
                            >
                                <span>Add a country</span>
                            </Button>
                        </div>
                        <Divider styleName='styles.divider'/>
                        <div styleName='styles.yearSel'>
                            <div styleName='styles.buttonGroup'>
                                <Select
                                    items={yearSelection}
                                    onChange={this.startYearOnChange}
                                    height={100}
                                    width={85}
                                />
                                <Select
                                    items={yearSelection.slice(1)}
                                    onChange={this.endYearOnChange}
                                    height={100}
                                    width={85}
                                />
                            </div>
                            <Button
                                onClick={() => this.updateYear(this.startYear, this.endYear)}
                            >
                                <span>Update Years</span>
                            </Button>
                        </div>
                        <Divider styleName='styles.divider'/>
                        <div styleName='styles.buttons'>
                            <Button
                                onClick={() => this.props.loadData('expected_years_of_schooling')}
                            >
                                <span>Reset All</span>
                            </Button>
                            <Button
                                onClick={() => this.props.removeAll()}>
                                <span>Remove All Countries</span>
                            </Button>
                            <Button
                                onClick={() => this.download(this.props.overallSubset)}>
                                <span>Download Current Data</span>
                            </Button>
                        </div>
                    </div>
                    <div styleName='appStyles.rightPanel'>
                        Currently viewing:<br/>
                        <span styleName='appStyles.currentViewing'>{this.props.currentData}</span>
                    </div>
                    <div styleName='appStyles.mainContainer'>
                        <div styleName='appStyles.windowContainer'>
                            <Element name='intro'>
                                <Window styleName='styles.windowSpacing'>
                                    <WindowHeader styleName='styles.windowHeader'>🌍 Map</WindowHeader>
                                    <WindowContent>
                                        <Fieldset label='Click on the map to add a country to create your own view.'>
                                            <span>Different colors represent different countries.</span>
                                            <div styleName='appStyles.areaBump'>
                                                <Map/>

                                            </div>
                                        </Fieldset>
                                    </WindowContent>
                                </Window>
                            </Element>
                        </div>

                        <div styleName='appStyles.windowContainerBullet'>
                            <Element name='bullet'>
                                <Window styleName='styles.windowSpacing'>
                                    <WindowHeader styleName='styles.windowHeader'>📊 The 25th, 50th, 75th percentile and average </WindowHeader>
                                    <WindowContent>
                                        <Fieldset
                                            label='Three types of shade display the 25th, 50th, and 75th percentile of current selection of countries. Red marker shows the average.'>
                                            <div styleName='appStyles.bullet'>
                                                <Bullet/>
                                            </div>
                                        </Fieldset>
                                    </WindowContent>
                                </Window>
                            </Element>
                        </div>

                        <div styleName='appStyles.windowContainer'>
                            <Element name='areaBump'>
                                <Window styleName='styles.windowSpacing'>
                                    <WindowHeader styleName='styles.windowHeader'>🏆 Year-over-year
                                        Ranking </WindowHeader>
                                    <WindowContent>
                                        <Fieldset label='AreaBump'>
                                            <div styleName='appStyles.areaBump'>
                                                <AreaBump
                                                    data={this.props.overallSubset}
                                                />
                                            </div>
                                        </Fieldset>
                                    </WindowContent>
                                </Window>
                            </Element>
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
        currentData: state.currentData,
    }
}

export default connect(
    mapStateToProps,
    {loadData, initCountry, initLineChart, serveLineData, updateYear, addCountry, resetAll, removeAll},
)(App)
