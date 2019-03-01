import React from 'react'

const Textbox = (props) => {
  var value

  var _ref = ''
  for(let i=0; i<12; i++)
    _ref += Math.floor( Math.random()*16 ).toString(16)
  return (
    <div className="textbox" id={ "textbox-wrapper-" + _ref }>
      <input className="input" type={props.type} placeholder={props.placeholder} id={ "textbox-input-" + _ref }
        onFocus={()=>{ 
          $("textbox-wrapper-"+_ref).style = "border: 1.5px solid #0051ff; padding-top: 1.75em; padding-bottom: 0.75em;"
          $("textbox-placeholder-"+_ref).style = "display: block; color: #0051ff; top: -2px;"
          $("textbox-input-"+_ref).placeholder = ''
        }}
        onBlur={()=>{
          $("textbox-wrapper-"+_ref).style = "border: 1.5px solid #aaa;"
          if(value!=='' && value!==undefined) {
            $("textbox-placeholder-"+_ref).style = "display: block; color: #aaa; top: -2px;"            
            $("textbox-wrapper-"+_ref).style = "padding-top: 1.75em; padding-bottom: 0.75em;"
          } else {
            $("textbox-placeholder-"+_ref).style = "display: none;"
            $("textbox-input-"+_ref).placeholder = props.placeholder
          }

          if($("textbox-placeholder-"+_ref).innerHTML==='Required')
            $("textbox-placeholder-"+_ref).innerHTML = props.placeholder
        }} 
        onChange={()=>{
          value = $("textbox-input-"+_ref).value

          if(props.required && value==='') {
            $("textbox-wrapper-"+_ref).style = "border: 1.5px solid #ff0000; padding-top: 1.75em; padding-bottom: 0.75em;"
            $("textbox-placeholder-"+_ref).style = "display: block; color: #ff0000; top: -2px;"
            $("textbox-placeholder-"+_ref).innerHTML = "Required"
            $("textbox-input-"+_ref).placeholder = props.placeholder
          } else {
            $("textbox-wrapper-"+_ref).style = "border: 1.5px solid #0051ff; padding-top: 1.75em; padding-bottom: 0.75em;"
            $("textbox-placeholder-"+_ref).style = "display: block; color: #oo51ff; top: -2px;"
            $("textbox-placeholder-"+_ref).innerHTML = props.placeholder
            $("textbox-input-"+_ref).placeholder = ''
          }
          props.handleChange(value)
        }}
      />
      <p className="placeholder" id={ "textbox-placeholder-" + _ref }>{ props.placeholder }</p>
    </div>
  )
}

const $ = (_id) => {
  return document.getElementById(_id)
}

export default Textbox