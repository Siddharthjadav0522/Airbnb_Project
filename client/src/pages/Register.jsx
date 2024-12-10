import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return handleError("Please fill in all fields");
        }
        try {
            const response = await axios.post("/user/register", {
                name,
                email,
                password,
            });
            const { message, success, error } = response.data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "An error occurred.";
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed .";
            handleError(errorMessage);
        }
    };

    return (
        <>
            <div className="md:min-h-[600px] min-h-[500px] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                        Register
                    </h1>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input
                            className="w-full border border-gray-400 rounded-2xl py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full border border-gray-400 rounded-2xl py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full border border-gray-400 rounded-2xl py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-rose-500 hover:bg-rose-600 text-white w-full py-2 px-4 rounded-2xl transition-all"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                    <div className="py-4 text-center text-gray-500">
                        Already a member?{" "}
                        <Link to="/login" className="text-black hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Register;
