import { useFormik } from 'formik';
import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import * as yup from "yup"
import axios from 'axios';

export default function EmailCode() {
    const [isLoding, setLoding] = useState(false)
    const [isResetCodelFocused, setIsFocused] = useState(false);
    const navigate = useNavigate()
    const validation = yup.object({
        resetCode: yup
            .string()
            .required("Please enter the reset code sent to your email.")
            .matches(/^\d{4,8}$/, "The reset code must be between 4 and 8 digits."),
    });
    async function handleShmbit(values) {
        let id;
        setLoding(true)
        try {
            id = toast.loading("Verifying code......")
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
            console.log(data)
            if (data.status === "Success") {
                navigate('/ResetPassword')
            }
            toast.dismiss(id)
            toast.success(" Code verified successfully! You can now reset your password.!")
            console.log(data)
            localStorage.setItem("token", data.token)
        }
        catch (error) {
            setLoding(false)
            toast.dismiss(id)
            toast.error(error.response.data.message)
            console.log(error)
        }

    }
    let formik = useFormik({
        initialValues:
        {
            "resetCode": "",
        }
        ,
        validationSchema: validation,
        onSubmit: handleShmbit
    })

    return (
        <>
            <div className="login-page flex  mt-16  justify-center">
                <div className="form-container bg-white p-5  sm:p-9 rounded-lg relative shadow-black/10 shadow-lg flex flex-col justify-center items-center w-full lg:w-[45%] xl:w-[50%] z-10 mb-5" >
                    <Link to="/ForgetPassword"><i className="fa-solid fa-arrow-left absolute top-5 left-4"></i></Link>
                    <h2 className="text-center text-3xl font-bold text-textColor mb-6">Verify Your Code </h2>
                    <form className="w-full max-w-md text-center" onSubmit={formik.handleSubmit}>
                        <div className="relative w-full max-w-xs mx-auto my-4">
                            <label htmlFor=""
                                className={`absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 ${isResetCodelFocused ? "-translate-y-4 text-xs" : ""
                                    }`}
                            >
                                Reset Code
                            </label>
                            <input
                                type="tel"
                                name='resetCode'
                                value={formik.values.resetCode}
                                onChange={formik.handleChange}
                                className="mb-6 p-3 border-b-2   w-full  shadow-none outline-none "
                                onFocus={() => setIsFocused(true)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.resetCode && formik.touched.resetCode ? <p className='text-red-500 text-sm mt-1 block'> {formik.errors.resetCode}</p> : ""}

                        </div>
                        <div className='flex justify-center'>

                            <button
                                type='submit'
                                className="btn m-0  hover:bg-second  transition duration-300 ">
                                {isLoding ? <i className=' fa-spin  fa-spinner fas '></i> : "Verify Code"}

                            </button>
                            <Link
                                to={"/ForgetPassword"}
                                // onClick={resendCode}
                                className="btn m-0 hover:bg-second  transition duration-300 ms-5"
                            >
                                Resend Code
                            </Link>
                        </div>
                    </form>
                </div>


            </div>

        </>
    )
}
