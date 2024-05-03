import Image from "next/image";
import { useSelector } from "react-redux";

const Message = ({
    profilePic,
    image,
    text,
    senderId,
    time,
    name,
    onClickDownload,
}) => {
    const mainUser = useSelector((state) => state.user);
    const chatUser = useSelector((state) => state.chat);

    return (
        <div
            className='flex'
            style={{
                justifyContent: mainUser?.data?._id == senderId ? "end" : "start",
            }}
        >
            {!image && text && (
                <p
                    className={`text-wrap m-2 px-6 py-3 ${mainUser?.data?._id == senderId
                        ? " rounded-l-full"
                        : "rounded-r-full"
                        } rounded-t-full bg-gray-800 w-fit lg:max-w-md text-gray-200`}
                >
                    {text}
                </p>
            )}
            {image && !text && (
                <div
                    className={`m-2 px-6 py-3  bg-gray-800 w-fit lg:max-w-md text-gray-200`}
                >
                    {image && (
                        <Image
                            src={image}
                            width={200}
                            height={300}
                            accept='image/*'
                            className='rounded-lg w-[200px] h-[300px]'
                        />
                    )}
                </div>
            )}
            {image && text && (
                <div
                    className={`m-2 px-6 py-3 rounded-lg bg-gray-800 w-fit lg:max-w-md text-gray-200`}
                >
                    {image && (
                        <Image
                            width={200}
                            height={300}
                            src={image}
                            accept='image/*'
                            className='rounded-2xl w-[200px] h-[300px]'
                        />
                    )}
                    <p className="m-7"
                    >
                        {text}
                    </p>
                </div>
            )}
        </div>
    );
};

export { Message };
