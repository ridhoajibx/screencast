import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ReactRouter from './routes'
import { aNumberOfCart, authenticatedUser } from './store';

function App() {
    const [loading, setLoading] = useState(false);
    const setAuth = useSetRecoilState(authenticatedUser);
    const setANumberOfCart = useSetRecoilState(aNumberOfCart)

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

        const getANumberOfCart = async()=> {
           let { data } = await axios.get('/api/carts')
           setANumberOfCart(data.data)
        }
        getUser();
        getANumberOfCart();
    }, [setAuth]);

    const loadingPage = <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    return (
        <div>
            { loading ?
                loadingPage
                :
                <ReactRouter />
            }
        </div>
    );
}

export default App;
