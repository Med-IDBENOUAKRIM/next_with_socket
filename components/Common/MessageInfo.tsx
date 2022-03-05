import { useRouter } from "next/router"


export const HeaderMessage = () => {
    const router = useRouter();
    const isInSignUp = router.pathname === '/signup';

    return (
        <div></div>
    )
}

export const FooterMessage = () => {
    const router = useRouter();
    const isInSignUp = router.pathname === '/signup';

    return (
        <div></div>
    )
}