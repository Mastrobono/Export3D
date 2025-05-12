import React, { createContext, useContext, useState, useEffect } from "react";

interface LoaderContextType {
  loading: boolean;
  setLoading: (val: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  loading: true,
  setLoading: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[LoaderProvider] mounted. Initial loading:", loading);
  }, []);

  useEffect(() => {
    console.log("[LoaderProvider] loading state changed:", loading);
  }, [loading]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-darkgray transition-opacity duration-500">
          <span className="text-white text-3xl font-bold animate-pulse">Cargando...</span>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}

export default function Loader() {
  // Este componente es solo para mostrar el overlay si loading es true
  // El overlay real se maneja en LoaderProvider
  return null;
} 