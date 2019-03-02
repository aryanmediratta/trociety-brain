import React, { Component } from 'react'

import '../static/css/Home.css'

import Textbox from '../components/Textbox'
import Button from '../components/Button'

export default class Home extends Component {
  render() {
    return (
      <div>
        <section>
          <div className="hero">
            <div className="slogan">
              <h1>New age security,<br/> at your terms</h1>
              <p>Trociety is the one stop security and survillence solution for you.</p>
            </div>

            <div className="form-container">
              <div className="onboarding-form">
                <h2 className="title">Get in Touch</h2>
                <Textbox type="text" placeholder="Society Name" handleChange={()=>{  }} required={true}/>
                <Textbox type="text" placeholder="Email address" handleChange={()=>{  }} required={true}/>

                <Button text="Submit"/>

                <p className="terms">By signing up, you agree to the <a href="#">terms</a></p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2>show</h2>
        </section>

        <section>
          <h1>Features</h1>
        </section>
      </div>
    )
  }
}
