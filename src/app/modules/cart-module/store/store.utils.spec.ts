import type { CartProduct } from '@app-types/dto';
import {
  addOrUpdateProduct,
  calculateTotals,
  updateQuantity,
} from './store.utils';

const product = (id: number, price: number, quantity: number): CartProduct => ({
  id,
  title: `P${id}`,
  price,
  thumbnail: '',
  quantity,
  total: price * quantity,
});

describe('store.utils', () => {
  describe('addOrUpdateProduct', () => {
    it('adds new product when cart is empty', () => {
      const incoming = product(1, 10, 2);
      const result = addOrUpdateProduct([], incoming);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ ...incoming, total: 20 });
    });

    it('adds new product when id not in cart', () => {
      const existing = [product(1, 10, 1)];
      const incoming = product(2, 5, 3);
      const result = addOrUpdateProduct(existing, incoming);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ id: 1, quantity: 1 });
      expect(result[1]).toMatchObject({ id: 2, quantity: 3, total: 15 });
    });

    it('updates quantity when product already in cart', () => {
      const existing = [product(1, 10, 1)];
      const incoming = product(1, 10, 2);
      const result = addOrUpdateProduct(existing, incoming);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ id: 1, quantity: 3, total: 30 });
    });
  });

  describe('updateQuantity', () => {
    it('increases quantity by delta', () => {
      const products = [product(1, 10, 2)];
      const { updatedProducts, total, totalQuantity } = updateQuantity(products, 1, 1);
      expect(updatedProducts[0].quantity).toBe(3);
      expect(updatedProducts[0].total).toBe(30);
      expect(total).toBe(30);
      expect(totalQuantity).toBe(3);
    });

    it('decreases quantity by delta', () => {
      const products = [product(1, 10, 3)];
      const { updatedProducts, total, totalQuantity } = updateQuantity(products, 1, -1);
      expect(updatedProducts[0].quantity).toBe(2);
      expect(total).toBe(20);
      expect(totalQuantity).toBe(2);
    });

    it('does not go below quantity 1', () => {
      const products = [product(1, 10, 1)];
      const { updatedProducts } = updateQuantity(products, 1, -5);
      expect(updatedProducts[0].quantity).toBe(1);
      expect(updatedProducts[0].total).toBe(10);
    });

    it('leaves other products unchanged', () => {
      const products = [product(1, 10, 1), product(2, 20, 1)];
      const { updatedProducts } = updateQuantity(products, 1, 2);
      expect(updatedProducts[0].quantity).toBe(3);
      expect(updatedProducts[1]).toEqual(products[1]);
    });
  });

  describe('calculateTotals', () => {
    it('sums total and totalQuantity', () => {
      const products = [product(1, 10, 2), product(2, 5, 4)];
      const result = calculateTotals(products);
      expect(result.total).toBe(40);
      expect(result.totalQuantity).toBe(6);
    });

    it('returns zeros for empty array', () => {
      const result = calculateTotals([]);
      expect(result.total).toBe(0);
      expect(result.totalQuantity).toBe(0);
    });
  });
});
