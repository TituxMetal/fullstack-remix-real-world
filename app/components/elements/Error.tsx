import { styled } from '@slicknode/stylemapper'
import { type HTMLAttributes } from 'react'

const appErrorClassName = `mt-2 font-bold text-red-200`

const StyledAppError = styled('p', appErrorClassName)

const AppError = ({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) => {
  return <StyledAppError className={className} {...rest} />
}

export default AppError
