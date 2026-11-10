import { ProductForm } from '@/Components/Products/ProductForm';
import { useDictionary } from '@/Dictionary';
import { Modal } from '@/Shared/Modal';
import type { CreateProductPayload } from '@/types';

type CreateProductModalProps = {
  isOpen: boolean;
  categories: readonly string[];
  onClose: () => void;
  onSubmit: (payload: CreateProductPayload) => Promise<void>;
};

/** Dialog that hosts the create-product form. */
export function CreateProductModal({
  isOpen,
  categories,
  onClose,
  onSubmit,
}: CreateProductModalProps) {
  const dictionary = useDictionary();

  return (
    <Modal
      isOpen={isOpen}
      title={dictionary.products.createTitle}
      closeLabel={dictionary.common.close}
      onClose={onClose}
    >
      <ProductForm categories={categories} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
