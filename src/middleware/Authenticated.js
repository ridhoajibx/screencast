import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authenticatedUser } from '../store'

export default function Authenticated(props) {
    const auth = useRecoilValue(authenticatedUser);
    let history = useHistory();
    if (!auth.check) {
        history.push('/login')
    }
    return props.render;
}
