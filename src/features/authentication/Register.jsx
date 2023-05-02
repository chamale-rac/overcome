// Description: Register component
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React, { useRef, useState, useEffect } from 'react'
// I will use custom icons for this project: check, times, and circle

import { USER_REGEX, PWD_REGEX } from '@utils'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  return <div>Clear</div>
}

export default Register
