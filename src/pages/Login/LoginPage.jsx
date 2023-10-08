import { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import Layout from "../../components/Layout/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const history = useNavigate();
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              history.push("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          history.push("/");
        }
      })
      .catch((err) => setError(err.message));
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(() => {
        
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6  border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
          <div className="flex-1">
            <Link
              to={"/"}
              className="btn btn-ghost normal-case text-xl hidden sm:flex"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://upload.wikimedia.org/wikipedia/en/7/74/Deakin_University_Logo_2017.svg"
                />
              </div>
              DEV@DEAKIN
            </Link>
          </div>
          {error && <div className="auth__error">{error}</div>}
          <form onSubmit={login} name="login_form" className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>

              <input
                type="email"
                value={email}
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>

              <input
                type="password"
                value={password}
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full input input-bordered"
              />
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div>
              <button className="btn btn-block" type="submit">
                Login
              </button>
            </div>
            <div className="w-full flex justify-center">
              <button onClick={signInWithGoogle} className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
            <p>
              Don't have and account?
              <Link to="/register">Create one here</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
