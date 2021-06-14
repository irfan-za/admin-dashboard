import React, { useRef, useCallback, useContext } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { authh } from "../config/firebase/firebase-app";
import { UserContext } from "../provider/UserProvider";

function Login({ history }) {
  const buttonRef = useRef(null);

  const HandleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      buttonRef.current.textContent = "Loading...";
      const { email, password } = event.target.elements;
      try {
        await authh
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => (buttonRef.current.textContent = "Login"));
        history.push("/dashboard");
      } catch (error) {
        buttonRef.current.textContent = "Login";
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  // const linkToDashboardPage = useRef(null);
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);

  // const loginUser = (e) => {
  //   e.preventDefault();
  //   buttonRef.current.textContent = "Loading...";

  //   if (emailRef.current || passwordRef.current !== null) {
  //     const email = emailRef.current.value;
  //     const password = passwordRef.current.value;
  //     console.log(email);
  //     const user = authh.currentUser;
  //     console.log(user);
  //     authh.onAuthStateChanged((user) => {
  //       if (user) {
  //         console.log(user);
  //       } else {
  //         console.log("gagal login");
  //       }
  //     });
  //     authh
  //       .signInWithEmailAndPassword(email, password)
  //       .then((userCredential) => {
  //         // sign In
  //         buttonRef.current.textContent = "Login";
  //         const user = userCredential.user;
  //         sessionStorage.setItem("uid", JSON.stringify(user.uid));
  //         console.log("usser u id===>" + user.uid);
  //         console.log(userCredential);
  //         if (user) {
  //           linkToDashboardPage.current.click();
  //         }
  //       })
  //       .catch((err) => {
  //         buttonRef.current.textContent = "Login";
  //         const errCode = err.code;
  //         const errMessage = err.message;
  //         alert(errMessage);
  //       });
  //   }
  // };
  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md md:relative w-full space-y-8  ">
        <span className="absolute top-10 left-10 transform md:-translate-x-10 md:-translate-y-36">
          <Link to="/">
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </Link>
        </span>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={HandleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Password
              </label>
              <input
                // ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {/* <Link
            to="/dashboard"
            ref={linkToDashboardPage}
            // aria-hidden={true}
            className="hidden"
          ></Link> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <button
              ref={buttonRef}
              type="submit"
              // onClick={loginUser}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
