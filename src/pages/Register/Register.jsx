import React,{ useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Group from "../../assets/images/Group 2014.png"
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as yup from "yup"
import Button from '../../components/Button/Button';
import { userContextProvider } from '../../Context/UserContextProvider';
export default function Register() {
    const navigate = useNavigate()
    const { settoken } = useContext(userContextProvider)
    const [isNmaeFocused, setIsNmaeFocused] = useState(false);
    const [isEmailFocused, setIsFocused] = useState(false);
    const [isPassowrdFocused, setIsPassowrdFocused] = useState(false);
    const [isrePassowrdFocused, setIsrePassowrdFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [error, seterror] = useState("")
    const [isLoding, setLoding] = useState(false)
    const validation = yup.object({
        name: yup
            .string()
            .required("The name field is required.")
            .min(3, "The name must be at least 3 characters.")
            .max(25, "The name cannot exceed 25 characters."),
        email: yup
            .string()
            .required("The email field is required.")
            .email("Please enter a valid email address."),
        password: yup
            .string()
            .required("The password field is required.")
            .matches(
                /^[A-Z].{5,25}$/,
                "The password must start with an uppercase letter and be between 6 and 25 characters."
            ),
        rePassword: yup
            .string()
            .required("The confirmation password is required.")
            .oneOf([yup.ref("password")], "Passwords do not match."),
        phone: yup
            .string()
            .required("The phone number is required.")
            .matches(
                /^01[0125][0-9]{8}$/,
                "Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015."
            )
    })

    async function handleShmbit(values) {
        let id;
        setLoding(true)
        try {
            id = toast.loading("waiting...")
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            toast.dismiss(id)
            toast.success("you with us now ")
            console.log(data)
            settoken(data.token)
            localStorage.setItem("token", data.token)
            if (data.message === "success") {
                navigate("/")
            }
        }
        catch (error) {
            setLoding(false)
            //for error masge and put in a stata 
            seterror(error.response.data.message)
            toast.dismiss(id)
            toast.error(error.response.data.message)

        }


    }
    let formik = useFormik({
        initialValues:
        {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        }
        ,
        validationSchema: validation,
        onSubmit: handleShmbit
    })

    return (
        <><div className="login-page flex my-8 flex-col lg:flex-row lg:justify-between">
            <div className="form-container bg-white p-5 lg:p-4  sm:p-9 rounded-lg shadow-black/10 shadow-lg flex flex-col justify-center items-center w-full lg:w-[40%] xl:w-[50%] z-10 mb-5" >
            {error ? <p className='text-red-500 text-sm mt-1 block'>{error}</p> : ""}
                <h2 className="text-center text-3xl font-bold text-textColor mb-6">Welcome to our Store..!</h2>
                <form className="w-full max-w-md text-center" onSubmit={formik.handleSubmit}>
                    {/* Name Input */}
                    <div className="relative w-full max-w-xs mx-auto my-4">
                        <label htmlFor="name" className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isNmaeFocused ? "-translate-y-4 text-xs" : ""}`}>
                            Your Name
                        </label>
                        <input
                            type="text"
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
                            onFocus={() => setIsNmaeFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? <p className='text-red-500 text-sm mt-1 block'>{formik.errors.name}</p> : ""}
                    </div>
                    {/* Email Input */}
                    <div className="relative w-full max-w-xs mx-auto my-4">
                        <label htmlFor="email" className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isEmailFocused ? "-translate-y-4 text-xs" : ""}`}>
                            Your Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
                            onFocus={() => setIsFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email ? <p className='text-red-500 text-sm mt-1 block'>{formik.errors.email}</p> : ""}
                    </div>
                    {/* Password Input */}
                    <div className="relative w-full max-w-xs mx-auto my-4">
                        <label htmlFor="password" className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isPassowrdFocused ? "-translate-y-4 text-xs" : ""}`}>
                            Your Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
                            onFocus={() => setIsPassowrdFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password ? <p className='text-red-500 text-sm mt-1 block'>{formik.errors.password}</p> : ""}
                    </div>
                    {/* RePassword Input */}
                    <div className="relative w-full max-w-xs mx-auto my-4">
                        <label htmlFor='rePassword' className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isrePassowrdFocused ? "-translate-y-4 text-xs" : ""}`}>
                            RePassword
                        </label>
                        <input
                            type="password"
                            name='rePassword'
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
                            onFocus={() => setIsrePassowrdFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-red-500 text-sm mt-1 block'>{formik.errors.rePassword}</p> : ""}
                    </div>
                    {/* Phone Input */}
                    <div className="relative w-full max-w-xs mx-auto my-4">
                        <label htmlFor="phone" className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isPhoneFocused ? "-translate-y-4 text-xs" : ""}`}>
                            Your Phone
                        </label>
                        <input
                            type="tel"
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className="mb-6 p-3 border-b-2 w-full shadow-none outline-none"
                            onFocus={() => setIsPhoneFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone && formik.touched.phone ? <p className='text-red-500 text-sm mt-1 block'>{formik.errors.phone}</p> : ""}
                    </div>
                    {/* Submit Button */}
                    <Button
                        type='submit'
                        disabled={!formik.dirty || !formik.isValid ? true : false}
                        className="btn mx-auto hover:bg-second transition duration-300">
                        {isLoding ? <i className=' fa-spin fa-spinner fas '> </i> : "Sign up"}
                    </Button>
                </form>
            </div>

            <div className="bg-white group rounded-lg mb-5">
                <img src={Group} className='w-full duration-700 transition-all hover:rotate-1 h-full object-cover' alt="" />
            </div>
        </div>

        </>
    )
}
