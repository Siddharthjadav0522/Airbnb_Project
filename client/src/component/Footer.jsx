import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-300 md:mt-8 mt-3">

            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:py-0 py-6">

                <div className="md:py-8">
                    <h4 className="text-md font-medium mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Help Centre</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Get help with a safety issue</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">AirCover</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Anti-discrimination</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Disability support</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Cancellation options</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Report neighbourhood concern</a></li>
                    </ul>
                </div>

                <div className="md:py-8">
                    <h4 className="text-md font-medium mb-4">Hosting</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Airbnb your home</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">AirCover for Hosts</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Hosting resources</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Community forum</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Hosting responsibly</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Join a free Hosting class</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Find a co-host</a></li>
                    </ul>
                </div>

                <div className="md:py-8">
                    <h4 className="text-md font-medium mb-4">Airbnb</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Newsroom</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">New features</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Careers</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Investors</a></li>
                        <li><a href="#" className="border-b-2 border-transparent hover:border-zinc-500">Airbnb.org emergency stays</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t md:px-0 px-4 border-gray-300 py-4 md:mx-10 flex flex-col md:flex-row justify-between items-center text-sm">
                <div className="mb-4 md:mb-0">
                    © 2024 Airbnb, Inc. All rights reserved. |
                    <a href="#" className="hover:underline ml-2">Privacy</a> |
                    <a href="#" className="hover:underline ml-2">Terms</a> |
                    <a href="#" className="hover:underline ml-2">Sitemap</a>
                </div>

                <div className="flex gap-4 items-center text-xl ">
                    <a href="https://www.facebook.com/AirbnbIndia"><i className="fa-brands fa-facebook cursor-pointer"></i></a>
                    <a href="https://x.com/i/flow/login?redirect_after_login=%2Fairbnb_in"><i className="fa-brands fa-square-x-twitter cursor-pointer"></i></a>
                    <a href="https://www.instagram.com/airbnb/"><i className="fa-brands fa-square-instagram cursor-pointer"></i></a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
