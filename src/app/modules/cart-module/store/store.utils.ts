import type { CartProduct } from '@app-types/dto';

export const addOrUpdateProduct = (products: CartProduct[], incoming: CartProduct) => {
  const updatedProducts = products.reduce<CartProduct[]>((acc, p) => {
    if (p.id === incoming.id) {
      const quantity = p.quantity + incoming.quantity;
      acc.push({ ...p, quantity, total: quantity * p.price });
    } else {
      acc.push(p);
    }
    return acc;
  }, []);

  if (!updatedProducts.find((p) => p.id === incoming.id)) {
    updatedProducts.push({ ...incoming, total: incoming.quantity * incoming.price });
  }

  return updatedProducts;
};

export const updateQuantity = (products: CartProduct[], id: number, delta: number) => {
  const updatedProducts = products.map((p) =>
    p.id === id
      ? {
          ...p,
          quantity: Math.max(p.quantity + delta, 1),
          total: Math.max(p.quantity + delta, 1) * p.price,
        }
      : p,
  );

  const { total, totalQuantity } = calculateTotals(updatedProducts);

  return { updatedProducts, total, totalQuantity };
};

export const calculateTotals = (products: CartProduct[]) => ({
  total: products.reduce((sum, p) => sum + p.total, 0),
  totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
});
