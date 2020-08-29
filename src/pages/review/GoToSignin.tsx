import CardLayout from 'design/layouts/CardLayout'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils'

const GoToSignin = props => {
    const onClickGo = (e) => {
        navigate(appendSearchParamsToUrl('/signin'))
    }

    return (
        <CardLayout title="Go To Sign In">
            <Form method="post" noValidate onSubmit={onClickGo}>
                <Submit onClick={onClickGo}>
                    Go To Sign In
                </Submit>
            </Form>
        </CardLayout>
    )
}

export default GoToSignin
