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
    Checkbox,
} from 'react95'
import styles from '../../css/Window.css'
import {connect} from 'react-redux'
import {updateView} from '../actions/index.js'
import {ISO3ToName} from './Map.jsx'

const generateLabel = (country) => (
    <span styleName='styles.checkboxLabel'>{country + ': ' + ISO3ToName(country)}</span>
)

// TODO: Could and should be a functional component
class Countries extends React.Component {
    handleChange = e => {
        const value = e.target.value
        this.props.updateView(value, !this.props.init[value])
    }

    render() {
        return (
            <div styleName='styles.windowDivLayer'>
                <div styleName='styles.countryNames'>
                    {this.props.data.map((country) => {
                        return <Checkbox checked={this.props.init[country]} onChange={this.handleChange}
                                         value={country}
                                         label={generateLabel(country)}
                                         name='Country' key={country}
                                         tooltip={(data, e) => {
                                             console.log(data, e)
                                         }
                                         }
                        />
                    })}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {updateView},
)(Countries)


