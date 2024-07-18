export const createProduct = (req, res) => {
  const { body } = req.body;

  return res.json({
    message: `Product ${body} created`,
    product: body,
  });
};

export const getAllProducts = (req, res) => {
  const { name, price } = req.query;

  console.log(name, price);

  return res.json([
    {
      id: 1,
      name: "Product 1",
    },
    {
      id: 2,
      name: "Product 2",
    },
  ]);
};

export const getProductById = (req, res) => {
  const { id } = req.params;

  return res.json({
    id: parseInt(id),
    name: `Product ${id}`,
  });
};
