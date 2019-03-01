import React, { Component } from 'react'

import Textbox from '../components/Textbox'
import Button from '../components/Button'

export default class Home extends Component {
  render() {
    return (
      <div>
        <section>
          <div className="hero">
            <h1>Trociety</h1>
          </div>

          <Textbox type="text" placeholder="Email address" handleChange={(i)=>{ console.log(i) }} required={true}/>
        </section>

        <div>
          <input className="textbox" type="text" placeholder="Hello"/>

          <button className="button solid">Hello</button>

          <select className="dropdown" defaultValue={1} onChange={this.handleTierChange} passive="true">
            <option value={0}>Budget</option>
            <option value={1}>Standard</option>
            <option value={2}>Premium</option>
          </select>
        </div>
      </div>
    )
  }
}
