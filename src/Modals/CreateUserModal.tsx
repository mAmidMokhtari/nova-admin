import { UserForm } from '@/Components/Users/UserForm';
import { useDictionary } from '@/Dictionary';
import { Modal } from '@/Shared/Modal';
import type { CreateUserPayload } from '@/types';

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateUserPayload) => Promise<void>;
};

/** Dialog that hosts the create-user form. */
export function CreateUserModal({ isOpen, onClose, onSubmit }: CreateUserModalProps) {
  const dictionary = useDictionary();

  return (
    <Modal
      isOpen={isOpen}
      title={dictionary.users.createTitle}
      closeLabel={dictionary.common.close}
      onClose={onClose}
    >
      <UserForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
