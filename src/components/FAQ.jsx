import React from 'react'

export default function FAQ() {
    return (
        <div>
            <section className="my-10">
                <h2 className="text-center text-3xl my-5">FAQ (Frequently asked questions)</h2>
                <div className="collapse collapse-arrow bg-base-200 ">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-xl font-medium">What do you know about e-commerce?</div>
                    <div className="collapse-content">
                        <p>The online buying and selling of products and services.
                            This includes both business-to-consumer (B2C) and business-to-business (B2B) transactions.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">What do you know about e-commerce benefits?</div>
                    <div className="collapse-content">
                        <p>Global Reach: Businesses can access a global market,
                            allowing them to reach customers beyond their local area.
                        </p>
                        <p> Lower Operational Costs: E-business often reduces overhead
                            costs associated with physical storefronts, such as rent and utilities.
                        </p>
                        <p>Improved Customer Experience: Personalized marketing, easy navigation, and quick
                            transactions enhance the customer journey.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
