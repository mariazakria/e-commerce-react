import React,{ useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Group from "../../assets/images/Group 2014.png"
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as yup from "yup"
import { userContextProvider } from '../../Context/UserContextProvider';
import Button from '../../components/Button/Button';

export default function Login() {
    const [isEmailFocused, setIsFocused] = useState(false);
    const [isPassowrdFocused, setIsPassowrdFocused] = useState(false);
    const navigate = useNavigate()
    const { settoken } = useContext(userContextProvider)
    const [error, seterror] = useState("")
    const [isLoding, setLoding] = useState(false)
    const validation = yup.object({
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
    })
    async function handleShmbit(values) {
        let id;
        setLoding(true)
        try {
            id = toast.loading("waiting...")
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            toast.dismiss(id)
            toast.success("weclome back again..!")
            settoken(data.token)
            localStorage.setItem("token", data.token)
            if (data.message === "success") {
                navigate("/")
            }
        }
        catch (error) {
            setLoding(false)
            seterror(error.response.data.message)
            toast.dismiss(id)
            toast.error(error.response.data.message)
        }
    }
    let formik = useFormik({
        initialValues:
        {
            "email": "",
            "password": "",
        }
        ,
        validationSchema: validation,
        onSubmit: handleShmbit
    })
    return (
        <div className="login-page flex my-8 flex-col   lg:flex-row lg:justify-between">
            <div className="form-container bg-white p-5 lg:p-4 sm:p-9 rounded-lg shadow-black/10 shadow-lg flex flex-col justify-center items-center w-full lg:w-[40%] xl:w-[50%] z-10 mb-5" >
                {error ? <p className='text-red-500 text-sm mt-1 block'>{error}</p> : ""}
                <h2 className="text-center text-3xl font-bold text-textColor mb-6">Welcome Back..!</h2>
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
                        <label
                            className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isPassowrdFocused ? "-translate-y-4 text-xs" : ""
                                }`}
                        >
                            Your passowrd
                        </label>
                        <input htmlFor="password"
                            type="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="mb-6 p-3 border-b-2   w-full  shadow-none outline-none "
                            onFocus={() => setIsPassowrdFocused(true)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password ? <p className='text-red-500 text-sm mt-1 block'> {formik.errors.password}</p> : ""}
                    </div>

                    <Button
                        type='submit'
                        disabled={!formik.dirty || !formik.isValid ? true : false}
                        className="btn  mx-auto  hover:bg-second  transition duration-300 ">
                        {isLoding ? <i className=' fa-spin  fa-spinner fas '> </i> : "Sing in"}

                    </Button>
                </form>
                <div className="mt-4 text-center w-full">
                    <Link to={"/ForgetPassword"} className=" cursor-pointer hover:underline text-sm">Forgot Your Password ? </Link>
                </div>
                <div className="social-login mt-6 text-center w-full">
                    <Button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                        </svg>
                        Sign in with Facebook
                    </Button>
                    <Button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                        </svg>
                        Sign in with Google
                    </Button>
                </div>


                <div className="mt-4 text-center w-full">
                    <p className="  text-sm">i don`t have an account ? <Link to={"/Register"} className='text-[#F47458] cursor-pointer'>sign up</Link></p>
                </div>
            </div>

            <div className="bg-white group  rounded-lg  mb-5 ">
                <img src={Group} className='w-full duration-700 transition-all hover:rotate-1 rounded-lg h-full object-cover' alt="" />
            </div>
        </div>
    );
}


