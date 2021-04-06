import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authenticatedUser } from '../store'

export default function Guest(props) {
    const auth = useRecoilValue(authenticatedUser);
    let history = useHistory();
    if (auth.check) {
        history.push('/dashboard')
    }
    return props.render;
}