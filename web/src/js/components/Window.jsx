import * as React from 'react'
import {
    Button,
    Window,
    WindowContent,
    WindowHeader,
    Fieldset,
    Radio,
    Tooltip,
    reset,
    themes,
} from 'react95'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {scroller} from 'react-scroll'
import styles from '../../css/Window.css'

const ResetStyles = createGlobalStyle`
  ${reset}
`
const dummy = () => {
}

export const scrollNext = (elementName, offsetNum) => {
    scroller.scrollTo(elementName, {
        duration: 3000,
        smooth: 'easeInOutQuint',
        offset: offsetNum ? offsetNum : null,
    })
}

export const openExternal = (link) => {
    window.open(
        link,
        '_blank', // <- This is what makes it open in a new window.
    )
}

const Intro = () => (
    <div stylename='styles.windowDivLayer}'>
        {/*<ResetStyles/>*/}
        {/*<ThemeProvider theme={themes.coldGray}>*/}
            <Window styleName='styles.windowSpacing'>
                <WindowHeader styleName='styles.windowHeader'>😎 Hello.exe</WindowHeader>
                <WindowContent>
                    <Fieldset>
                        Hello
                    </Fieldset>
                    <br/>
                    <Fieldset label="Education">
                    </Fieldset>
                </WindowContent>
                <div styleName='styles.buttonGroup'>
                    <Button onClick={() => scrollNext('techStack', -150)}><span>Next ⇓</span></Button>
                </div>
            </Window>
        {/*</ThemeProvider>*/}
    </div>
)

export default Intro