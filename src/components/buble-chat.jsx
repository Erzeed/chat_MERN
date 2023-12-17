/* eslint-disable react/prop-types */
function BubleChat ({ answer }) {
    const img = "https://ui-avatars.com/api/?name=Elon+Musk&background=random&font-size=0.33";
    return(
    <div className={`${
        answer ? "flex-row-reverse" : ""
    } flex items-start gap-2.5`}>
    <img className="w-8 h-8 rounded-full" src={img} alt="Jese image" />
    <div className="flex flex-col gap-1">
        <div className={`${
            answer ? "flex-row-reverse" : ""
        } flex items-center`}>
            <span className="text-sm text-white tracking-wide">Bonnie Green</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 px-2">11:46</span>
        </div>
        <div className={`${
            answer ? "rounded-l-xl rounded-br-xl" : "rounded-e-xl rounded-es-xl"
        } flex flex-col leading-1.5 px-2 py-1 border-gray-200 bg-gray-100 dark:bg-gray-700 w-fit max-w-[320px]`}>
            <p className="text-sm font-normal text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, cupiditate.</p>
        </div>
        {/* <span className="text-xs tracking-wide font-normal text-gray-500">Delivered</span> */}
    </div>
    </div>
    )
}

export default BubleChat;