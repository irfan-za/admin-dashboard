import React, { useEffect, useState, createContext } from "react";
import { authh } from "../config/firebase/firebase-app";

export const UserContext = createContext();
export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  console.log(props.children);
  useEffect(() => {
    authh.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      setPending(false);
      console.log(currentUser);
    });
  }, []);
  if (pending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="animate-pulse font-mono text-indigo-900 text-xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
