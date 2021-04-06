import { atom } from "recoil";


const authenticatedUser = atom({
    key: 'authenticatedUser', 
    default: {
        user: [],
        check: false
    },
});

const aNumberOfCart = atom({
    key: "aNumberOfCart",
    default: []
});

export { authenticatedUser, aNumberOfCart }