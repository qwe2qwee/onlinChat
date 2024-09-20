import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ID } from "appwrite";
import { account } from "../../appwriteConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserOnLoad = async () => {
      try {
        const accountDetails = await fetchAccountDetails();
        setUser(accountDetails);
      } catch (error) {
        console.error("Error fetching user on load:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserOnLoad();
  }, []);

  const fetchAccountDetails = async () => {
    return await account.get();
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      const accountDetails = await fetchAccountDetails();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );
      console.log("User registered!", response);

      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password1
      );
      const accountDetails = await fetchAccountDetails();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
