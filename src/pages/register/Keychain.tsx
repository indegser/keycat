import React from 'react'
import styled from 'styled-components'
import CardLayout from 'design/layouts/CardLayout';
import Submit from 'design/moles/fields/Submit';
import { sendMessage } from 'api/message';
import { useStore } from 'store/store';
import keychainSrc from 'assets/images/keychain.png';
import { getSearchParams } from 'utils/utils';

interface Props {
  path: string;
  account?: string;
}

const ImgContainer = styled.div`
  padding: var(--padding-x);
  img {
    width: 100%;
    height: 240px;
    object-fit: contain;
    object-position: center;
  }
`

const Keychain: React.SFC<Props> = () => {
  const { config: { client } } = useStore()
  const { data } = getSearchParams()
  const handleClick = () => {
    sendMessage('signin', { data: JSON.parse(data as string) }, client)
  }

  return (
    <CardLayout title="Save your Account to Keychain">
      <ImgContainer>
        <img src={keychainSrc} />
      </ImgContainer>
      <Submit
        help="keychain"
        onClick={handleClick}
      />
    </CardLayout>
  )
}

export default Keychain
