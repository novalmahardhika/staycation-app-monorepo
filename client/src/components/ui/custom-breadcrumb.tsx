import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb'

type BreadcrumbArrowItem = {
  label: string
  href?: string | null
}

type BreadcrumbArrowProps = {
  className?: string
  items: BreadcrumbArrowItem[]
}

export function BreadcrumbArrow({ className, items }: BreadcrumbArrowProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={className}>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1
          return (
            <BreadcrumbItem key={`breadcrumb-${index}`}>
              {isLastItem ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href || ''}>
                  {item.label}
                </BreadcrumbLink>
              )}
              {!isLastItem && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
