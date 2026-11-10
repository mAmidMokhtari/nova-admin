import { CircleAlert, CircleCheck, X } from 'lucide-react';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectToasts, toastDismissed, type Toast } from '@/Redux/slices/toastSlice';
import { ToastType } from '@/types/Enums';

const TOAST_DURATION_MS = 4500;

const Region = styled.div`
  position: fixed;
  inset-block-end: 24px;
  inset-inline-end: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-inline-size: 300px;
  max-inline-size: 420px;
  padding-block: 12px;
  padding-inline: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-inline-start: 4px solid
    ${({ theme, $type }) =>
      $type === ToastType.Success ? theme.colors.success : theme.colors.danger};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.overlay};
  color: ${({ theme, $type }) =>
    $type === ToastType.Success ? theme.colors.success : theme.colors.danger};
`;

const Message = styled.p`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

const DismissButton = styled.button`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

type ToastItemProps = {
  toast: Toast;
};

function ToastItem({ toast }: ToastItemProps) {
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const isSuccess = toast.type === ToastType.Success;

  useEffect(() => {
    const timer = window.setTimeout(() => dispatch(toastDismissed(toast.id)), TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [dispatch, toast.id]);

  return (
    <Item $type={toast.type} role={isSuccess ? 'status' : 'alert'}>
      {isSuccess ? (
        <CircleCheck size={20} aria-hidden="true" />
      ) : (
        <CircleAlert size={20} aria-hidden="true" />
      )}
      <Message>{toast.message}</Message>
      <DismissButton
        type="button"
        aria-label={dictionary.common.dismiss}
        onClick={() => dispatch(toastDismissed(toast.id))}
      >
        <X size={16} aria-hidden="true" />
      </DismissButton>
    </Item>
  );
}

/** Renders the queued success and error messages; mount it once at the app root. */
export function ToastContainer() {
  const toasts = useAppSelector(selectToasts);

  return (
    <Region>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </Region>
  );
}
