import * as React from 'react'
import {
    Cutout,
    Window,
    WindowContent,
    WindowHeader,
    Tab,
    Tabs,
    TabBody,
    Fieldset,
    NumberField,
    Checkbox,
    List,
    ListItem,
    TextArea,
    reset,
    themes, Divider, Radio, Button,
} from 'react95'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {openExternal, scrollNext} from './Window.jsx'
import styles from '../../css/Window.css'

const ResetStyles = createGlobalStyle`
  ${reset}
`

class Experience extends React.Component {
    state = {
        activeTab: 0,
        tabTitles: [
            'Statistics Canada',
            'Northwest Evaluation Association',
            'Becton Dickinson',
        ],
    }
    handleChange = value => {
        this.setState({activeTab: value})
        switch (value) {
            case 0:
                this.setState({tabTitles: [
                        'Statistics Canada',
                        'NWEA',
                        'Becton Dickinson',
                    ]})
                break;
            case 1:
                this.setState({tabTitles: [
                        'Statistics Canada',
                        'Northwest Evaluation Association',
                        'Becton Dickinson',
                    ]})
                break
            case 2:
                this.setState({tabTitles: [
                        'Statistics Canada',
                        'NWEA',
                        'Becton Dickinson',
                    ]})
                break;
        }
    }

    render() {
        const {activeTab} = this.state
        return (
            <div>
                <ResetStyles/>
                <ThemeProvider theme={themes.water}>
                    <Window styleName='styles.windowSpacing'>
                        <WindowHeader styleName='styles.windowHeader'>💻 Experience.exe</WindowHeader>
                        <WindowContent>
                            <Tabs value={activeTab} onChange={this.handleChange}>
                                <Tab value={0}>{this.state.tabTitles[0]}</Tab>
                                <Tab value={1}>{this.state.tabTitles[1]}</Tab>
                                <Tab value={2}>{this.state.tabTitles[2]}</Tab>
                            </Tabs>
                            <div>
                                {activeTab === 0 && (
                                    <TabBody>
                                        <Fieldset label="Data Science coop">
                                            May 2019 – Present
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Developed an automated data verification and
                                                    validation solution
                                                    using Python and pandas.
                                                </li>
                                                <li styleName='itemText'> Implemented a Python program for parsing
                                                    user-specified input and
                                                    configuration from Excel.
                                                </li>
                                                <li styleName='itemText'> Designed Power BI dashboards that are being
                                                    used by all survey
                                                    managers within the division.
                                                </li>
                                                <li styleName='itemText'> Technology: Python, Power BI, pandas, numpy,
                                                    SAS
                                                </li>
                                            </ul>
                                            <br/>
                                        </Fieldset>
                                    </TabBody>
                                )}
                                {activeTab === 1 && (
                                    <TabBody>
                                        <Fieldset label="Software Engineer">
                                            Apr 2017 – Aug 2018
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Implemented Assessment Proctoring using React
                                                    and Redux, improving performance by 45%.
                                                </li>
                                                <li styleName='itemText'> Led the Workstation Diagnostics project that
                                                    checks users’ local setup.
                                                    <Button
                                                        onClick={() => openExternal('https://check.nwea.org')}>
                                                        <span>Check it out!</span>
                                                    </Button>
                                                </li>
                                                <li styleName='itemText'> Designed automated acceptance tests using
                                                    NightWatch.js and Cucumber.js
                                                </li>
                                                <li styleName='itemText'> Technology: React, Redux, JavaScript ES6,
                                                    NightWatch, Cucumber, Webpack, Java
                                                </li>
                                            </ul>
                                            <br/>
                                        </Fieldset>
                                    </TabBody>
                                )}
                                {activeTab === 2 && (
                                    <TabBody>
                                        <Fieldset label="Software Engineer Intern">
                                            Apr 2016 – Mar 2017
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Implemented a software watchdog using C++,
                                                    which defended 90% of signal interrupt.
                                                </li>
                                                <li styleName='itemText'> Technology: C++, Assembly, Python
                                                </li>
                                            </ul>
                                            <br/>
                                        </Fieldset>
                                    </TabBody>
                                )}
                            </div>
                        </WindowContent>
                        <div styleName='buttonGroup'>
                            <Button onClick={() => scrollNext('techStack', -150)}><span>Back ⇑</span></Button>
                            <Button onClick={() => scrollNext('project', -150)}><span>Next ⇓</span></Button>
                        </div>
                    </Window>
                </ThemeProvider>
            </div>
        )
    }
}

export default Experience