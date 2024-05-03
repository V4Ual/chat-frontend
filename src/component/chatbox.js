const ChatBox = ({ id, avatar, name, message, time, indexKey, activeUserId }) => {
    return (


        <div key={id} className={`flex justify-between ${activeUserId == indexKey ? 'bg-gray-800' : 'bg-blue-200'} items-center p-3 hover:bg-gray-800 rounded-lg relative`}>
            {console.log(indexKey)}
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/61.jpg"
                    alt=""
                />
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p>{name}</p>
                <div className="flex items-center text-sm text-gray-600">
                    <div className="min-w-0">
                        <p className="truncate">Ok, see you at the subway in a bit.</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">Just now</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBox 