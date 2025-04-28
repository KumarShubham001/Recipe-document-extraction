import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DocumentContextProps {
  documentId: string | null;
  setDocumentId: (documentId: string | null) => void;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentId, setDocumentId] = useState<string | null>(null);

  const contextValue: DocumentContextProps = {
    documentId,
    setDocumentId,
  };

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};