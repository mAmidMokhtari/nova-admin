/** Product as returned by FakeStoreAPI. `rating` is absent on freshly created items. */
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
};

export type ProductRating = {
  rate: number;
  count: number;
};

/** Request body of `POST /products`. */
export type CreateProductPayload = Omit<Product, 'id' | 'rating'>;

/** Raw values of the create-product form; price stays a string until submit. */
export type ProductFormValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
};
