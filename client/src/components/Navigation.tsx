import { useState, useEffect } from "react";
import { userLogin, userRegister, userLogout } from "../api/login.api";

export function Navigation() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const [errorTypeR, setErrorTypeR] = useState(0);
  const [user, setUser] = useState("");

  useEffect(() => {
    // Recuperar el usuario del almacenamiento local al cargar el componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const emptyInputs = () => {
    setUsername("");
    setPassword("");
    setUsernameR("");
    setPasswordR("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setErrorMessage("");
    setErrorMessageRegister("");
    setErrorTypeR(0);
  };

  const handleLogin = () => {
    userLogin(username, password)
      .then((res) => {
        console.log(res.data.message);
        const loggedInUser = res.data.user;
        setUser(loggedInUser);
        emptyInputs();
        localStorage.setItem("user", loggedInUser);
        toggleModal();
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        setErrorMessage("Incorrect username or password");
      });
  };
  const handleRegister = () => {
    userRegister(usernameR, passwordR, email, first_name, last_name)
      .then((res) => {
        console.log(res.data.message);
        const loggedInUser = res.data.user;
        toggleModalRegister();
        setUser(loggedInUser);
        emptyInputs();
        localStorage.setItem("user", loggedInUser);
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Register failed:", error.message);
        setErrorTypeR(error.errorType);
        setErrorMessageRegister(error.message);
      });
  };

  const handleLogout = () => {
    userLogout()
      .then((res) => {
        console.log(res.data.message);
        setUser(""); // Establecer el usuario como vacío
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
      });
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    emptyInputs();
  };

  const toggleModalRegister = () => {
    setModalRegisterOpen(!isModalRegisterOpen);
    emptyInputs();
  };

  return (
    <div>
      <nav className="w-full h-16 bg-gray-800 flex items-center justify-end">
        {user ? (
          <div className="flex flex-row p-4 text-white items-center">
            <p className=" mr-4">{user}</p>
            <button
              className="bg-blue-700 p-2 rounded-3xl"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={toggleModal}
            id="dropdownDefaultButton"
            className="m-3 text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-700 active:ring-2 active:ring-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Sign In
          </button>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="justify-end flex">
                <button
                  onClick={toggleModal}
                  className="bg-gray-200 p-2 rounded-full active:bg-gray-300 active:ring-2 active:ring-gray-300"
                >
                  <svg
                    fill="currentColor"
                    height="16"
                    icon-name="close-outline"
                    viewBox="0 0 20 20"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-6 ml-3">Sign In</h2>
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 mx-3 ">{errorMessage}</p>
              )}
              <p className="flex flex-row p-3 mb-4">
                New to Authentication App?{" "}
                <a
                  onClick={() => {
                    toggleModal();
                    toggleModalRegister();
                  }}
                  className="text-blue-700 ml-1 cursor-pointer active:text-blue-900"
                >
                  Sign Up
                </a>
              </p>
              <button
                onClick={() => {
                  handleLogin();
                }}
                className=" bg-blue-700 hover:bg-blue-800 active:bg-blue-700 active:ring-2 active:ring-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        ;
        {isModalRegisterOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-1/3">
              <div className="justify-end flex">
                <button
                  onClick={toggleModalRegister}
                  className="bg-gray-200 p-2 rounded-full active:bg-gray-300 active:ring-2 active:ring-gray-300"
                >
                  <svg
                    fill="currentColor"
                    height="16"
                    icon-name="close-outline"
                    viewBox="0 0 20 20"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-6 ml-3">Sign Up</h2>
              <label className="mb-1 ml-3">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="mb-1 ml-3">Last Name</label>

              <input
                type="text"
                placeholder="Last Name"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="flex flex-row">
                <label className="mb-1 ml-3">Username</label>

                {(errorTypeR === 2 || errorTypeR === 5 || errorTypeR === 6) && (
                  <p className="text-red-500 mx-3 mb-4">
                    {errorMessageRegister}
                  </p>
                )}
              </div>
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={usernameR}
                onChange={(e) => setUsernameR(e.target.value)}
              />
              <div className="flex flex-row">
                <label className="mb-1 ml-3">Email</label>

                {(errorTypeR === 1 || errorTypeR === 4 || errorTypeR === 6) && (
                  <p className="text-red-500 mx-3 mb-4 ">
                    {errorMessageRegister}
                  </p>
                )}
              </div>
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row">
                <label className="mb-1 ml-3">Password</label>
                {errorTypeR === 3 && (
                  <p className="text-red-500 mx-3 mb-4 ">
                    {errorMessageRegister}
                  </p>
                )}
              </div>
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-200 rounded-2xl p-3 mb-4 focus:outline-none"
                value={passwordR}
                onChange={(e) => setPasswordR(e.target.value)}
              />
              <button
                onClick={() => {
                  handleRegister();
                }}
                className=" bg-blue-700 hover:bg-blue-800 active:bg-blue-700 active:ring-2 active:ring-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        ;
      </nav>
    </div>
  );
}
