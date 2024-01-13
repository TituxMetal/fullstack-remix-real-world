import { styled } from '@slicknode/stylemapper'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

type Ref = HTMLTextAreaElement
type Props = TextareaHTMLAttributes<Ref>

const appTextareaClassName = `h-44 min-h-full resize-none w-full rounded-lg border-2 bg-transparent px-2 py-1 text-xl text-green-200 focus:outline focus:outline-1 focus:outline-green-100`

const StyledAppTextarea = styled('textarea', appTextareaClassName)

const AppTextarea = forwardRef<Ref, Props>(({ className, ...rest }, ref) => {
  AppTextarea.displayName = 'Textarea'

  return <StyledAppTextarea ref={ref} className={className} {...rest} />
})

export default AppTextarea
