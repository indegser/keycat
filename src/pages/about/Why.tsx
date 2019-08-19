import React from 'react'
import styled from 'styled-components'
import { AboutSection, AboutHeadline, AboutParagraph } from './About.styled'
import { images } from 'assets/images/images'

const KeychainImg = styled.img`
  float: left;
`

const Why = () => {
  return (
    <AboutSection>
      <AboutHeadline>Why another wallet?</AboutHeadline>
      <AboutParagraph>
        Let's define what is a wallet first. Wallet is a simple storage holding user's private key. It protects, reads
        and signs with stored key. It is almost identical to Password Manager. However, current wallets' adds more
        complexity than Password Managers. It offers 'Transfer', 'Contacts', 'Exchange', 'DApp(BApp) Store' and other
        each blockchain-specific features. Some might like these features, but I was not in favor of wallet being a
        full-package service. So let's differentiate wallet with 'Password Manager' or an 'Authenticator'.
      </AboutParagraph>

      <AboutHeadline>Keycat and Keychain</AboutHeadline>
      <AboutParagraph>
        <figure>
          <KeychainImg src={images.keychainSafari} />
          <figcaption>Safari's Keychain UI offering you a saved account.</figcaption>
        </figure>
        Keycat saves your private keys, but it does not have it's own database or storage. Keycat uses browser's secure
        storage called <strong>Keychain</strong>.
        <br />
        When you sign in to Gmail or Twitter, you might have noticed small UI saying
        <i>"I have remembered your passwords on behalf of you. If you click me, I will auto-fill your credentials."</i>
        This technology was developed by major browsers and operating systems like iOS and Android. Utilizing keychain,
        you can use difficult passwords for each websites without you writing down passwords in Notes. Imagine your
        private key is a password. Safest way to use Dapp or blockchain is to copy and paste your private key everytime
        you are requested to sign transactions or perform some actions.{' '}
        <strong>Let browser remember your private key for you</strong>. Maybe, browser is more secure than an app you
        wrote down your private keys like Excel or E-mail. The simplest way to describe Keycat is "Website with
        [Account/Private key] fields". Keycat has account and password field. You can use Keycat by copy-and-pasting
        your private key everytime sending transaction. However, if you use auto-fill feature it's kind of magic. Your
        private key is auto-filled, and used in signing then finish.
        <br />
        How does Keycat use Keychain Every website with register/sign-in feature can benefit from Keychain technology.
        Just provide "Email/Password fields" or "Name/Password fields". Browser knows that user is in sign-in page when
        they discover above type of forms and displays "auto-fill UI". Some browser requests user's fingerprints before
        auto-filling passwords.
        <div style={{ clear: 'both' }} />
      </AboutParagraph>
    </AboutSection>
  )
}

export default Why
