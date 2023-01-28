export interface GlobalContextInterface {
  token: string;
}

export type GlobalContextType = {
  GlobalContext: GlobalContextInterface;
  setGlobalContext: (value: GlobalContextInterface) => void;
};

export const GlobalContextObj = { token: "" };
