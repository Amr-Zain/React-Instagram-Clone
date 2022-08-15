import TimeLine from '../components/TimeLine'
import Sidebar from '../components/sidebar/Sidebar'
import "../styles/dashBoared.css"

const Dashboard =(()=>{
    return(<>
        <main className='main'>        
            <TimeLine className="timeline" />
            <aside className='sidepar'>
                <Sidebar  />
            </aside>
        </main>

    </>

)
})

export default Dashboard;