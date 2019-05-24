# {{APP}} [](#keycat)
{{APP}}는 브라우저 또는 운영체제의 Keychain 기술로 사용자의 Private key를 저장하지 않고도 EOS Dapp을 사용할 수 있게 해주는 서비스입니다.

# Concept [](#concept)
Scatter, Hardware and Mobile wallets that you use to connect with Dapp are safe but a little bit inconvenient. It has to be installed or carried-on. 
{{APP}} started as a solution to solve those inconviences that EOS holders are experiencing but used to it.

We believe the only place those problems don't surface is Web.
Wallet-as-Webpage solve every problem existing wallets have. But it is unsafe.
Webpage does not own private storage unlike mobile or desktop apps. Does it cannot protect user's private key.

Long story short, {{APP}} is a web(page) wallet. So, how does {{APP}} save user's private key?

Major browsers(Chrome, Safari, Firefox) and OS providers(Apple, Google) has a security technology called **Keychain**.
Keychain stores your passwords and account information and reduces the number of passwords you have to remember and manage.
When you access a website, email account, network server, or other password-protected item, you may be given the option to remember or save the password. If you choose to save the password, it’s saved in your keychain so you don’t have to remember or type your password every time.

{{APP}} has a specific sign in page which handles EOS account as email and private key as password. After signing in, Keychain will ask user to save account information.
Once user choose to save it, data is encrypted and synced across all devices your Google account is logged-in or your iCloud account is logged-in.
Thus, If you signed in and choose to save in Desktop Safari, you can access it in your iPhone Safari.

Whenever Dapp asks you to sign transaction, {{APP}} use a form for Keychain to auto-fill private key and sign transaction with it.

# Frequently asked questions [](#ask)

1. **Can I view and edit my passwords stored in Keychain?**
  
  Yes. You can access your passwords to websites, Wi-Fi networks, and Internet accounts via the specific application. For example, use Safari to access and edit your Safari passwords.
    - [Manage saved passwords in Chrome](https://support.google.com/chrome/answer/95606?co=GENIE.Platform%3DDesktop&hl=en)
    - [View passwords stored in iCloud Keychain](https://support.apple.com/en-us/HT203783#stored)

2. **How does Keychain protect my private key?**

  Keychain protects your information with end-to-end encryption, which provides the highest level of data security. Your data is protected with a key that's made from information unique to your device, and combined with your device passcode, which only you know. No one else can access or read this data, either in transit or storage.

3. **Is {{APP}} safe?**

  Yes. {{APP}} never and ever save your private key in a database. Everything is saved in Browser's keychain. {{APP}} cannot remove or update your Keychain-synced data. It is protected by browser itself. In other words, it is protected by Google or Apple, Firefox's security system.