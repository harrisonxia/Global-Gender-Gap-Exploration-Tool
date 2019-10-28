import * as React from 'react'
import {
    Button,
    Window,
    WindowContent,
    WindowHeader,
    Tooltip,
    Select,
    themes, Fieldset, TabBody,
} from 'react95'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {scrollNext, openExternal} from './Window.jsx'
import {scroller} from 'react-scroll'
import styles from '../../css/Window.css'

const items = [
    {
        value: 'https://www.devxia.com/Lil-Data/', label: 'Gaming and Streaming Industry Analysis',
    },
    {
        value: 'https://www.devxia.com/crouching_tigers', label: 'IoT devices Predictive Maintenance and Management',
    },
    {
        value: 'https://www.devxia.com/Stats-In-A-Can/', label: 'Hackathon: \n Public Transportation Analysis',
    },
]
const UrlList = () => (
    <div>
        <ThemeProvider theme={themes.water}>
            <Window styleName='styles.windowSpacing'>
                <WindowHeader styleName='styles.windowHeader'>🔗 ProjectLinks.exe</WindowHeader>

                <WindowContent>
                    <Fieldset>
                        <div styleName='styles.radioProcess'>
                            Projects details and Github links are listed above.
                        </div>
                    </Fieldset>
                    <br/>
                    <Fieldset label="Direct link to all projects live.">
                        <div styleName='styles.radioProcess'>
                            <Select items={items} onChange={(value) => openExternal(value)}
                                    styleName='styles.projectUrl'/>
                            <br/>
                        </div>
                    </Fieldset>
                </WindowContent>
                <div styleName='buttonGroup'>
                    <Button onClick={() => scrollNext('project', -150)}><span>Back ⇑</span></Button>
                    <Button onClick={() => scrollNext('intro', -150)}><span>Top ⇑⇑</span></Button>
                </div>
            </Window>
        </ThemeProvider>
    </div>
)

export default UrlList