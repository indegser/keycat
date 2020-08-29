import CardLayout from 'design/layouts/CardLayout'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils'
import { useEffect } from 'react'

const GoToSignin = props => {
    const onClickGo = (e) => {
        navigate(appendSearchParamsToUrl('/signin'))
    }

    useEffect(() => {
        setTimeout(() => {
            navigate(appendSearchParamsToUrl('/signin'))
        }, 1000)
    })

    return (
        <CardLayout title="Go To Sign In">
            <Form method="post" noValidate onSubmit={onClickGo}>
                <p style={{ padding: 30 }}>
                    Congratulations, to finish saving your credentials to the browser, click the "Go To Sign In" button below:
                </p>
                <Submit onClick={onClickGo}>
                    Go To Sign In
                </Submit>
            </Form>
        </CardLayout>
    )
}

export default GoToSignin
