import googleIcon from "../assets/googleIcon.svg";
import { BASE_URL } from "../api";

const Auth = () => {
    const handleAuth = async () => {
        try {
            window.location.href = `${BASE_URL}/auth/google`;
        } catch (error) {
            // Handle error
            console.log("Error during authentication:", error);
        }
    }
    return(
        <div className="bg-white">
            <h1 className="display-6 mb-5">Welcome to the <b className="text-primary text-monospace">journeyjot.</b> 👋</h1>
            <div className="card">
                <h6 className="mb-3">Continue with</h6>
                <button onClick={handleAuth} type="button" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={googleIcon} style={{ width: '1em', height: '1em', marginRight: '8px'  }} alt="google icon" /> Google</button>
            </div>
        </div>
    )
}

export default Auth;