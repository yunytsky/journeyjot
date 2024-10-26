import googleIcon from "../assets/googleIcon.svg";
import { BASE_URL } from "../api";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Auth = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if(user) {
          navigate("/journeys")
      }
    }, [user])

    const handleAuth = async () => {
        try {
            window.location.href = `${BASE_URL}/auth/google`;
        } catch (error) {
            console.log("Error during authentication:", error);
        }
    }
    return (
        <div style={{ marginTop: '5rem' }}>
            <div className="text-center">
                <h1 className="display-6 mb-4">
                    Welcome to <b className="text-primary text-monospace">journeyjot</b>. 👋
                </h1>
                <div className="card p-4 shadow-sm" style={{ maxWidth: '300px', margin: 'auto' }}>
                    <h6 className="mb-3">Continue with</h6>
                    <button 
                        onClick={handleAuth} 
                        type="button" 
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                        style={{ gap: '0.5rem' }}
                    >
                        <img src={googleIcon} style={{ width: '1em', height: '1em' }} alt="google icon" /> 
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
    
    
    
    
}

export default Auth;