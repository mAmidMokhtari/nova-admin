import { PackageOpen, Plus, RotateCw, SearchX, TriangleAlert } from 'lucide-react';

import { ProductsTable } from '@/Components/Products/ProductsTable';
import { CreateProductModal } from '@/Modals/CreateProductModal';
import { Button } from '@/Shared/Button';
import { Card } from '@/Shared/Card';
import { PageToolbar } from '@/Shared/PageToolbar';
import { SearchInput } from '@/Shared/SearchInput';
import { LoadingState, StateView } from '@/Shared/StateView';

import { useProductsPage } from './index.hook';

/** Product list with search and the create-product dialog. */
export function ProductsPage() {
  const page = useProductsPage();
  const { dictionary } = page;
  const texts = dictionary.products;

  const addButton = (
    <Button icon={<Plus size={18} aria-hidden="true" />} onClick={page.openCreate}>
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
          icon={<PackageOpen size={28} aria-hidden="true" />}
          title={texts.emptyTitle}
          description={texts.emptyDescription}
          action={addButton}
        />
      );
    }

    if (page.visibleProducts.length === 0) {
      return (
        <StateView
          icon={<SearchX size={28} aria-hidden="true" />}
          title={texts.noResultsTitle}
          description={texts.noResultsDescription}
        />
      );
    }

    return <ProductsTable products={page.visibleProducts} />;
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

      <CreateProductModal
        isOpen={page.isCreateOpen}
        categories={page.categories}
        onClose={page.closeCreate}
        onSubmit={page.handleCreate}
      />
    </>
  );
}
