import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery'

import '../../static/css/Header.css'
import Logo from '../../static/img/logo.svg'

export default class Header extends Component {
  componentDidMount() {
    $(window).on("scroll", function() {
      if($(window).scrollTop() > 50) {
        $("header").addClass("active");
      } else {
        $("header").removeClass("active");
      }
    })
  }

  render() {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <img src={ Logo } alt="Trociety" className="logo-text"/>
          </div>

          <input type="checkbox" id="sidebar-toggle" hidden={true}/>
          <label htmlFor="sidebar-toggle" className="hamburger"><span></span></label>

          <div className="sidebar">
            <nav className="sidebar-nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/signup">Register</a></li>
              </ul>
            </nav>
            <div className="accent"></div>
          </div>
          <div className="sidebar-shadow" id="sidebar-shadow"></div>
          
          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/signup">Register</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
