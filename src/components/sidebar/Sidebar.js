import SidebarUser from "./SidebarUser"
import SidebarSuggestions from "./SidebarSuggestions"
import ActiveUserDataContext from "../../contexts/ActiveUserDataContext";
import React from "react";
function Sidebar(){

    const  userData  = React.useContext(ActiveUserDataContext);
    return (<>
                <SidebarUser username={userData?.username} fullName={userData?.fullName} />
                <SidebarSuggestions userDocId={userData?.docId} userId ={userData?.userId} following ={userData?.following} />
            </>)
}
export default Sidebar;