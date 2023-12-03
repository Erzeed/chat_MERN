import imgRegis from "../assets/img-register.png"

function Register () {
    return(
        <div className="register h-screen w-full flex p-10 items-center">
            <div className="register_form h-[80%] flex justify-between flex-col w-[35%] bg-white rounded-lg p-5">
                <div className="form_titile">
                    <h1 className="text-3xl pt-5">Register</h1>
                </div>
                <form action="">
                    <label className="font-light text-md leading-6 text-gray-600 antialiased tracking-wider" htmlFor="username">Username</label>
                    <input className="w-full mt-2 mb-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-1" type="text" name="email" id="username" />
                    <label className="font-light text-md leading-6 text-gray-600 antialiased tracking-wider"  htmlFor="email">Email</label>
                    <input className="w-full mt-2 mb-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-1"  type="email" name="email" id="email" />
                    <label className="font-light text-md leading-6 text-gray-600 antialiased tracking-wider"  htmlFor="password">Password</label>
                    <input className="w-full mt-2 mb-2 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-1"  type="password" name="password" id="password" />
                </form>
                <div className="btn_form">
                    <button className="bg-[#F06223] w-full h-9 text-sm text-white rounded-full" type="button">Register</button>
                </div>
                <p className="font-light text-xs tracking-wide" >Have account <a className="text-sky-400/100" href="/login">Login</a></p>
            </div>
            <div className="register_img p-5 w-[65%] h-full flex justify-end items-center">
                <img src={imgRegis} className="w-[70%] h-[70%]" alt="image register" />
            </div>
        </div>
    )
}

export default Register;