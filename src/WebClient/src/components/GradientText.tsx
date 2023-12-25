import React from 'react'
import cls from '../pages/Landing/Landing.module.scss'

const GradientText = ({ text }: { text: string }) => {
  return <h1 className={cls.gradientText}>{text}</h1>
}

export default GradientText
