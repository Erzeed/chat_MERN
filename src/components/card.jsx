
// eslint-disable-next-line react/prop-types
function Card({email, onSelectContact, select}) {
    const img = "https://ui-avatars.com/api/?name=Elon+Musk&background=random&font-size=0.33"
    return(
        <div onClick={onSelectContact} className={
            `${select && "bg-gray-700 rounded-[15px]"} container_card h-[70px] ml-2 mr-2 flex justify-between items-center text-white p-3 cursor-pointer hover:bg-gray-700 hover:rounded-[15px]`
        }>
            <img src={img} className="rounded-lg w-11 h-11" alt="profile" />
            <div className="card_text ml-2 mr-2 items-between flex-1 ">
                <div className="text_title antialiased">
                    <p>{email}</p>
                </div>
                <div className="text_desc text-xs text-slate-400">
                    <p>Saya sedang membuat App</p>
                </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-white m-auto"></div>
        </div> 
    )
}

export default Card;