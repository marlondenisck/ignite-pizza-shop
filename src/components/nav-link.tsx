import { Link, type LinkProps, useLocation } from 'react-router'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className='data-[current=true]:text-foreground text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-medium'
    />
  )
}
export default NavLink
