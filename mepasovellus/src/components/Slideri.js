import React from 'react'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import Tooltip from 'rc-tooltip' 
import Slider from 'rc-slider'

const Handle = Slider.Handle 

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props 
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
} 

const wrapperStyle = { width: 400, margin: 40 } 

const Slideri = ({ onChange, defaultValue }) => {
  return (
  <div>
    <div style={wrapperStyle}>
      <Slider min={0} max={300} defaultValue={defaultValue} step={5} handle={handle} onChange={onChange}/>
    </div>
  </div>
  )
}

export default Slideri