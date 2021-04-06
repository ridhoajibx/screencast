import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ReactRouter from './routes'
import { authenticatedUser } from './store';

function App() {
    const [loading, setLoading] = useState(false);
    const setAuth = useSetRecoilState(authenticatedUser);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/me`);
                setAuth({ user: data.data, check: true });
                setLoading(false)
            } catch (error) {
                console.log("You're not login!");
                setLoading(false)
            }
        }
        getUser();
    }, [setAuth]);
    return (
        <div>
            { loading ?
                <div className="d-flex justify-content-center align-items-center min-vh-100">Loading...</div>
                :
                <ReactRouter />
            }
        </div>
    );
}

export default App;
