import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Shell = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.sidebarWidth} minmax(0, 1fr);
  min-block-size: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 28px 32px 40px;
`;

/** Panel chrome: fixed sidebar, header and the routed page. */
export function DashboardLayout() {
  return (
    <Shell>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Shell>
  );
}
