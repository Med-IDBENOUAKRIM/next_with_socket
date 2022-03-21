export const newMsgNoti = (senderName: string) => {
    const sound = new Audio('/light.mp3');
    sound && sound.play()
    if (senderName) {
        setInterval(() => {
            document.title = `New message from ${senderName}`;
        }, 5000)
    }
}


export const scrollToNewMsg = (divRef) => {
    divRef.current !== null && divRef.current.scrollIntoView({ behaviour: "smooth" })
}
