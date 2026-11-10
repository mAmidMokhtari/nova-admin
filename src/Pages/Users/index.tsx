import { RotateCw, SearchX, TriangleAlert, UserPlus, UsersRound } from 'lucide-react';

import { UsersTable } from '@/Components/Users/UsersTable';
import { CreateUserModal } from '@/Modals/CreateUserModal';
import { Button } from '@/Shared/Button';
import { Card } from '@/Shared/Card';
import { PageToolbar } from '@/Shared/PageToolbar';
import { SearchInput } from '@/Shared/SearchInput';
import { LoadingState, StateView } from '@/Shared/StateView';

import { useUsersPage } from './index.hook';

/** User list with search and the create-user dialog. */
export function UsersPage() {
  const page = useUsersPage();
  const { dictionary } = page;
  const texts = dictionary.users;

  const addButton = (
    <Button icon={<UserPlus size={18} aria-hidden="true" />} onClick={page.openCreate}>
      {texts.add}
    </Button>
  );

  const renderContent = () => {
    if (page.isLoading) return <LoadingState label={dictionary.common.loading} />;

    if (page.errorMessage) {
      return (
        <StateView
          tone="danger"
          icon={<TriangleAlert size={28} aria-hidden="true" />}
          title={texts.errorTitle}
          description={page.errorMessage}
          action={
            <Button
              variant="secondary"
              icon={<RotateCw size={16} aria-hidden="true" />}
              onClick={page.handleRetry}
            >
              {dictionary.common.retry}
            </Button>
          }
        />
      );
    }

    if (page.isEmpty) {
      return (
        <StateView
          icon={<UsersRound size={28} aria-hidden="true" />}
          title={texts.emptyTitle}
          description={texts.emptyDescription}
          action={addButton}
        />
      );
    }

    if (page.visibleUsers.length === 0) {
      return (
        <StateView
          icon={<SearchX size={28} aria-hidden="true" />}
          title={texts.noResultsTitle}
          description={texts.noResultsDescription}
        />
      );
    }

    return <UsersTable users={page.visibleUsers} />;
  };

  return (
    <>
      <PageToolbar title={texts.title} meta={page.isLoading ? undefined : page.countLabel}>
        <SearchInput
          value={page.query}
          onChange={page.setQuery}
          placeholder={texts.searchPlaceholder}
          clearLabel={dictionary.common.clearSearch}
        />
        {addButton}
      </PageToolbar>

      <Card>{renderContent()}</Card>

      <CreateUserModal
        isOpen={page.isCreateOpen}
        onClose={page.closeCreate}
        onSubmit={page.handleCreate}
      />
    </>
  );
}
