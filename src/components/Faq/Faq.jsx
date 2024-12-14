import  React, { useState } from 'react';
export default function Faq() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-8 mb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h6 className="text-lg text-secondColor font-medium text-center mb-2">
                        FAQs
                    </h6>
                    <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
                        Frequently asked questions
                    </h2>
                </div>
                <div className="accordion-group">
                    {[
                        {
                            question: 'How do I update my billing information?',
                            answer:
                                "To update your billing information, go to the 'Billing' section in your account settings.",
                        },
                        {
                            question: 'How can I contact customer support?',
                            answer:
                                "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website.",
                        },
                        {
                            question: 'How do I update my profile information?',
                            answer:
                                "To update your profile information, navigate to your profile settings and edit the desired fields.",
                        },
                        {
                            question: 'How do I find my purchase history?',
                            answer:
                                "To find your purchase history, go to the 'Orders' or 'Purchase History' section in your account dashboard.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl ${activeAccordion === index ? 'bg-indigo-50 group' : 'hover:bg-indigo-50 group'
                                }`}>
                            <button
                                className={`accordion-toggle  inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left ${activeAccordion === index ? 'text-secondColor  font-medium' : 'group-hover:text-secondColor -600'
                                    }`}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeAccordion === index}
                            >
                                <h5 >{item.question}</h5>
                                <svg
                                    className={`text-gray-500 transition duration-500 group-hover:text-secondColor  ${activeAccordion === index ? 'rotate-180 text-secondColor ' : ''
                                        }`}
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <div
                                className="accordion-content w-full px-0 overflow-hidden transition-max-height duration-500"
                                style={{
                                    maxHeight: activeAccordion === index ? '250px' : '0',
                                }}
                            >
                                <p className="text-base text-gray-900 leading-6">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
