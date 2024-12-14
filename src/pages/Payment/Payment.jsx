import { useFormik } from 'formik';
import * as Yup from 'yup';
import React,{ useContext, useState } from 'react';
import { cartUserProvuder } from '../../Context/CartProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import toast from 'react-hot-toast';

export default function Payment() {
  const { cartId, numOfCartItems, totalCartPrice } = useContext(cartUserProvuder);
  const [isLodingCash, setLodingCash] = useState(false);
  const [isLodingOnLine, setLodingOnLine] = useState(false);
  const [payment, setpayment] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be 10 digits"),
    city: Yup.string()
      .required("City is required")
      .min(3, "City name must be at least 3 characters long"),
    details: Yup.string()
      .required("Details are required")
      .min(5, "Details must be at least 5 characters long"),
  });

  async function handleSubmitOnlelinePayment(apiObj) {
    setLodingOnLine(true);
    // Check if cart has items
    if (!cartId) {
      toast.error("Your cart is empty. Please add items to proceed.");
      setLodingOnLine(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { apiObj },
        { headers: { token } }
      );
      window.open(data.session.url, "_self");
    } catch (error) {
      setLodingOnLine(false);
      if (error.response) {
        // Handle specific error response
        toast.error(error.response.data.message || "An error occurred, please try again.");
      } else {
        // Handle network or unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  async function handleSubmitCashPayment(apiObj) {
    setLodingCash(true);

    // Check if cart has items
    if (!cartId) {
      toast.error("Your cart is empty. Please add items to proceed.");
      setLodingCash(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { apiObj },
        { headers: { token } }
      );
      if(data){
        return navigate('/allorders');
      }
    } catch (error) {
      setLodingCash(false);
      if (error.response) {
        // Handle specific error response
        toast.error(error.response.data.message || "An error occurred, please try again.");
      } else {
        // Handle network or unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }


  function hanlePyment(values) {
    let apiObj = {
      shippingAddress: values,
    };

    if (payment) {
      handleSubmitCashPayment(apiObj);
    } else {
      handleSubmitOnlelinePayment(apiObj);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema, // Add validation schema here
    onSubmit: hanlePyment,
  });

  return (
    <section className="px-4 sm:px-8 lg:px-16">
      <form className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 my-12" onSubmit={formik.handleSubmit}>
        <div>
          <h1 className="text-center my-4 text-textColor font-bold text-lg md:text-xl">Please enter your details</h1>
          <div className="relative w-full max-w-md mx-auto my-4">
            <input
              name="phone"
              type="tel"
              placeholder="Enter your phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-600">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="relative w-full max-w-md mx-auto my-4">
            <input
              name="city"
              type="text"
              placeholder="Enter your city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-600">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className="relative w-full max-w-md mx-auto my-4">
            <input
              name="details"
              type="text"
              placeholder="Enter your details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="text-red-600">{formik.errors.details}</div>
            ) : null}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 w-full">
          <p className="text-xl font-semibold text-gray-900 dark:text-white text-center">Order Summary</p>
          <div className="space-y-4 mt-4">
            <dl className="flex justify-between">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">{totalCartPrice}$</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-600">-$00</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">$00</dd>
            </dl>
            <dl className="flex justify-between border-t pt-4 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total item</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">{numOfCartItems}</dd>
            </dl>
            <dl className="flex justify-between border-t pt-4 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">{totalCartPrice}$</dd>
            </dl>
          </div>
          <Button
            className="text-white rounded-md py-2 mt-4 w-full block bg-blue-500 hover:bg-blue-600"
            type="submit"
            onClick={() => setpayment(true)}
          >
            {isLodingCash ? <i className="fa-spin fa-spinner fas "></i> : " Cash Order"}
          </Button>
          <p className="text-center w-full my-2">or</p>
          <Button
            className="block mt-4 w-full text-white rounded-md py-2 bg-lime-500 hover:bg-lime-600"
            type="submit"
            onClick={() => setpayment(false)}
          >
            {isLodingOnLine ? <i className="fa-spin fa-spinner fas "></i> : " Online Payment"}
          </Button>
        </div>
      </form>
    </section>
  );
}
