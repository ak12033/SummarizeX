import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        // Redirect to dashboard if token exists
        if (userToken) {
            navigate("/dashboard");
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/auth/login",
                { username, password }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Invalid credentials or server error.");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        label={"Username"}
                        type="text"
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        label={"Password"}
                        type="password"
                    />
                    <div className="pt-4">
                        <Button 
                        onClick={handleLogin} label={"Sign in"} />
                    </div>
                    <BottomWarning
                        label={"Don't have an account?"}
                        buttonText={"Sign up"}
                        to={"/register"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login

