import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/user/register", {
                name,
                email,
                password
            });
            alert('Registration successful. Now you can login.');
        } catch (error) {
            alert("Registration failed. Please try again later.");
        }
    }
    return (
        <div className="mt-4 flex items-center grow justify-around">
            <div className="mb-64">
                <h1 className=" text-3xl text-center mb-10">Register</h1>
                <form action="" className="max-w-md mx-auto" onSubmit={handleRegister} >
                    <input
                        className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
                        type="text"
                        placeholder="username"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <input
                        className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
                        type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button className="bg-primary text-white w-full p-2 rounded-2xl mt-5">
                        Register
                    </button>
                </form>
                <div className="py-2 text-center text-gray-500">
                    Already a member?{" "}
                    <Link to={"/login"} className="underline text-black">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
