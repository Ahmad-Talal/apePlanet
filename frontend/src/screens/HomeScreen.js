import React, {useState, useEffect} from 'react';
import axios  from 'axios';

const HomeScreen = () =>{

    const [conRate,setConRate] = useState([])
//     const [m,setM] = useState("Ausers")
//     useEffect(() => {
//     async function con(){
        
        
//         const {data} =await axios.get(`https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.a0ARrdaM9By8zFiQLihCYi4CfmcXdMmTw672DJH2jQ4IXe9VA81kL4te9pPLpfs4IYgqdLAPBhqQsuKfwE4dZfbrXRA7ibks5ch5iIBhAbwCjosNyaMBArIMMNaJ-t3iK2Umn4owX6ImDyVWwskhZInbXW36qh-w&ids=ga%3A253689189&metrics=ga%3${m}&start-date=7daysAgo&end-date=yesterday`)
//         console.log(data.rows[0])
//         setConRate(data.rows[0])
    
//     }
//     con()  
// }, [])

return (
    <div>
        {conRate}
    </div>
)

}
export default HomeScreen;