import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { USE_STUB_BACKEND } from "../config/runtime";
import { styles } from "../screens/login";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_STUB_BACKEND) {
      setIsLoggedIn(true);
      setLoading(false);
      return;
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    // Limpeza na desmontagem
    return () => unsubscribe();
  }, []);

  const authContextValue = React.useMemo(() => ({ isLoggedIn }), [isLoggedIn]);

  if (loading) {
    // componente de carregamento
    return (
      <View style={styles.homeContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
