import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './Trociety.css'

import Header from './pages/partials/Header'
import Footer from './pages/partials/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Products from './pages/Products'

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
