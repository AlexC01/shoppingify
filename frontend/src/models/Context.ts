export interface GlobalContextInterface {
  token: string;
  items: number;
  cartId: string;
}

export interface FunctionsContextInterface {
  updateCartItems: () => Promise<void>;
}

export type GlobalContextType = {
  GlobalContext: GlobalContextInterface;
  setGlobalContext: (value: GlobalContextInterface) => void;
};

export type FunctionsContextType = {
  HelpersContext: FunctionsContextInterface;
  setHelpersContext: (value: FunctionsContextInterface) => void;
};

export const GlobalContextObj: GlobalContextInterface = {
  token: "",
  items: 0,
  cartId: "",
};

export const HelpersContextObj: FunctionsContextInterface = {
  updateCartItems: async () => {},
};
