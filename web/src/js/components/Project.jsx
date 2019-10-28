import * as React from 'react'
import {
    Window,
    WindowContent,
    WindowHeader,
    Tab,
    Tabs,
    TabBody,
    Fieldset,
    reset,
    themes,
    Button, ListItem, Divider, List,
} from 'react95'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {openExternal, scrollNext} from './Window.jsx'
import styles from '../../css/Window.css'

const ResetStyles = createGlobalStyle`
  ${reset}
`

class Project extends React.Component {
    state = {
        activeTab: 0,
        tabTitles: [
            'Predictive Maintenance',
            'Gaming Analysis',
            'AI Fashion Designer',
            'Hackathon',
        ],
    }
    handleChange = value => {
        this.setState({activeTab: value})
        switch (value) {
            case 0:
                this.setState({
                    tabTitles: [
                        'IoT devices Predictive Maintenance and Management',
                        'Gaming Analysis',
                        'AI Fashion Designer',
                        'Hackathon',
                    ],
                })
                break
            case 1:
                this.setState({
                    tabTitles: [
                        'Predictive Maintenance',
                        'Gaming and Streaming Industry Analysis',
                        'AI Designer',
                        'Hackathon',
                    ],
                })
                break
            case 2:
                this.setState({
                    tabTitles: [
                        'Predictive Maintenance',
                        'Gaming Analysis',
                        'AI Fashion Designer',
                        'Hackathon',
                    ],
                })
                break
            case 3:
                this.setState({
                    tabTitles: [
                        'Predictive Maintenance',
                        'Gaming Analysis',
                        'AI Designer',
                        'Hackathon',
                    ],
                })
                break

        }
    }

