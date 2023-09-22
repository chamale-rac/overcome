import React from 'react'
import { SketchPicker } from 'react-color'

const ColorPicker = ({ setColor, actualColor }) => {
  return (
    <div className="left-full ml-3">
      <SketchPicker
        color={actualColor}
        disableAlpha
        onChange={(color) => setColor(color.hex)}
      />
    </div>
  )
}

export default ColorPicker
