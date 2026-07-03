import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import LoadingAnimation from "./Components/LoadingAnimation.jsx";

function App() {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading) {
            if (isAuthenticated) {
                navigate("/VisualGnrlv2", { replace: true });
            } else {
                navigate("/Login", { replace: true });
            }
        }
    }, [isAuthenticated, loading, navigate]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#1e1e1e] text-white">
            <div className="flex flex-col items-center gap-4">
                <LoadingAnimation message="Redirigiendo..." />
            </div>
        </div>
    );
}
export default App;
