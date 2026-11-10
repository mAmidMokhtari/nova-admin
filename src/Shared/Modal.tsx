import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

const Dialog = styled.dialog`
  inline-size: min(640px, calc(100vw - 48px));
  max-block-size: calc(100vh - 48px);
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.overlay};

  &::backdrop {
    background: ${({ theme }) => theme.colors.overlay};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 18px;
  padding-inline: 24px;
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const Body = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

/**
 * Modal built on the native `<dialog>`, which provides focus trapping, Escape
 * handling and the backdrop. Children mount only while it is open, so forms reset.
 */
export function Modal({ isOpen, title, closeLabel, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {isOpen && (
        <>
          <Header>
            <Title id={titleId}>{title}</Title>
            <CloseButton type="button" aria-label={closeLabel} onClick={onClose}>
              <X size={20} aria-hidden="true" />
            </CloseButton>
          </Header>
          <Body>{children}</Body>
        </>
      )}
    </Dialog>
  );
}
