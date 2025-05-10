export default function ProductForm({ onSubmit, initialValues = {} }) {
  const handleSubmit = formData => {
    const values = Object.fromEntries(formData);
    const product = { ...initialValues, ...values };
    onSubmit(product);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" defaultValue={initialValues.name} />
      <input type="text" name="amount" defaultValue={initialValues.amount} />
      <button type="submit">Add product</button>
    </form>
  );
}
