import reactDOM from 'react-dom/client';

import Title from './components/Title';
import Feed from './components/Feed';
import BottomBar from './components/BottomBar';
import { useState, useEffect } from 'react'
import { getEntries } from '../services/firebase';


const AuthPage = ({updateCode}) => {

    const handleChange = (e) => {
        console.log("VAL", e.target.value)
        updateCode(e.target.value)
    }
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
            <input style={{ marginBottom: "15px", padding:"15px", fontSize:"17px" }} placeholder='Enter Pin' type="tel" onChange={handleChange} /><br />
        </div>
    </div>
}


const App = () => {

    const [feedData, setFeedData] = useState([]);
    const [code, setCode] = useState("")


    useEffect(() => {
        const getAndSet = () => {
            getEntries()
                .then(res => {
                    console.log("REEEEE", res)
                    setFeedData(res);
                }).catch(err => {
                    console.log("Error", err);
                    setFeedData([])
                })
        }
        getAndSet();
    }, [])

    return <div>
        <Title />
        {
            (code === import.meta.env.VITE_AUTH_CODE)?
            <><Feed data={feedData} setFeed={setFeedData} />
            <BottomBar data={feedData} setFeed={setFeedData} /></>
            :<AuthPage updateCode={setCode} />
        }
    </div>
}

reactDOM.createRoot(document.getElementById("root")).render(<App />)