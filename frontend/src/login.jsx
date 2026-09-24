import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function Login(props) {
    const [user, setuser] = useState([]);
    const [newuser, setnewuser] = useState("");
    const [newuserpass, setnewuserpass] = useState("");
    const [ruser, setruser] = useState(true);

    // Show / hide password
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    React.useEffect(()=>{
        if(localStorage.getItem('auth')){
            navigate("/actodo");
        }
    },[navigate])

    useEffect(function () {
        axios.get("http://localhost:5000/login")
            .then(function (data) {
                setuser(data.data);
            })
            .catch(function () {
                console.log("error in retrieving data");
            });
    }, []);

    function handleuser(evt) {
        setnewuser(evt.target.value);
        setruser(true);
    }

    function handlepass(evt) {
        setnewuserpass(evt.target.value);
        setruser(true);
    }

    function checkuser() {
        const founduser = user.find(function (item) {
            return (
                item.username === newuser &&
                item.password === Number(newuserpass)
            );
        });

        if (founduser) {
            console.log("successful");
            localStorage.setItem('auth',true);
            navigate("/actodo", {
                state: { user: newuser }
            });
        } else {
            console.log("login failed");
            setruser(false);
        }

        setnewuser("");
        setnewuserpass("");
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full blur-3xl -top-20 -left-20"></div>

            <div className="absolute w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

            <div className="absolute w-64 h-64 bg-blue-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>


            {/* Login Card */}
            <div className="relative w-full max-w-md">

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">

                    {/* Logo / Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="text-3xl">✓</span>
                        </div>
                    </div>


                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            Welcome Back
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Login to manage your daily activities
                        </p>
                    </div>


                    {/* Error Message */}
                    {!ruser && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                            ⚠️ Invalid username or password
                        </div>
                    )}


                    {/* Username */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Username
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                👤
                            </span>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={newuser}
                                onChange={handleuser}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 hover:border-white/20"
                            />

                        </div>
                    </div>


                    {/* Password */}
                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            {/* Lock icon */}
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                🔒
                            </span>


                            {/* Password input */}
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={newuserpass}
                                onChange={handlepass}
                                onKeyDown={function (evt) {
                                    if (evt.key === "Enter") {
                                        checkuser();
                                    }
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 hover:border-white/20"
                            />


                            {/* Eye button */}
                            <button
                                type="button"
                                onClick={function () {
                                    setShowPassword(!showPassword);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors text-lg"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>
                    </div>


                    {/* Login Button */}
                    <button
                        onClick={checkuser}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-lg shadow-lg shadow-purple-600/20 transition-all duration-200 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Login →
                    </button>


                    {/* Divider */}
                    <div className="flex items-center gap-3 my-7">

                        <div className="h-px bg-white/10 flex-1"></div>

                        <span className="text-gray-500 text-sm">
                            OR
                        </span>

                        <div className="h-px bg-white/10 flex-1"></div>

                    </div>


                    {/* Signup */}
                    <p className="text-center text-gray-400">

                        Don't have an account?

                        <Link
                            to="/signup"
                            className="ml-2 text-purple-400 font-semibold hover:text-fuchsia-400 transition-colors"
                        >
                            Create account
                        </Link>

                    </p>

                </div>


                {/* Bottom text */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    Stay organized. Stay productive. ✨
                </p>

            </div>

        </div>
    );
}

export default Login;