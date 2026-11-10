import { Package, Users, type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useDictionary, type Dictionary } from '@/Dictionary';
import { ROUTES } from '@/Routes/paths';
import { Logo } from '@/Shared/Logo';

type NavItem = {
  to: string;
  icon: LucideIcon;
  labelKey: keyof Omit<Dictionary['nav'], 'label'>;
};

const NAV_ITEMS: readonly NavItem[] = [
  { to: ROUTES.products, icon: Package, labelKey: 'products' },
  { to: ROUTES.users, icon: Users, labelKey: 'users' },
];

const Aside = styled.aside`
  position: sticky;
  inset-block-start: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  block-size: 100vh;
  padding-block: 22px;
  padding-inline: 16px;
  background: ${({ theme }) => theme.colors.sidebar};
  color: ${({ theme }) => theme.colors.sidebarText};
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-inline: 10px;
`;

const BrandCaption = styled.span`
  font-size: 12px;
  opacity: 0.75;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-block: 11px;
  padding-inline: 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.sidebarTextActive};
  }

  &.active {
    background: ${({ theme }) => theme.colors.sidebarActive};
    color: ${({ theme }) => theme.colors.sidebarTextActive};
    font-weight: 700;
  }

  &.active svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

/** Fixed navigation rail of the panel. */
export function Sidebar() {
  const dictionary = useDictionary();

  return (
    <Aside>
      <Brand>
        <Logo inverted />
        <BrandCaption>{dictionary.common.panelTitle}</BrandCaption>
      </Brand>

      <nav aria-label={dictionary.nav.label}>
        <NavList>
          {NAV_ITEMS.map(({ to, icon: Icon, labelKey }) => (
            <li key={to}>
              <Link to={to}>
                <Icon size={19} aria-hidden="true" />
                {dictionary.nav[labelKey]}
              </Link>
            </li>
          ))}
        </NavList>
      </nav>
    </Aside>
  );
}
