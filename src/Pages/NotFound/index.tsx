import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { DEFAULT_PRIVATE_ROUTE } from '@/Routes/paths';
import { Card } from '@/Shared/Card';
import { StateView } from '@/Shared/StateView';

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

/** Shown for unknown addresses inside the panel. */
export function NotFoundPage() {
  const dictionary = useDictionary();

  return (
    <Card>
      <StateView
        icon={<Compass size={28} aria-hidden="true" />}
        title={dictionary.notFound.title}
        description={dictionary.notFound.description}
        action={<BackLink to={DEFAULT_PRIVATE_ROUTE}>{dictionary.notFound.back}</BackLink>}
      />
    </Card>
  );
}
