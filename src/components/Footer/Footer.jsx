import amazonPayLog from "../../assets/images/amazon-pay.png"
import americanExpressLog from "../../assets/images/American-Express-Color.png"
import mastercard from "../../assets/images/mastercard.webp"
import visaLogo from "../../assets/images/visaLogo.png"
import paypal from "../../assets/images/paypal.png"
import apple from "../../assets/images/get-apple-store.png"
import google from "../../assets/images/get-google-play.png"
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'
import React from "react"
export default function Footer() {
    console.log(style)
    return (
        <footer className='pt-12'>
            <div className=" w-[80%] mx-auto sm:container  ">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:justify-items-center justify-items-star">
                    {/*section of our help*/}
                    <div className=' md:justify-self-start  '>
                        <h2 className='text-2xl cursor-default font-semibold mb-2 text-textColor'>Let Us Help You</h2>
                        <ul className='cursor-pointer duration-700 transition-all'>
                            <li className={`${style.listItem} w-fit`}>Help</li>
                            <li className={`${style.listItem} w-fit`}>Shipping & Delivery</li>
                            <li className={`${style.listItem} w-fit`}>Returns & Replacements</li>
                            <li className={`${style.listItem} w-fit`}>Recalls and Product Safety Alerts</li>
                        </ul>
                    </div>
                    {/*section of support*/}
                    <div className=' md:justify-self-center'>
                        <h2 className='text-2xl cursor-default font-semibold mb-2 text-textColor'>Support</h2>
                        <ul className='cursor-pointer'>
                            <li className={`${style.listItem} w-fit`}>Phone: +2(0) 1120 847 850</li>
                            <li className={`${style.listItem} w-fit`}>Email: Mahmoudsaeed0112074@gmail.com</li>
                            <li className={`${style.listItem} w-fit`}>Address: 1234 Street Cairo, Egypt</li>
                        </ul>
                    </div>
                    {/*section about us */}
                    <div className=' lg:justify-self-end '>
                        <h2 className='text-2xl cursor-default font-semibold mb-2 text-textColor'>About Us</h2>
                        <ul className='cursor-pointer'>
                            <li className={`${style.listItem} w-fit`}>Privacy Policy</li>
                            <li className={`${style.listItem} w-fit`}>Events</li>
                            <li className={`${style.listItem} w-fit`}>Our Stop</li>
                        </ul>
                        <h3 className='text-2xl cursor-default font-semibold mb-2 text-textColor'>Follow Us Now:</h3>
                        <ul className='flex gap-3 cursor-pointer'>
                            <li className=' size-8 rounded-full border hover:bg-secondColor duration-200 transition-colors hover:text-white  border-black/50 flex justify-center items-center'>
                                <Link to={"https://www.facebook.com/profile.php?id=100005360088833"} target='_blank' className=" self-center  fa-brands fa-facebook-f"></Link>
                            </li>
                            <li className=' size-8 rounded-full border hover:bg-secondColor duration-200 transition-colors hover:text-white  border-black/50 flex justify-center items-center'>
                                <Link to={"https://www.linkedin.com/in/mahmoud-saeed-8890092b5/"} target='_blank' className=" self-center  fa-brands fa-linkedin"></Link>
                            </li>
                            <li className=' size-8 rounded-full border hover:bg-secondColor duration-200 transition-colors hover:text-white  border-black/50 flex justify-center items-center'>
                                <Link to={"https://www.instagram.com/mahmoud_sa3eed_/"} target='_blank' className=" self-center  fa-brands fa-instagram"></Link>
                            </li>
                            <li className=' size-8 rounded-full border hover:bg-secondColor duration-200 transition-colors hover:text-white  border-black/50 flex justify-center items-center'>
                                <Link to={"mailto:mahmoudsaeed0112074@gmail.com"} target='_blank' className=" self-center  fa-brands fa-google"></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*section of Subscribe */}
                <div className='border-b-2 pb-8'>
                    <h2 className='text-2xl cursor-default font-semibold text-textColor'>Are you new with us?</h2>
                    <p className='my-3 text-textColor cursor-default'>Subscribe to our newsletter to get updates on our latest offers!</p>
                    <div className="md:flex gap-4">
                        <input
                            type="text"
                            className='flex-grow shadow-none w-[90%] outline-none p-2 rounded-md'
                            placeholder='Email..'
                        />
                        <button className='btn mt-2'>Subscribe </button>
                    </div>
                </div>

                {/*section of Payment */}
                <div className='flex justify-between items-center my-8'>
                    <div className='flex-wrap flex gap-2 items-center'>
                        <span className='me-3 text-textColor  cursor-default font-semibold'>Payment Partners</span>
                        <img src={amazonPayLog} alt="Amazon Pay" className='w-16' />
                        <img src={americanExpressLog} alt="American Express" className='w-16' />
                        <img src={paypal} alt="Paypal" className='w-16' />
                        <img src={visaLogo} alt="Visa" className='w-16' />
                        <img src={mastercard} alt="Mastercard" className='w-16' />
                    </div>

                    <div className='flex-wrap flex gap-2 items-center'>
                        <span className='me-3 text-textColor  cursor-default font-semibold'>Get App Now</span>
                        <div className='sm:flex'>
                            <img src={apple} alt="Amazon Pay" className='w-28' />
                            <img src={google} alt="American Express" className='w-28' />
                        </div>
                    </div>
                </div>
            </div>
            {/*section of >Privacy Policy */}
            <div className='bg-[#1D242D] text-white/60 p-6'>
                <div className='container flex justify-between'>
                    <div className='flex space-x-4   cursor-default'>
                        <p>Privacy Policy</p>
                        <p>Terms of Use</p>
                    </div>
                    <div className='  cursor-default'>
                        Copyright © 2022, Outreach Monks. All rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}
