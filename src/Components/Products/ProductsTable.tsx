import { useMemo } from 'react';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { useAppSelector } from '@/Redux/hooks';
import { selectLocale } from '@/Redux/slices/settingsSlice';
import { DataTable, type DataTableColumn } from '@/Shared/DataTable';
import type { Product } from '@/types';
import { formatPrice } from '@/Utils/formatters';

type ProductsTableProps = {
  products: readonly Product[];
};

const Thumbnail = styled.img`
  display: block;
  inline-size: 52px;
  block-size: 52px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: #ffffff;
  object-fit: contain;
`;

const Title = styled.span`
  display: block;
  max-inline-size: 460px;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.span`
  font-weight: 700;
  white-space: nowrap;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding-block: 3px;
  padding-inline: 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  white-space: nowrap;
`;

/** Product rows with image, title, price and category. */
export function ProductsTable({ products }: ProductsTableProps) {
  const dictionary = useDictionary();
  const locale = useAppSelector(selectLocale);

  const columns = useMemo<DataTableColumn<Product>[]>(
    () => [
      {
        key: 'image',
        header: dictionary.products.columns.image,
        width: '96px',
        // The title is in the next cell, so the thumbnail is decorative.
        render: (product) => <Thumbnail src={product.image} alt="" loading="lazy" />,
      },
      {
        key: 'title',
        header: dictionary.products.columns.title,
        render: (product) => (
          <Title dir="auto" title={product.title}>
            {product.title}
          </Title>
        ),
      },
      {
        key: 'price',
        header: dictionary.products.columns.price,
        width: '160px',
        render: (product) => <Price>{formatPrice(product.price, locale)}</Price>,
      },
      {
        key: 'category',
        header: dictionary.products.columns.category,
        width: '220px',
        render: (product) => <CategoryBadge dir="auto">{product.category}</CategoryBadge>,
      },
    ],
    [dictionary, locale],
  );

  return (
    <DataTable
      caption={dictionary.products.title}
      columns={columns}
      rows={products}
      getRowKey={(product) => product.id}
    />
  );
}
