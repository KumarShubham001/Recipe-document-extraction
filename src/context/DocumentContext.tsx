import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import PageLoader from '../components/ui/pageLoader';

interface DocumentContextProps {
  documentId: string | null;
  setDocumentId: (documentId: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DocumentContext = createContext<DocumentContextProps>({
  documentId: null,
  setDocumentId: () => {},
  isLoading: false,
  setIsLoading: () => {}
});

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }: DocumentProviderProps) => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (<>
      {isLoading && <PageLoader />}
      <DocumentContext.Provider value={{ documentId, setDocumentId, isLoading, setIsLoading }}>
        {children}
      </DocumentContext.Provider>
    </>
  )
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
