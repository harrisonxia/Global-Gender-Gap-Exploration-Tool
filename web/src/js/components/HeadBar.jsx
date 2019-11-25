import * as React from 'react'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {
    Button,
    AppBar,
    TextField,
    Toolbar,
    reset,
    themes,
    List,
    ListItem,
    Divider,
    Hourglass,
    Tooltip
} from 'react95'
import styles from '../../css/HeadBar.css'
import {openExternal, scrollNext} from './Window.jsx'
import {connect} from 'react-redux'
import {
    loadData,
} from '../actions'

const Header = (props) =>
    <div styleName='headerBar'>
        {/*<ResetStyles/>*/}
        <ThemeProvider theme={themes.coldGray}>
            <AppBar>
                <Toolbar styleName='toolBar'>

                    <Divider vertical size="lg" styleName='verticalLine'/>
                    <div styleName='headerButtonGroup'>
                        <Button onClick={()=>props.loadData('expected_years_of_schooling')}><span styleName='buttonText'>Expected Years of Schooling (years)</span></Button>
                        <Button onClick={()=>props.loadData('mortality_rate')}><span styleName='buttonText'>Female Adult Mortality Rate (per 1,000 people)</span></Button>
                        <Button onClick={()=>props.loadData('seats_in_parliament')}><span styleName='buttonText'>Share of seats in parliament (% held by women)</span></Button>
                        <Button onClick={()=>props.loadData('senior_and_middle_management')}><span styleName='buttonText'>Female share of employment in senior and middle management(%)</span></Button>
                        <Button onClick={()=>openExternal('mailto:engcxia+website@gmail.com?Subject=Hello')}><span styleName='buttonText'>Contact</span></Button>
                    </div>
                    {/*<TextField placeholder="Search..." width={150} style={{marginLeft: 4}}/>*/}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </div>


export default connect(
    null,
    {loadData},
)(Header)
