import { Link } from 'react-router'
import Logo from './ui/logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='grid gap-10 py-10 my-5 border-t'>
      <div className='container flex flex-wrap justify-between'>
        <span className='space-y-1 max-w-64'>
          <Logo href='#' />
          <p className='text-sm font-light text-gray-400'>
            We kaboom your beauty holiday instantly and memorable.
          </p>
        </span>
        <FooterGroupItem title='For Beginner' items={forBeginnerItems} />
        <FooterGroupItem title='Explore Us' items={exploreUsItems} />
        <FooterGroupItem title='Connect Us' items={connectUsItems} />
      </div>
      <p className='text-sm font-light text-center text-gray-400'>
        Copyright {year} • All rights reserved • Staycation
      </p>
    </footer>
  )
}

type FooterGroupItemProps = {
  title: string
  items: {
    href: string
    label: string
  }[]
}

function FooterGroupItem({ title, items }: FooterGroupItemProps) {
  return (
    <span className='grid gap-3 text-sm'>
      <h4 className='font-medium text-blue-950'>{title}</h4>
      <div className='grid gap-1.5 font-light text-gray-400'>
        {items.map((item, index) => (
          <Link key={`${item.label}-${index}`} to={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </span>
  )
}

//  list data items
const forBeginnerItems = [
  {
    href: '#',
    label: 'New Account',
  },
  {
    href: '#',
    label: 'Start Booking a Room',
  },
  {
    href: '#',
    label: 'Use Payments',
  },
]

const exploreUsItems = [
  {
    href: '#',
    label: 'Our Careers',
  },
  {
    href: '#',
    label: 'Privacy',
  },
  {
    href: '#',
    label: 'Terms & Conditions',
  },
]

const connectUsItems = [
  {
    href: '#',
    label: 'support@staycation.id',
  },
  {
    href: '#',
    label: '021-2208-1996',
  },
  {
    href: '#',
    label: 'Staycation, Kemang, Jakarta',
  },
]
