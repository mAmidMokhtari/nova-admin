import type { ReactNode } from 'react';
import styled from 'styled-components';

type PageToolbarProps = {
  title: string;
  /** Short text next to the title, e.g. the number of rows. */
  meta?: string;
  /** Search and primary action of the page. */
  children: ReactNode;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-block-end: 20px;
`;

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
`;

const Meta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/** Page heading row shared by the list pages. */
export function PageToolbar({ title, meta, children }: PageToolbarProps) {
  return (
    <Wrapper>
      <Heading>
        <Title>{title}</Title>
        {meta && <Meta>{meta}</Meta>}
      </Heading>
      <Controls>{children}</Controls>
    </Wrapper>
  );
}
