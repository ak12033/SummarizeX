import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/register", {
                username,
                password,
                secretKey,
            });
            localStorage.setItem("token", response.data.token);
            alert("Registration successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
            alert(
                error.response?.data?.message || "Registration failed. Please try again."
            );
        }
    };

    useEffect(() => {
            const userToken = localStorage.getItem("token");
    
            // Redirect to dashboard if token exists
            if (userToken) {
                navigate("/dashboard");
            }
        }, []);

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Register"} />
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
                    <InputBox
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Secret Key (if any)"
                        label={"Secret Key (optional)"}
                        type="text"
                    />
                    <div className="pt-4">
                        <Button onClick={handleRegister} label={"Register"} />
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Login"}
                        to={"/dashboard"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register