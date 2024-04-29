import { create } from 'zustand';
import useIsTokenActive from '@shared/lib/hooks/useIsTokenActive';

const useStore = create(set => ({
    user: null,
    setUser: user => set({ user }),
}));

export default function Login({ initialUserData }) {
    const setUser = useStore(state => state.setUser);
    const userData = initialUserData || useIsTokenActive();

    if (userData) {
        setUser(userData);
    }

    const handleLogin = async () => {
        const userData = await performLoginLogic();
        setUser(userData);
    };

    return <button onClick={handleLogin}>Login</button>;
}

export async function getServerSideProps() {
    const initialUserData = await fetchUserData();

    return {
        props: {
            initialUserData,
        },
    };
}
