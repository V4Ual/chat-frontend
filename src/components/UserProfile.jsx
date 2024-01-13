import { useState } from "react";

// eslint-disable-next-line react/prop-types
const UserProfile = ({ uItem, handleClick }) => {
  //console.log("=====================",uItem);

  const [userDatail,setUserDetails] = useState()

  return (
    <div className="flex items-center p-4">
      <div className="flex-shrink-0">{/* <img className="w-10 h-10 rounded-full" src={url} alt={`${name.userDetails.name}'s profile`} /> */}</div>
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white" onClick={() => handleClick(uItem)}>
          {uItem?.userDetails?.name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">{uItem.userDetails.email}</p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{uItem.userDetails.name}</div>
    </div>
  );
};

export default UserProfile;
