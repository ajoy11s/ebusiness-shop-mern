import React from 'react';

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-72"
                style={{
                    backgroundImage: "url(/images/online-shop-banner.png)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-screen-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5 font-voltaire text-xl text-justify">
                            E-business is significant because it allows companies to reach a global audience, improve operational efficiency,
                            and gather valuable data on consumer behavior. As technology evolves, so too do the strategies and tools used in e-business,
                            making it a dynamic and essential aspect of modern commerce.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;