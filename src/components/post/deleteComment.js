import { createPortal } from "react-dom"

export default function DeleteComment({activeUserUsername,username,deleteComment,setOverlayState}){
    return (
        createPortal(
            <>
                <div  className="delete" style={{display:'flex',zIndex:'500'}}>
                    {
                        activeUserUsername === username?
                        <div onClick={deleteComment}>
                            <button  className="delete-btn">delete</button>
                        </div>
                        :
                        <div className="report-btn">
                            report
                        </div>
                    }
                    <div className="cancel" onClick={()=>{setOverlayState(false)}}>
                        <button  >cancel</button>
                    </div>
                </div>
                <div onClick={()=>{setOverlayState(false)}} className="over" style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    zIndex:"300",
                    backgroundColor: 'rgb(0 0 0 / 60%)',
                    display:'block'
                }}></div>
            </>
            ,document.getElementById('root3'))
    

    )
}