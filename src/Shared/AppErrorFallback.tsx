import { RotateCw, TriangleAlert } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';

import { Button } from './Button';
import { Card } from './Card';
import { StateView } from './StateView';

const Page = styled.main`
  display: grid;
  place-items: center;
  min-block-size: 100vh;
  padding: 24px;
`;

const Panel = styled(Card)`
  inline-size: min(480px, 100%);
`;

/** Shown instead of a blank screen when rendering throws; the button renders the app again. */
export function AppErrorFallback({ resetErrorBoundary }: FallbackProps) {
  const dictionary = useDictionary();

  return (
    <Page>
      <Panel>
        <StateView
          tone="danger"
          icon={<TriangleAlert size={28} aria-hidden="true" />}
          title={dictionary.errorBoundary.title}
          description={dictionary.errorBoundary.description}
          action={
            <Button icon={<RotateCw size={16} aria-hidden="true" />} onClick={resetErrorBoundary}>
              {dictionary.common.retry}
            </Button>
          }
        />
      </Panel>
    </Page>
  );
}
