import { useState } from "react";
import useCategories from "../../hook/useCategorye";
import './AddProduct.scss'

function AddProduct() {
  const api = "http://localhost:5000/addproduct";
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const [products, setProduct] = useState({
    productName: "",
    categoryId: "",
    description: "",
    price: "",
    image: null,
  });

  const [ data ] = useCategories();
  console.log(data[0].categoryName);

  const onInputChange = (e) => {
    setProduct({ ...products, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setProduct({ ...products, image: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", products.productName);
    formData.append("categoryId", products.categoryId);
    formData.append("description", products.description);
    formData.append("price", products.price);
    formData.append("image", products.image);

    fetch(api, {
      method: "POST",
      headers: {
        
        'Authorization': `Bearer ${token}`,
      },

      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product added successfully:", data);
    
        setProduct({
          productName: "",
          categoryId: "",
          description: "",
          price: "",
          image: null,
        });
      })
      .catch((error) => {
        console.error("Error adding the product:", error);
      });
  };

  return (
    <div className="AddProduct">
      <h2>Add Product</h2>
      <form onSubmit={onSubmit}>
        <div className="inp">
          <input
            type="text"
            placeholder="Product Name"
            value={products.productName}
            onChange={onInputChange}
            name="productName"
          />
        </div>

        <div className="inp">
          <select
            name="categoryId"
            value={products.categoryId}
            onChange={onInputChange}
          >
            <option value="">Select Category</option>
            {data?.map((category, i) => (
              <option key={i} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="inp">
          <textarea
            type="text"
            placeholder="Description"
            value={products.description}
            onChange={onInputChange}
            name="description"
          />
        </div>

        <div className="inp">
          <input
            type="text"
            placeholder="Price"
            value={products.price}
            onChange={onInputChange}
            name="price"
          />
        </div>

        <div className="inp">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            name="image"
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
