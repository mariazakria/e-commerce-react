import { useFormik } from 'formik';
import  React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import * as yup from "yup"
import axios from 'axios';
export default function ResetPassword() {
    const [isLoding, setLoding] = useState(false)
    const [isEmailFocused, setIsFocused] = useState(false);
    const [isPassowrdFocused, setIsPassowrdFocused] = useState(false);

    const navigate = useNavigate()
    const validation = yup.object({
        email: yup
            .string()
            .required("Email is required.")
            .email("Please enter a valid email address."),
        newPassword: yup
            .string()
            .required("Password is required.")
            .matches(
                /^[A-Z].{5,25}$/,
                "Password must start with an uppercase letter and be between 6 and 25 characters."
            ),
    })
    async function handleShmbit(values) {
        let id;
        setLoding(true)
        try {
            id = toast.loading("Resetting your password...")
            const  {data}  = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            console.log(data)
            localStorage.setItem("token", data.token)
            if (data.token) {
                navigate('/Login')
            }
            setLoding(false)
            toast.dismiss(id)
            toast.success("Password reset successfully! You can now log in.")
        }
        catch (error) {
            setLoding(false)
            toast.dismiss(id)
            toast.error(error.response?.data?.message || "An error occurred. Please try again")
        }

    }
    let formik = useFormik({
        initialValues:
        {
            "email": "",
            "newPassword": ""
        }
        ,
        validationSchema: validation,
        onSubmit: handleShmbit
    })

    return (
        <>
            <div className="login-page flex  mt-16  justify-center">
                <div className="form-container bg-white p-5  sm:p-9 rounded-lg shadow-black/10 shadow-lg flex flex-col justify-center items-center w-full lg:w-[45%] xl:w-[50%] z-10 mb-5" >
                    <h2 className="text-center text-3xl font-bold text-textColor mb-6"> Reset Your Password</h2>
                    <p className='text-textColor text-sm mt-1 block'> Enter your email and new password below to reset your password. </p>
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
                        <div className="relative w-full max-w-xs mx-auto my-4">
                            <label htmlFor="email"
                                className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isPassowrdFocused ? "-translate-y-4 text-xs" : ""
                                    }`}
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                className="mb-6 p-3 border-b-2   w-full  shadow-none outline-none "
                                onFocus={() => setIsPassowrdFocused(true)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.newPassword && formik.touched.newPassword ? <p className='text-red-500 text-sm mt-1 block'> {formik.errors.newPassword}</p> : ""}

                        </div>

                        <button
                            type='submit'
                            disabled={!formik.dirty || !formik.isValid ? true : false}

                            className={`btn  mx-auto  hover:bg-second  transition duration-300`}>
                            {isLoding ? <i className=' fa-spin  fa-spinner fas '> </i> : "Reset Password "}
                        </button>


                    </form>

                    <div className="mt-4 text-center w-full">
                        <p className="text-sm">
                            Remembered your password?{" "}
                            <Link to={"/Login"} className="text-secondColor cursor-pointer">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>


            </div>
        </>
    )
}
