import Image from 'next/image'

function LoginHeaders() {
    return (
        <div style={{marginTop:"7%"}}>
            <Image src="/keyboard.png" alt="keyboard" width="150" height="100" />
            <h1 className="text" style={{marginTop:"3%"}}>FAST FINGERS</h1>
        </div>
    )
}

export default LoginHeaders;