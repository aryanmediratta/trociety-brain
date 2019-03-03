import React, { Component } from 'react'
import Database from '../util/Database'
import $ from 'jquery'

import '../static/css/Home.css'
import '../'

import Textbox from '../components/Textbox'
import Button from '../components/Button'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      openSearchWindow: false,
      userLocation: {
        _lat: null,
        _log: null,
        address: {

        }
      },
      searchResults: null
    }
  }

  componentDidMount() {
    // $(function() {
    //   $.scrollify({
    //     section : ".hero",
    //   })
    // })
  }

  render() {
    return (
      <div>
        <section>
          <div className="hero">
            <div className="container main">
              <div className="slogan">
                <h1>New age security,<br/> at your terms</h1>
                <p>Trociety is the one stop security and survillence solution for you.</p>

                <SearchTextbox type="text" placeholder="Search your Society" handleChange={(input)=>{
                  if(input==='') {
                    // $(document.getElementById("search-box")).addClass("active")
                    document.getElementById("search-box").style = "position: relative;top: 0;"
                    this.setState({
                      openSearchWindow: false
                    })
                  } else {
                    // $(document.getElementById("search-box")).removeClass("active")
                    document.getElementById("search-box").style = "position: absolute;top: 5em;"
                    this.setState({
                      openSearchWindow: true
                    })
                  }
                    
                  // let range = 1
                  // let latitude = 0, longitude = 0

                  // // ~1 mile of lat and lon in degrees
                  // let lat = 0.0144927536231884 * range, lon = 0.0181818181818182 * range

                  // let lowerLat = latitude - (lat * distance), greaterLat = latitude + (lat * distance)
                  // let lowerLon = longitude - (lon * distance), greaterLon = longitude + (lon * distance)

                  // let lesserGeopoint = { _lat: lowerLat, _lon: lowerLon }
                  // let greaterGeopoint = { _lat: greaterLat, _lon: greaterLon }

                  // Database.firestore.collection('societies')
                  // .where('location', '>=', lesserGeopoint)
                  // .where('location', '<=', greaterGeopoint)
                  // .get()
                  // .then(()=>{
                    
                  // })

                  Database.firestore.collection('societies')
                  .get()
                  .then(()=>{
                    // sort and find like
                  })
                  console.log(input)
                }} required={false}/>
              </div>

              <div className="form-container">
                <div className="onboarding-form">
                  <h2 className="title">Get in Touch</h2>
                  <Textbox type="text" placeholder="Society Name" handleChange={()=>{  }} required={true}/>
                  <Textbox type="text" placeholder="Email address" handleChange={()=>{  }} required={true}/>

                  <Button text="Submit"/>

                  <p className="terms-link">By signing up, you agree to the <a href="#">terms</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <div className="tech-stack">
            <h2>Tech Stack</h2>
            <p>The technologies used in this prototype</p>

            <div className="container">
              <div className="images">
                <div className="tech">
                  <img src="https://firebase.google.com/_static/images/firebase/touchicon-180.png" alt="Firebase"/><p>Firebase</p>
                </div>
                
                <div className="tech">
                  <img src="https://www.codemate.com/wp-content/uploads/2017/09/flutter-logo.png" alt="Flutter"/><p>Futter</p>
                </div>

                <div className="tech">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/957px-Tensorflow_logo.svg.png" alt="TensorFlow"/><p>TensorFlow</p>
                </div>

                <div className="tech">
                  <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="React"/><p>React</p>
                </div>
                
                <div className="tech">
                  <img src="http://pluspng.com/img-png/nodejs-logo-png--435.png" alt="Node"/><p>Node</p>
                </div>
                
                <div className="tech">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/250px-Jupyter_logo.svg.png" alt="Jupyter"/><p>Jupyter</p>
                </div>
                
                
                <div className="tech">
                  <img src="https://www.docker.com/sites/default/files/social/docker_facebook_share.png" alt="Docker"/><p>Docker</p>
                </div>

                <div className="tech">
                  <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="Git"/><p>Git</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="features">
            <div className="feat">
              <h3>Realtime Security</h3>
            </div>
          </div>
        </section>

        {
          this.state.openSearchWindow ? (
            <section className="searchWindow">
              <label htmlFor="sidebar-toggle" className="hamburger" onClick={()=>{
                this.setState({
                  openSearchWindow: false
                })
              }}><span></span></label>
              <div className="searchContainer">

              </div>
            </section>
          ) : (
            console.log()
          )
        }
      </div>
    )
  }
}

const SearchTextbox = (props) => {
  var value
  return (
    <div className="textbox searchBox" id="search-box">
      <input className="input" type={props.type} placeholder={props.placeholder} id="search-box-input"
        onFocus={()=>{ 
          $d("search-box").style = "border: 1.5px solid #0051ff; padding-top: 1.75em; padding-bottom: 0.75em;"
          $d("search-box-placeholder").style = "display: block; color: #0051ff; top: -2px;"
          $d("search-box-input").placeholder = ''
        }}
        onBlur={()=>{
          $d("search-box").style = "border: 1.5px solid #aaa;"
          if(value!=='' && value!==undefined) {
            $d("search-box-placeholder").style = "display: block; color: #aaa; top: -2px;"            
            $d("search-box").style = "padding-top: 1.75em; padding-bottom: 0.75em;"
          } else {
            $d("search-box-placeholder").style = "display: none;"
            $d("search-box-input").placeholder = props.placeholder
          }

          if($d("search-box-placeholder").innerHTML==='Required')
            $d("search-box-placeholder").innerHTML = props.placeholder
        }} 
        onChange={()=>{
          value = $d("search-box-input").value

          if(props.required && value==='') {
            $d("search-box").style = "border: 1.5px solid #ff0000; padding-top: 1.75em; padding-bottom: 0.75em;"
            $d("search-box-placeholder").style = "display: block; color: #ff0000; top: -2px;"
            $d("search-box-placeholder").innerHTML = "Required"
            $d("search-box-input").placeholder = props.placeholder
          } else {
            $d("search-box").style = "border: 1.5px solid #0051ff; padding-top: 1.75em; padding-bottom: 0.75em;"
            $d("search-box-placeholder").style = "display: block; color: #oo51ff; top: -2px;"
            $d("search-box-placeholder").innerHTML = props.placeholder
            $d("search-box-input").placeholder = ''
          }
          props.handleChange(value)
        }}
      />
      <p className="placeholder" id="search-box-placeholder">{ props.placeholder }</p>
    </div>
  )
}

const $d = (_id) => {
  return document.getElementById(_id)
}