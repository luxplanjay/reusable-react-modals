import { useState } from 'react';
import Modal from './Modal';
import ProductForm from './ProductForm';

// enum
const ActiveModal = Object.freeze({
  Add: 'add',
  Edit: 'edit',
  None: 'none',
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeModal, setActiveModal] = useState(ActiveModal.None);
  const closeModal = () => setActiveModal(ActiveModal.None);

  const addProduct = newProduct => {
    const product = { id: crypto.randomUUID(), ...newProduct };
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const editProduct = updatedProduct => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      }),
    );
    closeModal();
  };

  const handleEditClick = product => {
    setSelectedProduct(product);
    setActiveModal(ActiveModal.Edit);
  };

  return (
    <>
      <button onClick={() => setActiveModal(ActiveModal.Add)}>Add product</button>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} | {product.amount} |
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {activeModal === ActiveModal.Edit && (
        <Modal onClose={closeModal}>
          <ProductForm onSubmit={editProduct} initialValues={selectedProduct} />
        </Modal>
      )}

      {activeModal === ActiveModal.Add && (
        <Modal onClose={closeModal}>
          <ProductForm onSubmit={addProduct} />
        </Modal>
      )}
    </>
  );
}
