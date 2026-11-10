import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Spinner } from './Spinner';

type StateViewProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Usually a retry or create button. */
  action?: ReactNode;
  tone?: 'neutral' | 'danger';
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-block: 72px;
  padding-inline: 24px;
  text-align: center;
`;

const IconCircle = styled.span<{ $tone: 'neutral' | 'danger' }>`
  display: grid;
  place-items: center;
  inline-size: 64px;
  block-size: 64px;
  margin-block-end: 6px;
  border-radius: 50%;
  background: ${({ theme, $tone }) =>
    $tone === 'danger' ? theme.colors.dangerSoft : theme.colors.accentSoft};
  color: ${({ theme, $tone }) => ($tone === 'danger' ? theme.colors.danger : theme.colors.accent)};
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 700;
`;

const Description = styled.p`
  max-inline-size: 420px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ActionSlot = styled.div`
  margin-block-start: 10px;
`;

/** Centered message used for empty, no-result and error states. */
export function StateView({ icon, title, description, action, tone = 'neutral' }: StateViewProps) {
  return (
    <Wrapper role={tone === 'danger' ? 'alert' : 'status'}>
      {icon && <IconCircle $tone={tone}>{icon}</IconCircle>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <ActionSlot>{action}</ActionSlot>}
    </Wrapper>
  );
}

type LoadingStateProps = {
  label: string;
};

const LoadingWrapper = styled(Wrapper)`
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Centered spinner with an announced label. */
export function LoadingState({ label }: LoadingStateProps) {
  return (
    <LoadingWrapper role="status" aria-live="polite">
      <Spinner size={28} />
      <span>{label}</span>
    </LoadingWrapper>
  );
}
