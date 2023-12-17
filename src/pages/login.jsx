import { useState } from "react";
import imgLogin from "../assets/img-login.png"
import { Link } from "react-router-dom";
import getApi from "../../utils/api";

function Login () {
    const [dataLogin, setDataLogin] = useState();

    const onHandleChange = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.id]: e.target.value
        })
    }

    const onHandleSubmit = async () => {
        try {
            const data = await getApi.register(dataLogin)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="login h-screen w-full flex p-10 flex-row-reverse items-center">
            <div className="login_form h-[65%] flex justify-between flex-col w-[35%] bg-white rounded-lg p-5">
                <div className="form_titile">
                    <h1 className="text-3xl pt-5">Login</h1>
                </div>
                <form>
                    <label className="font-light text-sm leading-6 text-gray-600 antialiased tracking-wider"  htmlFor="email">Email</label>
                    <input className="w-full mt-2 mb-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-1" onChange={(e) => onHandleChange(e)}  type="email" name="email" id="email" />
                    <label className="font-light text-sm leading-6 text-gray-600 antialiased tracking-wider"  htmlFor="password">Password</label>
                    <input className="w-full mt-2 mb-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-1" onChange={(e) => onHandleChange(e)}  type="password" name="password" id="password" />
                </form>
                <div className="btn_form">
                    <button onClick={onHandleSubmit} className="bg-[#F06223] w-full h-9 text-sm text-white rounded-full" type="button">Login</button>
                </div>
                <p className="font-light text-xs tracking-wide" >Don't have account <Link className="text-sky-400/100" to="/register">Register</Link></p>
            </div>
            <div className="register_img p-5 w-[65%] h-full flex justify-start items-center">
                <img src={imgLogin} className="w-[70%] h-[70%]" alt="image register" />
            </div>
        </div>
    )
}

export default Login;