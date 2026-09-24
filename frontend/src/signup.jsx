import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";


function Signup(props) {

    const navigate = useNavigate();

    const [newusername, setnewusername] = useState("");
    const [newuserpass, setnewuserpass] = useState("");
    const [newuserconformpass, setnewuserconformpass] = useState("");
    const [error, seterror] = useState("");

    // Show / hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    React.useEffect(()=>{
            if(localStorage.getItem('auth')){
                navigate("/actodo");
            }
        },[navigate])


    function handleuser(evt) {
        setnewusername(evt.target.value);
        seterror("");
    }

    function handlepass(evt) {
        setnewuserpass(evt.target.value);
        seterror("");
    }

    function conformpass(evt) {
        setnewuserconformpass(evt.target.value);
        seterror("");
    }


    function addnewuser() {

        // Empty field validation
        if (!newusername || !newuserpass || !newuserconformpass) {
            seterror("Please fill in all the fields");
            return;
        }

        // Password confirmation
        if (newuserpass !== newuserconformpass) {
            seterror("Passwords do not match");
            return;
        }

        axios.post("http://localhost:5000/signup", {
            username: newusername,
            password: Number(newuserpass)
        })
            .then(function (data) {

                if (data.data === "username already exists") {
                    seterror("Username already exists");
                }

                else if (data.data === "password already exists") {
                    seterror("Password already exists");
                }

                else if (data.data === "signup successful") {

                    alert("Signup successful. You can login now :)");

                    setnewusername("");
                    setnewuserpass("");
                    setnewuserconformpass("");

                    navigate("/");
                }
            })
            .catch(function () {
                seterror("Something went wrong. Please try again.");
            });
    }


    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute w-72 h-72 bg-orange-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

            <div className="absolute w-80 h-80 bg-purple-600/30 rounded-full blur-3xl -bottom-20 -right-20"></div>

            <div className="absolute w-64 h-64 bg-pink-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>


            {/* Signup Card */}
            <div className="relative w-full max-w-md">

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">


                    {/* Logo */}
                    <div className="flex justify-center mb-6">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/30">

                            <span className="text-3xl">
                                ✨
                            </span>

                        </div>

                    </div>


                    {/* Heading */}
                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            Create Account
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Start managing your daily activities
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                            ⚠️ {error}
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
                                placeholder="Choose a username"
                                value={newusername}
                                onChange={handleuser}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:border-white/20"
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                🔒
                            </span>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={newuserpass}
                                onChange={handlepass}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:border-white/20"
                            />

                            {/* Eye button */}
                            <button
                                type="button"
                                onClick={function () {
                                    setShowPassword(!showPassword);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors text-lg"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}
                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                🔐
                            </span>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={newuserconformpass}
                                onChange={conformpass}
                                onKeyDown={function (evt) {
                                    if (evt.key === "Enter") {
                                        addnewuser();
                                    }
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:border-white/20"
                            />

                            {/* Eye button */}
                            <button
                                type="button"
                                onClick={function () {
                                    setShowConfirmPassword(!showConfirmPassword);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors text-lg"
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Signup Button */}
                    <button
                        onClick={addnewuser}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-orange-500/20 transition-all duration-200 hover:from-orange-400 hover:to-pink-400 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Create Account →
                    </button>


                    {/* Divider */}
                    <div className="flex items-center gap-3 my-7">

                        <div className="h-px bg-white/10 flex-1"></div>

                        <span className="text-gray-500 text-sm">
                            OR
                        </span>

                        <div className="h-px bg-white/10 flex-1"></div>

                    </div>


                    {/* Login */}
                    <p className="text-center text-gray-400">

                        Already have an account?

                        <Link
                            to="/"
                            className="ml-2 text-orange-400 font-semibold hover:text-pink-400 transition-colors"
                        >
                            Login
                        </Link>

                    </p>

                </div>


                {/* Bottom text */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    Create your account & start being productive ✨
                </p>

            </div>

        </div>
    );
}

export default Signup;