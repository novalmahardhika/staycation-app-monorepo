import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent } from 'react'

// type icons lucide-react
export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>