    render() {
        const {activeTab} = this.state
        return (
            <div>
                <ResetStyles/>
                <ThemeProvider theme={themes.water}>
                    <Window styleName='styles.windowSpacing'>
                        <WindowHeader styleName='styles.windowHeader'>🤩 Projects.exe</WindowHeader>
                        <WindowContent>
                            <Tabs value={activeTab} onChange={this.handleChange}>
                                <Tab value={0}>{this.state.tabTitles[0]}</Tab>
                                <Tab value={1}>{this.state.tabTitles[1]}</Tab>
                                <Tab value={2}>{this.state.tabTitles[2]}</Tab>
                                <Tab value={3}>{this.state.tabTitles[3]}</Tab>
                            </Tabs>
                            <div>
                                {activeTab === 0 && (
                                    <TabBody>
                                        <Fieldset>
                                            Jan 2019 – Apr 2019
                                            <ul styleName='listText'>
                                                <li styleName='itemText'>
                                                    Performed ETL, EDA as well as data preparation.
                                                </li>
                                                <li styleName='itemText'>
                                                    Built and leveraged numerous machine learning models.
                                                </li>
                                                <li styleName='itemText'>
                                                    Developed the proof-of-concept web frontend dashboard for monitoring
                                                    IoT device heartbeat via Node.js server running on AWS and detecting machine failure via tensorflow model serving on Google Cloud Platform [both servers are inactive].
                                                </li>
                                                <li styleName='itemText'> Applied Spark ML to predict future games and
                                                    channels growth.
                                                </li>
                                                <li styleName='itemText'> Technology: Spark, Python, Hadoop,
                                                    JavaScript, ReactJS, ReChartsJS
                                                </li>
                                            </ul>
                                            <List inline={true} horizontalAlign="left" verticalAlign="bottom" open={true}>
                                                <ListItem as="a" href="https://www.devxia.com/crouching_tigers" target="_blank">👨‍💻 Check it out! [servers off]</ListItem>
                                                <Divider/>
                                                <ListItem as="a" href="https://github.com/harrisonxia/Predictive-Maintenance" target="_blank">📁 Github</ListItem>
                                            </List>
                                            {/*<Button*/}
                                            {/*    onClick={() => openExternal('https://www.devxia.com/crouching_tigers')}>*/}
                                            {/*    <span>Check out this project! [backend servers turned off]</span>*/}
                                            {/*</Button>*/}
                                            {/*<Button*/}
                                            {/*    onClick={() => openExternal('https://github.com/harrisonxia/Predictive-Maintenance')}>*/}
                                            {/*    <span>Check code on Github!</span>*/}
                                            {/*</Button>*/}
                                        </Fieldset>
                                    </TabBody>
                                )}
                                {activeTab === 1 && (
                                    <TabBody>
                                        <Fieldset>
                                            Apr 2017 – Aug 2018
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Analyzed the growth and trends in the gaming
                                                    industry fetching data from various APIs.
                                                </li>
                                                <li styleName='itemText'> Implemented a web crawler and performed ETL
                                                    on over 50GB of raw data using PySpark.
                                                </li>
                                                <li styleName='itemText'> Developed the web frontend for visualizing
                                                    analysis using JavaScript [devxia.com/Lil-Data]
                                                </li>
                                                <li styleName='itemText'> Applied Spark ML to predict future games and
                                                    channels growth.
                                                </li>
                                                <li styleName='itemText'> Technology: Spark, Python, Hadoop,
                                                    JavaScript, ReactJS, ReChartsJS
                                                </li>
                                            </ul>
                                            <List inline={true} horizontalAlign="left" verticalAlign="bottom" open={true}>
                                                <ListItem as="a" href="https://www.devxia.com/Lil-Data/" target="_blank">👨‍💻 Check out this project live!</ListItem>
                                                <Divider/>
                                                <ListItem as="a" href="https://github.com/harrisonxia/Lil-Data" target="_blank">📁 And it's on Github!</ListItem>
                                            </List>
                                            {/*<Button*/}
                                            {/*    onClick={() => openExternal('https://www.devxia.com/Lil-Data/')}>*/}
                                            {/*    <span>Check out this project live!</span>*/}
                                            {/*</Button>*/}
                                            {/*<Button*/}
                                            {/*    onClick={() => openExternal('https://github.com/harrisonxia/Lil-Data')}>*/}
                                            {/*    <span>And it's on Github!</span>*/}
                                            {/*</Button>*/}
                                            {/*<br/>*/}
                                        </Fieldset>
                                    </TabBody>
                                )}
                                {activeTab === 2 && (
                                    <TabBody>
                                        <Fieldset>
                                            Oct 2018 – Dec 2018
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Applied and trained DCGAN model to generate
                                                    original and innovative fashion patterns.
                                                </li>
                                                <li styleName='itemText'> Achieved real time object detection and
                                                    virtual try-on with Mask R-CNN.
                                                </li>
                                                <li styleName='itemText'> Fine-tuned existing models to enhance object
                                                    detection accuracy and broaden real time usage.
                                                </li>
                                                <li styleName='itemText'> Technology: PyTorch, Python, CUDA, GoogleColab
                                                </li>
                                            </ul>
                                            <List inline={true} horizontalAlign="left" verticalAlign="bottom" open={true}>
                                                <ListItem as="a" href="https://github.com/harrisonxia/AI-Fashion-Designer" target="_blank">📁 On Github!</ListItem>
                                            </List>
                                            {/*<Button*/}
                                            {/*    onClick={() => openExternal('https://github.com/harrisonxia/AI-Fashion-Designer')}>*/}
                                            {/*    <span>On Github!</span>*/}
                                            {/*</Button>*/}
                                            {/*<br/>*/}
                                        </Fieldset>
                                    </TabBody>
                                )}
                                {activeTab === 3 && (
                                    <TabBody>
                                        <Fieldset>
                                            <ul styleName='listText'>
                                                <li styleName='itemText'> Open Government Partnership Global Summit
                                                    Hackathon, Ottawa May 2019
                                                    <br/>o Analyzed and created transport, safety, economy indicators
                                                    for 9 cities in Canada.
                                                    <br/>o Implemented web frontend and visualization
                                                    <Button
                                                        onClick={() => openExternal('https://www.devxia.com/Stats-In-A-Can/')}>
                                                        <span>Check out this project live!</span>
                                                    </Button>
                                                    <Button
                                                        onClick={() => openExternal('https://github.com/ogp-summit-hackathon-sommet-pgo/Stats-In-A-Can')}>
                                                        <span>Check on Github!</span>
                                                    </Button>
                                                </li>
                                                <li styleName='itemText'> DeloitteAIHacks, Vancouver Sep 2019
                                                    <br/>o Prepared the data and built data model to make suggestions
                                                    for K-12inBC.
                                                </li>
                                            </ul>
                                            <br/>
                                        </Fieldset>
                                    </TabBody>
                                )}
                            </div>
                        </WindowContent>
                        <div styleName='buttonGroup'>
                            <Button onClick={() => scrollNext('experience', -150)}><span>Back ⇑</span></Button>
                            <Button onClick={() => scrollNext('projectUrls')}><span>Next ⇓</span></Button>
                        </div>
                    </Window>
                </ThemeProvider>
            </div>
        )
    }
}

export default Project