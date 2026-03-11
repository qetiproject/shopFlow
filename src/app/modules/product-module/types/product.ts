export interface ProductsApiResponse<T> {
  readonly skip: number;
  readonly limit: number;
  readonly total: number;
  readonly products: readonly T[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type ProductApiShape = Pick<
  Product,
  'id' | 'title' | 'description' | 'category' | 'price' | 'discountPercentage' | 'thumbnail'
>;

export type ProductViewModel = Readonly<ProductApiShape>;

export enum ProductMode {
  SEARCH = 'search',
  CATEGORY = 'category',
  ORDER = 'order',
}

export interface AddProductRequest {
  title: string;
  description: string;
  category: string;
  price: number | null;
  thumbnail: string | null;
  images?: string[];
  stock?: number;
  sku?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductDeleteResponse extends Product {
  isDeleted: boolean;
  deletedOn: Date;
}
