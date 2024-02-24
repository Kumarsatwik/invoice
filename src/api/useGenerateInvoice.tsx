import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { addLogout } from "../store/auth/authSlice";

// import { generateInvoiceTemplate } from "../constant/template";

const useGenerateInvoice = () => {
  const products = useAppSelector((state) => state.products);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const generateInvoice = async () => {
    setLoading(true);
    const productListHTML = products.products
      .map(
        (product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.rate}</td>
        <td>${product.quantity * product.rate}</td>
      </tr>`
      )
      .join("");

    const finalAmount = Number(
      products.products.reduce((acc, product) => {
        return acc + product.quantity * product.rate;
      }, 0) * 0.18
    ).toFixed(2);

    const totalAmount = Number(
      products.products.reduce((acc, product) => {
        return acc + product.quantity * product.rate;
      }, 0)
    );

    const template = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 1px solid black;
          }
          thead {
            border: none;
            border-bottom: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          img {
            height: 70px;
            width: 300px;
          }
          .totalAmount {
            margin-top: 20px;
            border-top: 1px solid black;
            float: right; /* Shift the totalAmount div to the left */
            width: 30%; /* Adjust width as needed */
          }
          .totalAmount table {
            width: 100%;
          }
          .finalAmount {
            background-color: lightgray;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            height: 50px;
            width: 370px;
            padding: 5px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Invoice Generator</h1>
          <img src="https://ik.imagekit.io/3wzfnznig/logo.png?updatedAt=1708770821250" alt="logo">
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${productListHTML}
          </tbody>
        </table>
        <div class="totalAmount">
          <table>
            <tr>
              <td>Total Amount</td>
              <td>${totalAmount}</td>
            </tr>
            <tr>
              <td>GST</td>
              <td>18%</td>
            </tr>
          </table>
          <div class="finalAmount">
            <label>Grand Total</label>
            <label>${finalAmount}</label>
          </div>
        </div>
      </body>
    </html>
  `;
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    axios
      .post<Blob>(
        `${serverUrl}/generate-pdf`,
        {
          template,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("PDF generated successfully");

        // Create object URL for the Blob data
        const url = window.URL.createObjectURL(new Blob([res.data]));

        // Create a link element to trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(addLogout());
          toast.error(err.response.statusText);
          window.location.href = "/login";
        }
        console.log(err.response.status);
        toast.error(err.response.data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { generateInvoice, loading };
};

export default useGenerateInvoice;
