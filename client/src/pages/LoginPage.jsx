import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../component/UserContext"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", { email, password });
            console.log(response);
            setUser(response.data);
            alert("Login Successful");
            setRedirect(true);
        } catch (error) {
            alert("Login failed");
        }
    };

    // const token = "asdfasdf"
    // {
    //     headers: {
    //         Authorization: `Bearer ${token}`, // Pass token here
    //     },
    // }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="mt-4 flex items-center grow justify-around">
            <div className="mb-64">
                <h1 className=" text-3xl text-center mb-10">Login</h1>

                <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <div className="py-2 text-center text-gray-500">
                    Don't have an Account yet?{" "}
                    <Link to={"/register"} className="underline text-black">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
