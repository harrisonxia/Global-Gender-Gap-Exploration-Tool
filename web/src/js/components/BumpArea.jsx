import * as React from 'react'

import {ResponsiveAreaBump} from '@nivo/bump'

const MyResponsiveAreaBump = (props) => {
    return (
        <ResponsiveAreaBump
            data={props.data}
            margin={{top: 40, right: 100, bottom: 40, left: 100}}
            spacing={8}
            colors={{scheme: 'nivo'}}
            blendMode="multiply"
            startLabel="id"
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36,
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            // tooltip={(obj) =>{
            //     return <strong>{obj.serie.id}</strong>}}
        />)
}

export default MyResponsiveAreaBump