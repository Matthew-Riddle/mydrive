import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreators from './store/actions'
import View from './components/View/View'
import Nav from './components/Nav/Nav'
import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import './App.css'
class App extends Component {
  state = {
    currentFolder: null,
    lightTheme: false
  }

  folderHandler = name => {
    this.setState({ currentFolder: name })
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleEscPress, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleEscPress, false)
  }

  handleEscPress = e => {
    if (e.keyCode === 27) {
      this.props.getNoneSelected()
    }
  }

  handleAppClick = () => {
    this.props.getNoneSelected()
  }

  isLight = () => this.state.lightTheme === true

  themeToggle = () => {
    this.setState({
      lightTheme: !this.isLight()
    })
  }

  render () {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: this.state.lightTheme ? '#cfcfcf' : '#e94c3c',
          main: this.state.lightTheme ? '#9E9E9E' : '#b00b13',
          dark: this.state.lightTheme ? '#707070' : '#790000'
        },
        secondary: {
          light: this.state.lightTheme ? '#9E9E9E' : '#F5F5F5',
          main: this.state.lightTheme ? '#616161' : '#E0E0E0',
          dark: this.state.lightTheme ? '#9E9E9E' : '#212121'
        },
        text: {
          primary: '#fa6607',
          secondary: '#000000'
        },
        background: {
          alternate: this.state.lightTheme ? '#ffffff' : '#383838',
          paper: this.state.lightTheme ? '#e0e0e0' : '#424242'
        },
        navBrand: this.state.lightTheme ? '#fa6607' : '#303030',
        type: this.state.lightTheme ? 'light' : 'dark'
      }
    })
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App' onClick={this.handleAppClick}>
          <Nav
            folderHandler={this.folderHandler}
            currentFolder={this.state.currentFolder}
            themeToggle={this.themeToggle}
          />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <View
                  folderHandler={this.folderHandler}
                  currentFolder={this.state.currentFolder}
                />
              )}
            />
            <Route
              exact
              path='/deleted'
              render={() => (
                <View
                  deleted
                  folderHandler={this.folderHandler}
                  currentFolder={this.state.currentFolder}
                />
              )}
            />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getNoneSelected: () => dispatch(actionCreators.getNoneSelectedAsync())
})

export default withRouter(connect(null, mapDispatchToProps)(App))
