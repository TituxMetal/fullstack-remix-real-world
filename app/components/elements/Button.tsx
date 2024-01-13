import { styled } from '@slicknode/stylemapper'

const appButtonClassName = `w-max rounded-lg border-2 border-green-100 bg-green-700 px-4 py-3 font-bold hover:scale-105`

const StyledAppButton = styled('button', appButtonClassName)

const AppButton = ({ className, children }: JSX.IntrinsicElements['button']) => {
  return <StyledAppButton className={className}>{children}</StyledAppButton>
}

export default AppButton
