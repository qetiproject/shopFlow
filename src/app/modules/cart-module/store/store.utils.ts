import { CartProduct } from '@cart-module';

export const addOrUpdateProduct = (products: CartProduct[], incoming: CartProduct) => {
  let found = false;

  const updatedProducts = products.map((p) => {
    if (p.id === incoming.id) {
      found = true;
      const newQuantity = p.quantity + incoming.quantity;
      return { ...p, quantity: newQuantity, total: newQuantity * p.price };
    }
    return p;
  });

  if (!found) {
    updatedProducts.push({ ...incoming, total: incoming.quantity * incoming.price });
  }

  return updatedProducts;
};

export const updateQuantity = (products: CartProduct[], id: number, delta: number) => {
  const updatedProducts = products.map((p) => {
    if (p.id === id) {
      const newQuantity = Math.max(p.quantity + delta, 1);
      return { ...p, quantity: newQuantity, total: newQuantity * p.price };
    }
    return p;
  });

  const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
  const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);

  return { updatedProducts, total, totalQuantity };
};

export const calculateTotals = (products: CartProduct[]) => ({
  total: products.reduce((sum, p) => sum + p.total, 0),
  totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
});
