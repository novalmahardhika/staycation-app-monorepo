import { cn } from '@/lib/utils'
import { ElementType, ReactNode } from 'react'

type WrapperComponentProps = {
  children: ReactNode
  isLoading: boolean
  isError: boolean
  dataLength: number
  LoadingComponent?: ElementType
  ErrorComponent?: ElementType
  errorClassName?: string
  loadingClassName?: string
  emptyClassName?: string
}

// prettier-ignore
export function WrapperComponent({
  children,
  isLoading,
  isError,
  LoadingComponent,
  ErrorComponent,
  dataLength,
  loadingClassName,
  errorClassName,
  emptyClassName
}: WrapperComponentProps) {

  if (isLoading) {
    return LoadingComponent ? <LoadingComponent /> : <p className={cn(loadingClassName)}>Loading...</p>
  }

  if (isError) {
    return ErrorComponent ? <ErrorComponent /> : <p className={cn(errorClassName)}>Something went wrong !</p>
  }

  if (dataLength === 0) {
    return <p className={cn(emptyClassName)}>Data is Empty</p>
  }

  return <>{children}</>
}
