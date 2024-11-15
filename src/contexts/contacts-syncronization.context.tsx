// SyncContext.js
import React, {createContext, ReactNode, useContext, useState} from 'react';

export interface IAskUserSyncModalOpen {
  isModalOpen: boolean | null;
  numNewContacts: number;
}

type SyncContextType = {
  askUserSyncModalOpen: IAskUserSyncModalOpen;
  setAskUserSyncModalOpen: (value: IAskUserSyncModalOpen) => void;
  hasUserResponded: boolean;
  setHasUserResponded: (value: boolean) => void;
};

const SyncContext = createContext<SyncContextType | undefined>(undefined);

type SyncProviderProps = {
  children: ReactNode;
};

export const SyncProvider: React.FC<SyncProviderProps> = ({children}) => {
  const [askUserSyncModalOpen, setAskUserSyncModalOpen] =
    useState<IAskUserSyncModalOpen>({isModalOpen: null, numNewContacts: 0});
  const [hasUserResponded, setHasUserResponded] = useState(false);

  return (
    <SyncContext.Provider
      value={{
        askUserSyncModalOpen,
        setAskUserSyncModalOpen,
        hasUserResponded,
        setHasUserResponded,
      }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSyncContext = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSyncContext must be used within a SyncProvider');
  }
  return context;
};
