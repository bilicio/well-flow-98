import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  onboardingCompleted?: boolean;
  preferences?: {
    feelings: Record<string, number>;
    activities: string[];
    hobbies: string[];
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (preferences: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user
    const storedUser = localStorage.getItem("MyndPass_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (password.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    }

    // Create mock user
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
    };

    localStorage.setItem("MyndPass_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (password.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    }
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }
    if (name.length < 2) {
      throw new Error("Nome deve ter no mínimo 2 caracteres");
    }

    // Create mock user
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
    };

    localStorage.setItem("MyndPass_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("MyndPass_user");
    setUser(null);
  };

  const completeOnboarding = (preferences: any) => {
    if (user) {
      const updatedUser = { ...user, onboardingCompleted: true, preferences };
      localStorage.setItem("MyndPass_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
