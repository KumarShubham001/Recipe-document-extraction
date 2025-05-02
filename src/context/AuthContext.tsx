import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  username: string | null;
  setUsername: (username: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  username: null,
  setUsername: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a DocumentProvider');
  }
  return context;
};