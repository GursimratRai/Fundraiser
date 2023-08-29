import React from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import Link from 'next/link'

const HeaderNav = () => {
  const Router = useRouter();
  return (
    <HeaderNavWrapper>
      <Link style={{ textDecoration: "none"}}  href={'/'}>
          <HeaderNavLinks active={Router.pathname === "/" ? true : false} > 
            Campaigns
          </HeaderNavLinks>
      </Link>
      <Link style={{ textDecoration: "none"}} href={'/campaign'}>
          <HeaderNavLinks active={Router.pathname === "/createcampaign" ? true : false} >
             Create Campaign
          </HeaderNavLinks>
      </Link>
      <Link style={{ textDecoration: "none"}} href={'/dashboard'}>
          <HeaderNavLinks active={Router.pathname === "/dashboard" ? true : false} >
            Dashboard
          </HeaderNavLinks>
      </Link>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 2px;
  text-decoration:none;
  height: 50%;
  border-radius: 10px;
  `

const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
  height: 100%;
  font-family: 'Roboto';
  margin: 5px;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`

export default HeaderNav