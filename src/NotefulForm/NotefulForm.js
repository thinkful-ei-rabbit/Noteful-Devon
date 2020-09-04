import React from 'react'
import './NotefulForm.css'
// import PropTypes from 'prop-types'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}

// this component does not seem to be used within this app so I am not implementing Proptype
