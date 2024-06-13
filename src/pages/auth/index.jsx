import { auth, provider } from "../../config/firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userId: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/home");
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-page">
      <p>Sign With Google</p>
      <button className="login-google-btn" onClick={signWithGoogle}>
        Sin in with Google
      </button>
    </div>
  );
};
