import { createContext, useState, type ReactNode, useContext } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("Alex Morgan");
  const [avatarUrl, setAvatarUrl] = useState("/avatar.png");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <UserContext.Provider value={{ userName, setUserName, avatarUrl, setAvatarUrl, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
