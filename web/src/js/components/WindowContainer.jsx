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
import chartXkcd from 'chart.xkcd'
import {Line, Radar, Pie, XY} from 'chart.xkcd-react'
import {scroller} from 'react-scroll'
import styles from '../../css/Window.css'
import {expectedSchooling} from '../../assets/data/data.js'

const dummy = () => {
}

const WindowContainer = () => (
    <div stylename='styles.windowDivLayer}'>

        <Window styleName='styles.windowSpacing'>
            <WindowHeader styleName='styles.windowHeader'>😎 Hello.exe</WindowHeader>
            <WindowContent>
                <Fieldset>
                    <Line
                        config={{
                            title: 'Expected years of schooling, female (years)', // optional
                            xLabel: 'Year', // optional
                            yLabel: 'y', // optional
                            data: {
                                labels: expectedSchooling.year,
                                datasets: expectedSchooling.data,
                            },
                            options: { // optional
                                yTickCount: 3,
                                legendPosition: chartXkcd.config.positionType.upLeft,
                            },
                        }}/>
                </Fieldset>
                <br/>
                <Fieldset label="Education">
                    <Radar config={{
                        title: 'Fake Data',
                        data: {
                            labels: [
                                'a', 'b', 'c', 'd', 'e',
                            ],
                            datasets: [
                                {
                                    label: 'aaaa',
                                    data: [1, 2, 3, 4, 5],
                                },
                                {
                                    label: 'bbb',
                                    data: [3, 4, 5, 6, 7],
                                },
                            ],

                        },
                        dataColors: ['#dd4528', '#28a3dd', '#f3db52', '#ed84b5', '#4ab74e', '#9179c0', '#8e6d5a', '#f19839', '#949494']
                    }}> </Radar>

                </Fieldset>
            </WindowContent>
            <div styleName='styles.buttonGroup'>
                <Button onClick={() => scrollNext('techStack', -150)}><span>Next ⇓</span></Button>
            </div>
        </Window>

    </div>
)

export default WindowContainer