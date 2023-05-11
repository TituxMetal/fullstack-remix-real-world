import { styled } from '@slicknode/stylemapper'
import { forwardRef, type InputHTMLAttributes } from 'react'

type Ref = HTMLInputElement
type Props = InputHTMLAttributes<Ref>

const appInputClassName = `w-full rounded-lg border-2 bg-transparent px-2 py-1 text-xl text-green-200 focus:outline focus:outline-1 focus:outline-green-100`

const StyledAppInput = styled('input', appInputClassName)

const AppInput = forwardRef<Ref, Props>(
  ({ type = 'text', className, ...rest }, ref) => {
    AppInput.displayName = 'Input'

    return (
      <StyledAppInput ref={ref} type={type} className={className} {...rest} />
    )
  }
)

export default AppInput
