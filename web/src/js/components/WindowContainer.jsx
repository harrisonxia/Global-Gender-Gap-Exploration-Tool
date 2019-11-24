import * as React from 'react'
import {
    Button,
    Window,
    WindowContent,
    WindowHeader,
    Fieldset,
    Radio,
    // Tooltip,
    reset,
    themes,
} from 'react95'
import chartXkcd from 'chart.xkcd'
import {Line, Radar, Pie, XY} from 'chart.xkcd-react'
import {scroller} from 'react-scroll'
import {Chart, Geom, Axis, Tooltip, Legend} from 'bizcharts'
import styles from '../../css/Window.css'
import * as R from 'ramda'
import {years} from '../../assets/data/data.js'
// const chartConfig = {
//   chartData: [
//     { genre: 'Sports', sold: 275, income: 2300 },
//     { genre: 'Strategy', sold: 115, income: 667 },
//     { genre: 'Action', sold: 120, income: 982 },
//     { genre: 'Shooter', sold: 350, income: 5271 },
//     { genre: 'Other', sold: 150, income: 3710 },
//   ],
//   // 定义度量
//   cols: {
//     sold: { alias: '销售量' }, // 数据字段别名映射
//     genre: { alias: '游戏种类' },
//   },
//   title: {
//     autoRotate: true, // 是否需要自动旋转，默认为 true
//     textStyle: {
//       fontSize: '12',
//       textAlign: 'center',
//       fill: '#ecc4ff',
//       fontWeight: 'bold',
//       rotate: 30,
//     }, // 坐标轴文本属性配置
//     position: 'center', // 标题的位置，**新增**
//   },
// }
const data =
[
    {
        'id': 'USA',
        'data': [
            {
                'x': 1990,
                'y': 1.5,
            },
            {
                'x': 1991,
                'y': 2,
            },
        ],
    },
    {
        'id': 'CAN',
        'data': [
            {
                'x': 1990,
                'y': 2.5,
            },
            {
                'x': 1991,
                'y': 3,
            },
        ],
    },
]
const WindowContainer = props => (
    <div stylename='styles.windowDivLayer}'>
        <Window styleName='styles.windowSpacing'>
            <WindowHeader styleName='styles.windowHeader'>😎 Hello.exe</WindowHeader>
            <WindowContent>
                {/* {console.log(props.currentExpChart)} */}
                {/* <Fieldset> */}
                {/* <Chart width={600} height={400} data={chartConfig.chartData} scale={chartConfig.cols}>
            <Axis name='genre' title={chartConfig.title} />
            <Axis name='sold' title={chartConfig.title} />
            <Legend position='top' dy={-20} />
            <Tooltip />
            <Geom type='interval' position='genre*sold' color='genre' />
          </Chart> */}
                {/* </Fieldset> */}
                <Fieldset label='Education'>
                    <Line
                        config={{
                            title: 'Expected years of schooling, female (years)', // optional
                            xLabel: 'Year', // optional
                            yLabel: 'y', // optional
                            data: {
                                labels: R.isEmpty(props.years) ? [] : props.years,
                                datasets: R.isEmpty(props.dataset) ? [] : props.dataset,
                            },
                            options: {
                                // optional
                                yTickCount: 3,
                                legendPosition: chartXkcd.config.positionType.upLeft,
                            },
                        }}
                    />
                </Fieldset>
                <br/>
                <Fieldset label='Health'>
                    <Radar
                        config={{
                            title: 'Life Expectancy, Female',
                            data: {
                                labels: R.isEmpty(props.years) ? [] : props.years,
                                datasets: R.isEmpty(props.currentExpChart)
                                    ? []
                                    : props.currentExpChart,
                            },
                            dataColors: [
                                '#dd4528',
                                '#28a3dd',
                                '#f3db52',
                                '#ed84b5',
                                '#4ab74e',
                                '#9179c0',
                                '#8e6d5a',
                                '#f19839',
                                '#949494',
                            ],
                        }}
                    >
                        {' '}
                    </Radar>
                </Fieldset>
            </WindowContent>
            <div styleName='styles.buttonGroup'>
                <Button onClick={() => scrollNext('techStack', -150)}>
                    <span>Next ⇓</span>
                </Button>
            </div>
        </Window>
    </div>
)

export default WindowContainer
