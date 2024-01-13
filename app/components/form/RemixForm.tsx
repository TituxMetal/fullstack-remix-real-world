import { Form as FrameworkForm, useActionData, useNavigation, useSubmit } from '@remix-run/react'
import { createForm, type FormProps, type FormSchema } from 'remix-forms'

import { AppButton, AppError, AppInput, AppTextarea } from '~/components/elements'

const Form = createForm({
  component: FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit
})

const RemixForm = <Schema extends FormSchema>(props: FormProps<Schema>) => {
  return (
    <Form<Schema>
      className='flex flex-col gap-4'
      errorComponent={AppError}
      inputComponent={AppInput}
      multilineComponent={AppTextarea}
      buttonComponent={AppButton}
      {...props}
    />
  )
}

export default RemixForm
