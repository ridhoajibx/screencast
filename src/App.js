import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ReactRouter from './routes'
import { aNumberOfCart, authenticatedUser } from './store';

function App() {
    const [isMounted, setIsMounted] = useState(false);
    const setAuth = useSetRecoilState(authenticatedUser);
    const setANumberOfCart = useSetRecoilState(aNumberOfCart)

    useEffect(() => {
        const getUser = async () => {
            setIsMounted(false)
            try {
                const { data } = await axios.get(`/api/me`);
                setAuth({ user: data.data, check: true });
                setIsMounted(true)
            } catch (error) {
                console.log("You're not login!");
                setIsMounted(true)
            }
        }

        const getANumberOfCart = async()=> {
           let { data } = await axios.get('/api/carts')
           setANumberOfCart(data.data)
        }
        getUser();
        getANumberOfCart();
    }, [setAuth, setANumberOfCart]);

    const loadingPage = <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    return (
        <div>
            { !isMounted ?
                loadingPage
                :
                <ReactRouter />
            }
        </div>
    );
}

export default App;
