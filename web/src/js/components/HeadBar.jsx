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
// const ResetStyles = createGlobalStyle`
//   ${reset}
// `
function Menu() {
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(!open)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div>
            {open && (
                <List horizontalAlign="left" verticalAlign="bottom" open={open} onClick={handleClose}>
                    <ListItem onClick={()=>scrollNext('intro', -150)}>👨‍💻 Profile</ListItem>
                    <ListItem onClick={()=>scrollNext('techStack', -150)}>💽 Tech Stack</ListItem>
                    <ListItem onClick={()=>scrollNext('experience', -150)}>💼 Experience</ListItem>
                    <ListItem onClick={()=>scrollNext('project', -150)}>⌨️ Projects</ListItem>
                    <Divider/>
                    <ListItem onClick={()=>scrollNext('projectUrls', -150)}>🔗 Project Links</ListItem>
                </List>
            )}
            <Button onClick={handleClick} active={open} styleName='startButton'>
                <Tooltip styleName='toolTipOverflow' text="No, this will never finish loading 🤷‍">
                    <Hourglass size={16} />Start
                </Tooltip>
            </Button>
        </div>
    )
}

const Header = () =>
    <div styleName='headerBar'>
        {/*<ResetStyles/>*/}
        <ThemeProvider theme={themes.coldGray}>
            <AppBar>
                <Toolbar styleName='toolBar'>
                    <Menu/>
                    <Divider vertical size="lg" styleName='verticalLine'/>
                    <div styleName='headerButtonGroup'>
                        <Button onClick={()=>openExternal('https://github.com/harrisonxia')}><span styleName='buttonText'>Temp</span></Button>
                        <Button onClick={()=>scrollNext('experience', -150)}><span styleName='buttonText'>Temp</span></Button>
                        <Button onClick={()=>scrollNext('project', -150)}><span styleName='buttonText'>Temp</span></Button>
                        <Button onClick={()=>openExternal('mailto:engcxia+website@gmail.com?Subject=Hello')}><span styleName='buttonText'>Contact</span></Button>
                    </div>
                    {/*<TextField placeholder="Search..." width={150} style={{marginLeft: 4}}/>*/}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </div>

export default Header