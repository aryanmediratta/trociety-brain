import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './Trociety.css'

import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Pricing from './components/Pricing'
import Products from './components/Products'

class Trociety extends Component {
  render() {
    return (
      <div>
        <Header/>

        <Router>
          <Switch>
            <Route path={'/'} component={Home}/>
            <Route path={'/about'} component={About}/>
            <Route path={'/contact'} component={Contact}/>
            <Route path={'/pricing'} component={Pricing}/>
            <Route path={'/products'} component={Products}/>
          </Switch>
        </Router>

        <Footer/>
      </div>
    )
  }
}

export default Trociety;
