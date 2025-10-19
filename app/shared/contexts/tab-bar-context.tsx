import React, { createContext, ReactNode, useContext, useState } from 'react';

interface TabBarContextType {
  isVisible: boolean;
  showTabBar: () => void;
  hideTabBar: () => void;
  toggleTabBar: () => void;
}

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

interface TabBarProviderProps {
  children: ReactNode;
}

export function TabBarProvider({ children }: TabBarProviderProps) {
  const [isVisible, setIsVisible] = useState(true);

  const showTabBar = () => setIsVisible(true);
  const hideTabBar = () => setIsVisible(false);
  const toggleTabBar = () => setIsVisible(prev => !prev);

  return (
    <TabBarContext.Provider value={{ isVisible, showTabBar, hideTabBar, toggleTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
}

export function useTabBar() {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error('useTabBar must be used within a TabBarProvider');
  }
  return context;
}
