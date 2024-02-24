import { FC } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import ProductContext from "./context/productContext";
interface AddProductFormProps {
  addProduct: () => void;
  productName: string;
  setProductName: (value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  rate: number;
  setRate: (value: number) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddProductForm: FC<AddProductFormProps> = (props) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-1/3 p-5 shadow-md bg-white border">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <div className="mb-4">
        <label className="block mb-2">Product Name:</label>
        <input
          type="text"
          value={props.productName}
          onChange={(e) => props.setProductName(e.target.value)}
          className="border rounded px-2 py-1 mb-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          value={props.quantity}
          onChange={(e) => props.setQuantity(parseInt(e.target.value))}
          className="border rounded px-2 py-1 mb-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Rate:</label>
        <input
          type="number"
          value={props.rate}
          onChange={(e) => props.setRate(parseInt(e.target.value))}
          className="border rounded px-2 py-1 mb-2 w-full"
        />
      </div>
      <button
        onClick={props.addProduct}
        className="bg-blue-500 text-white px-4 py-2 mb-4 w-full"
      >
        Add Product
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 w-full "
        onClick={() => props.setShowModal(false)}
      >
        Close
      </button>
    </div>
  );
};

export default AddProductForm;
