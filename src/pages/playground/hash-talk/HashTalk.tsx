import React from 'react'
import { Form } from 'design/moles/form/Form';
import { Input } from 'design/atoms/Input';
import { useHashTalk } from 'hooks/playgroundHooks';
import Submit from 'design/moles/fields/Submit';
import { useStore } from 'store/store';

const HashTalk = () => {
  const { play: { account } } = useStore()
  const { submitMessage } = useHashTalk()

  if (!account) return null

  return (
    <div style={{ padding: 80, margin: `0 auto`, width: 480 }}>
      <Form onSubmit={submitMessage}>
        <Input type="text" name="message" placeholder="Message" />
        <Input type="text" name="identifier" defaultValue={account.identifier} style={{ display: 'none' }} />
        <Submit />
      </Form>
    </div>
  )
}

export default HashTalk
