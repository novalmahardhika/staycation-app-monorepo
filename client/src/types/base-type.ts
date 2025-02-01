import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent } from 'react'

// Base type
export type BaseType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

// type icons lucide-react
export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>
