
import React from 'react'
import { Link } from 'react-router-dom'
export default function Error() {
    return (
        <div>
            <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-6xl font-extrabold text-secondColor dark:text-red-500">Oops!</h1>
                    <p className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Something went wrong
                    </p>
                    <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
                        It seems there`s an issue with your connection or an unexpected error occurred. Please try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900"
                    >
                        Try Again
                    </button>
                    <br />
                    <Link
                        to="/"
                        className="mt-4 inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-900"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </section>


        </div>
    )

}
