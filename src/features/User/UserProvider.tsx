"use client";

import { useRouter } from "next/navigation";
import React, { createContext, FC, useEffect, useMemo, useState } from "react";

export const UserContext = createContext<{
  user: Record<string, string> | null,
  clearUser: () => void,
  setUser: (user: Record<string, string>) => void
}>({
  user: null,
  clearUser: () => {},
  setUser: () => {}
});

export const UserProvider: FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('user') ?? ''))
    }
    catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    if(!user && !localStorage.getItem('user')) {
      router.push('/signin')
    }
  }, [user])

  const contextValue = useMemo(() => ({
    user,
    clearUser: () => setUser(null),
    setUser: (user: Record<string, string>) => setUser(user)
  }), [user])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}