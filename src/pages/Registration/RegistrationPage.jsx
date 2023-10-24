import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthValue } from "../../context/AuthContext";
import Layout from "../../components/Layout/Layout";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            setTimeActive(true);
            navigate("/verify-email");
          });
        })
        .catch((err) => setError(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6 border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
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
          <form
            onSubmit={register}
            className="space-y-4"
            name="registration_form"
          >
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                required
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

            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>

              <input
                type="password"
                value={confirmPassword}
                required
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full input input-bordered"
              />
            </div>
            <a
              href="/"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div>
              <button type="submit" className="btn btn-block">
                Register
              </button>
            </div>
            <span>
              Already have an account?
              <Link to="/login">login</Link>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
