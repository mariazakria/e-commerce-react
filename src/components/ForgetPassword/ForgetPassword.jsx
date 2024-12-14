import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import * as yup from "yup"
import axios from 'axios';
export default function ForgetPassword() {
    const [isLoding, setLoding] = useState(false)
    const [isEmailFocused, setIsFocused] = useState(false);
    const navigate = useNavigate()
    const validation = yup.object({
        email: yup
            .string()
            .required("The email field is required.")
            .email("Please enter a valid email address."),
    })
    async function handleShmbit(values) {
        let id;
        setLoding(true)
        try {
            id = toast.loading("Resending the code...")
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            console.log(data)
            if (data.statusMsg === "success") {
                navigate('/EmailCode')
            }
            toast.dismiss(id)
            toast.success("Code resent successfully! Check your email.")
        }
        catch (error) {
            setLoding(false)
            toast.dismiss(id)
            toast.error(error.response?.data?.message || "An error occurred while verifying the code.")
        }

    }
    let formik = useFormik({
        initialValues:
        {
            "email": "",
        }
        ,
        validationSchema: validation,
        onSubmit: handleShmbit
    })
    return (
        <>
            <div className="login-page flex  mt-16  justify-center">
                <div className="form-container bg-white p-5  sm:p-9 rounded-lg shadow-black/10 shadow-lg flex flex-col justify-center items-center w-full lg:w-[45%] xl:w-[50%] z-10 mb-5" >
                    <h2 className="text-center text-3xl font-bold text-textColor mb-6">Forgot Your Password ?</h2>
                    <p className='text-textColor text-sm mt-1 block'>No worries, just enter your email and we will help you reset it.</p>
                    <form className="w-full max-w-md text-center" onSubmit={formik.handleSubmit}>
                        <div className="relative w-full max-w-xs mx-auto my-4">
                            <label htmlFor="email"
                                className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isEmailFocused ? "-translate-y-4 text-xs" : ""
                                    }`}
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="mb-6 p-3 border-b-2   w-full  shadow-none outline-none "
                                onFocus={() => setIsFocused(true)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? <p className='text-red-500 text-sm mt-1 block'> {formik.errors.email}</p> : ""}

                        </div>

                        <button
                            type='submit'
                            disabled={!formik.dirty || !formik.isValid ? true : false}

                            className={`btn  mx-auto  hover:bg-second  transition duration-300`}>
                            {isLoding ? <i className=' fa-spin  fa-spinner fas '> </i> : "send "}
                        </button>


                    </form>

                    <div className="mt-4 text-center w-full">
                        <p className="  text-sm">Did you remember your password?  <Link to={"/Login"} className='text-[#F47458] cursor-pointer'>sign in</Link></p>
                    </div>
                </div>


            </div>
        </>
    )
}
