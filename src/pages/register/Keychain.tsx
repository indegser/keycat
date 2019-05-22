import React from 'react'
import styled from 'styled-components'
import CardLayout from 'design/layouts/CardLayout';
import Submit from 'design/moles/fields/Submit';
import { sendMessage } from 'api/message';
import { useStore } from 'store/store';
import { getSearchParams } from 'utils/utils';

interface Props {
  path: string
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

const Desc = styled.div`
  font-size: 12px;
  color: #777;
`

const Keychain: React.SFC<Props> = () => {
  const account = getSearchParams().get('account')
  const { config: { client } } = useStore()

  const handleClick = () => {
    sendMessage('signin', { data: { account }}, client)
  }

  return (
    <CardLayout title="Save your Account to Keychain">
      <ImgContainer>
        <img src="/images/keychain.png" />
        <Desc>
          Peekaboo는 당신의 계정 이름과 Private key를 브라우저의 키체인을 통해 관리할 수 있게 하는 서비스입니다. 브라우저에 저장된 당신의 Private key는 어떤 누구도 가로챌 수 없고, 피카부는 당신이 거래를 하거나 투표를 할 때, 자동으로 채워진 Private key로 사인합니다.
        </Desc>
      </ImgContainer>
      <Submit onClick={handleClick}>
        Next
      </Submit>
    </CardLayout>
  )
}

export default Keychain
