import React, { useState } from "react";
import AddProductForm from "../../components/addProductForm/AddProductForm";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { addProduct as addProductAction } from "../../store/products/productSlice";

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const products = useAppSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();

  console.log(products);

  const addProduct = () => {
    const calculatedGst = calculateGST(calculateProductTotal(quantity, rate));
    const calculatedTotal =
      calculateProductTotal(quantity, rate) + calculatedGst;

    console.log(calculatedGst, calculatedTotal);

    dispatch(
      addProductAction({
        name: productName,
        quantity,
        rate,
        total: calculatedTotal,
      })
    );

    setProductName("");
    setQuantity(0);
    setRate(0);
  };
  const calculateProductTotal = (quantity: number, rate: number): number => {
    return quantity * rate;
  };

  const calculateGST = (total: number): number => {
    const gst = total * 0.18;
    return Number(gst.toFixed(2)); // Assuming GST rate is 18%
  };

  const redirectToInvoicePage = () => {
    // Redirect to the invoice generation page
  };

  return (
    <div className="container mx-auto">
      <div className="my-10 flex items-center justify-between gap-10">
        <img src="/logo.png" className="h-10 " alt="" />
        <div className="flex gap-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            {" "}
            Add product
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={redirectToInvoicePage}
          >
            {" "}
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Product form */}

      {showModal && (
        <AddProductForm
          addProduct={addProduct}
          productName={productName}
          setProductName={setProductName}
          quantity={quantity}
          setQuantity={setQuantity}
          rate={rate}
          setRate={setRate}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      {/* Invoice */}

      <div className="border w-full h-[65vh] overflow-auto mx-auto">
        {products.products.length > 0 && (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white text-xl font-semibold">
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Rate</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.products.map((product, index) => (
                  <tr key={index} className="text-lg font-semibold border my-2">
                    <td className="p-4 text-center">{product.name}</td>
                    <td className="p-4 text-center">{product.quantity}</td>
                    <td className="p-4 text-center">{product.rate}</td>

                    <td className="p-4 text-center">
                      {calculateProductTotal(product.quantity, product.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {products.products.length === 0 && (
          <p className="text-black h-20 flex items-center justify-center text-xl">
            Please add product
          </p>
        )}
      </div>

      <div className="flex flex-col w-full justify-end mt-5 ">
        <div className="flex">
          <label className="font-semibold">Total Amount with gst : </label>
          <label className="ml-2 font-bold text-xl">
            {products.products.reduce(
              (total, product) => total + product.rate * product.quantity,
              0
            )}
          </label>
        </div>
        <div className="flex">
          <label className="font-semibold">Total Quantity : </label>
          <label className="ml-2 font-bold text-xl">
            {products.products.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
