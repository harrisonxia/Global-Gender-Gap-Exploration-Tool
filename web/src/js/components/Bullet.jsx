import * as React from 'react'
import {ResponsiveBullet} from '@nivo/bullet'
import {connect} from 'react-redux'
const percentile = require("percentile")

const dat =
    [
        {
            'id': 'PLease select a country to get started..',
            'ranges': [
                0
            ],
            'measures': [
                0,
            ],
            'markers': [
                0,
            ],
        },
    ]
function getAvg(arr) {
    const total = arr.reduce((acc, c) => acc + c, 0);
    return total / arr.length;
}

const Bullet = (props) => {
    let subset = props.overallSubset.map(obj => {
        let filtered = obj.data.filter(yearly => yearly.x === 2018)
        if (filtered.length > 0)
            return filtered[0].y
    })
    let perc_25, perc_50, perc_75
    if (subset) {
        perc_25 = percentile(
            25,
            subset,
        )
        perc_50 = percentile(
            50,
            subset,
        )
        perc_75 = percentile(
            75,
            subset,
        )
        // console.log(result); // 8
    }
    let displayData = []
    props.overallSubset.map(obj => {
        let temp = obj.data.filter(yearly => yearly.x === 2018)
        if (temp.length > 0) {
            displayData.push(
                {
                    'id': obj.id,
                    'ranges': [
                        perc_25? perc_25: 0,
                        perc_50? perc_50: 0,
                        perc_75? perc_75: 0,
                    ],
                    'measures': [
                        temp[0].y,
                    ],
                    'markers': [
                        getAvg(subset),
                    ],
                }
            )
        }
    })

    return (
        <ResponsiveBullet
            data={displayData.length===0? dat: displayData}
            margin={{top: 50, right: 90, bottom: 50, left: 90}}
            spacing={46}
            titleAlign="start"
            titleOffsetX={-70}
            measureSize={0.2}
            animate={true}
            motionStiffness={90}
            motionDamping={12}
        />
    )
}

function mapStateToProps(state) {
    return {
        overall: state.overall,
        overallSubset: state.overallSubset,
    }
}

export default connect(
    mapStateToProps,
    {},
)(Bullet)
