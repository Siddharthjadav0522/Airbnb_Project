import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(120);
    const navigate = useNavigate();

    useEffect(() => {
        let countdown;
        if (isOtpSent && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsOtpSent(false);
            handleError("OTP has expired. Please request a new one.");
        }
        return () => clearInterval(countdown);
    }, [isOtpSent, timer]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendOtp = async () => {
        if (!name || !email || !password) {
            return handleError("Please fill in all fields before requesting OTP.");
        }

        if (!validateEmail(email)) {
            return handleError("Invalid email format. Please enter a valid email address.");
        }

        try {
            const response = await axios.post("/user/register/send-otp", { email });
            const { message, success } = response.data;
            if (success) {
                handleSuccess(message);
                setIsOtpSent(true);
                setTimer(120);
            } else {
                handleError(message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to send OTP. Please try again.";
            handleError(errorMessage);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !otp) {
            return handleError("Please fill in all fields and enter the OTP.");
        }

        if (!validateEmail(email)) {
            return handleError("Invalid email format. Please enter a valid email address.");
        }

        try {
            const response = await axios.post("/user/register", {
                name,
                email,
                password,
                otp,
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
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            handleError(errorMessage);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <>
            <div className="md:min-h-[630px] min-h-[638px] flex items-center justify-center md:p-4">
                <div className="w-full max-w-md bg-white md:p-6 p-3 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center md:mb-9 mb-8 text-gray-700">
                        Register
                    </h1>
                    <form>
                        <input
                            className="w-full border mb-4 border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full border mb-4 border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full border mb-4 border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {isOtpSent && (
                            <>
                                <input
                                    className="w-full border mb-4 border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value) && value.length <= 4) {
                                            setOtp(value);
                                        }
                                    }}
                                />
                                <p className="text-center text-gray-600">
                                    OTP expires in: <span>{formatTime(timer)}</span>
                                </p>
                            </>
                        )}

                        {!isOtpSent ? (
                            <button
                                onClick={sendOtp}
                                className="bg-rose-500 mt-4 hover:bg-rose-600 text-white w-full py-2 px-4 rounded-md transition-all"
                                type="button"
                            >
                                Send OTP
                            </button>
                        ) : (
                            <button
                                onClick={handleRegister}
                                className="bg-rose-500 mt-4 hover:bg-rose-600 text-white w-full py-2 px-4 rounded-md transition-all"
                                type="submit"
                            >
                                Register
                            </button>
                        )}
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
