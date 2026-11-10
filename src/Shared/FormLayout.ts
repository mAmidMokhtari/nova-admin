import styled from 'styled-components';

/** Two-column grid for modal forms. */
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`;

/** Makes a field span the full width of a `FormGrid`. */
export const FormGridFull = styled.div`
  grid-column: 1 / -1;
`;

/** Submit and cancel buttons of a form. */
export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-block-start: 24px;
`;
