import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import React from 'react'
import Tooltip from 'rc-tooltip' 
import Slider from 'rc-slider'

const createSliderWithTooltip = Slider.createSliderWithTooltip 
const Handle = Slider.Handle 

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props 
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  ) 
} 

const wrapperStyle = { width: 400, margin: 50 } 

const Slideri = () => {
  return (
<div>
    <div style={wrapperStyle}>
      <p>Käynnin kesto (minuuttia)</p>
      <Slider min={0} max={300} defaultValue={15} step={5} handle={handle} />
    </div>
  </div>
  )
}

export default Slideri