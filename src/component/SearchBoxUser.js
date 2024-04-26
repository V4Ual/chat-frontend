import CloseSquareFilled from "@ant-design/icons/CloseSquareFilled";
const { searchHook } = require("@/hooks/users");
import "react-chat-elements/dist/main.css";

import { ChatItem } from "react-chat-elements";


const SearchUserBox = ({ isShowSearchBox, handleSearchBoxToggle, inputSearchOnChange, searchList }) => {

    return (
        // <div className="w-1/2 h-1/2 top-0 right-0 translate-y-2/4 -translate-x-2/4 bg-red-300 absolute">
        <div className="relative">
            <div className="flex justify-end mr-2">
                {/* <span>close</span> */}
                <CloseSquareFilled width={50} height={50} onClick={() => handleSearchBoxToggle()} />
            </div>
            <div className="flex justify-center">
                <h1 className="p-2 font-bold font-serif" >Search</h1>
            </div>
            <div className="flex items-center gap-3  flex-col bg-blue-400">
                <input onChange={(e) => inputSearchOnChange(e)} placeholder="Search People here" className="w-1/2 p-2" type="text" />
            </div>
            <div className="bg-white overflow-auto m-2" style={{ height: '352px' }}>

                {searchList &&
                    searchList?.map((item, index) => {
                        console.log(item);
                        return (
                            <div
                                key={index}
                                // onClick={() => handleChatList(index)}
                                className='m-2 rounded-sm'
                            >
                                <ChatItem
                                    avatar={item?.profilePic}
                                    alt={"Reactjs"}
                                    title={item?.name}
                                    subtitle={item?.email}
                                    date={new Date()}
                                    unread={0}
                                />
                            </div>
                        );
                    })}

            </div>
        </div >

        // </div>

    )

}

export { SearchUserBox }
