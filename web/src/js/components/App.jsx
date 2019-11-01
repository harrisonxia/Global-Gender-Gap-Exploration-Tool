import * as React from 'react'
import Header from './HeadBar.jsx'
import Intro from './Window.jsx'
import Experience from './WindowWithTab.jsx'
import Project from './Project.jsx'
import UrlList from './UrlList.jsx'
import { Element } from 'react-scroll'
import TechStack from './TechStack.jsx'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import appStyles from '../../css/App.css'
import WindowContainer from './WindowContainer.jsx'
import { Button, Select, reset, themes, TextField } from 'react95'
import BrushLine from './BrushLineChart.jsx'
import { connect } from 'react-redux'
import {
  initCountry,
  initLineChart,
  serveLineData,
  updateYear,
  addCountry,
} from '../actions/index.js'
import { yearSelection } from '../../assets/data/data.js'
import styles from '../../css/Window.css'
const ResetStyles = createGlobalStyle`
  ${reset}
`

class App extends React.Component {
  intervalId = 0
  startYear = 1990
  endYear = 1991
  state = {
    country: '',
  }
  componentDidMount() {
    this.props.initCountry()
    this.props.initLineChart()
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
  render() {
    // console.log(this.props)
    return (
      <div styleName='appStyles.mainDiv'>
        <ResetStyles />
        <ThemeProvider theme={themes.coldGray}>
          <Header />
          <div styleName='appStyles.control'>
            <TextField
              value={this.country}
              onChange={this.handleCountryChange}
              width={50}
            />
            <Button onClick={() => this.props.addCountry(this.state.country)}>
              <span>Add a country</span>
            </Button>
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
            <Button
              onClick={() => this.updateYear(this.startYear, this.endYear)}
            >
              <span>Update Years</span>
            </Button>

            <div styleName='styles.buttonGroup'>
              <Button onClick={() => this.startOnClick()}>
                <span>Start Drawing</span>
              </Button>
              <Button onClick={() => this.pauseOnClick()}>
                <span>Pause Drawing</span>
              </Button>
            </div>
          </div>
          <div styleName='appStyles.mainContainer'>
            <div styleName='appStyles.windowContainer'>
              <Element name='intro'>
                <WindowContainer
                  dataset={this.props.currentLineChart}
                  years={this.props.yearsArr}
                />
              </Element>
            </div>

            <div styleName='appStyles.windowContainer'>
              <Element name='techStack'>{/* <TechStack/> */}</Element>
            </div>

            <div styleName='appStyles.windowContainer'>
              <Element name='experience'>
                {/* <Experience/><BrushLine/> */}
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
    years: state.years,
    yearsArr: state.yearsArr,
  }
}
export default connect(
  mapStateToProps,
  { initCountry, initLineChart, serveLineData, updateYear, addCountry }
)(App)
