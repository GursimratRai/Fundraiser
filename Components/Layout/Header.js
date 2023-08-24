import React from 'react'
import styled from 'styled-components'
import HeaderLogo from '../Header/HeaderLogo'
import HeaderNav from '../Header/HeaderNav'
import HeaderRight from '../Header/HeaderRight'

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  )
}


const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Header