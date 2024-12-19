import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../component/UserContext";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return handleError("Please fill in all fields");
        }
        try {
            const response = await axios.post("/user/login", { email, password });
            const { message, success, error } = response.data;
            if (success) {
                handleSuccess(message);
                setUser(response.data);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "An error occurred.";
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed.";
            handleError(errorMessage);
        }
    };

    return (
        <>
            <div className="md:min-h-[630px] min-h-[638px] flex items-center justify-center md:p-4">
                <div className="w-full max-w-md bg-white md:p-6 p-3 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center md:mb-9 mb-8 text-gray-700">Login</h1>

                    <form className="" onSubmit={handleLogin}>
                        <input
                            className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300 mb-4"
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="w-full mt-8 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center text-gray-500 mt-4">
                        Don't have an account yet?{" "}
                        <Link to="/register" className="text-black hover:underline">
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default LoginPage;
