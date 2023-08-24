import React from 'react'
import styled from 'styled-components'

const HeaderLogo = () => {
  return (
    <Logo>Fundraiser</Logo>
  )
}
const Logo = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin-left: 11px;
  font-family: 'Graduate', cursive;
  font-family: 'Pacifico', cursive;
  letter-spacing: 3px;
  cursor: pointer;
`

export default HeaderLogo