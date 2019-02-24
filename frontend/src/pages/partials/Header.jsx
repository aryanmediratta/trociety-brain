import React, { Component } from 'react'

import '../../static/css/Header.css'

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <p className="logo-text">Trociety</p>
          </div>

          <input type="checkbox" id="sidebar-toggle" hidden="true"/>
          <label for="sidebar-toggle" className="hamburger"><span></span></label>

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
