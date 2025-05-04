import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DocumentContextProps {
  documentId: string | null;
  setDocumentId: (documentId: string | null) => void;
}

const DocumentContext = createContext<DocumentContextProps>({
  documentId: null,
  setDocumentId: () => {},
});

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentId, setDocumentId] = useState<string | null>(null);

  return (
    <DocumentContext.Provider value={{ documentId, setDocumentId }}>
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