export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  languageCode: string;
  username: string;
  isPremium: boolean;
  addedToAttachmentMenu: boolean;
  allowsWriteToPm: boolean;
  photoUrl: string;
  isBot: boolean;
};

export type IBalance = {
  balance: string;
  price: {
    prices: {
      TON: number;
    };
    diff_24h: {
      TON: string;
    };
    diff_7d: {
      TON: string;
    };
    diff_30d: {
      TON: string;
    };
  };
  wallet_address: {
    address: string;
    name: string;
    is_scam: boolean;
    icon: string;
    is_wallet: boolean;
  };
  jetton: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    image: string;
    verification: string;
    custom_payload_api_uri: string;
    score: number;
  };
  extensions: string[];
  lock: {
    amount: string;
    till: number;
  };
};

export type INfts = {
  address: string;
  index: number;
  owner: {
    address: string;
    name: string;
    is_scam: boolean;
    icon: string;
    is_wallet: boolean;
  };
  collection: {
    address: string;
    name: string;
    description: string;
  };
  verified: boolean;
  metadata: {
    name: string;
    description: string;
  };
  sale: {
    address: string;
    market: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    owner: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    price: {
      value: string;
      token_name: string;
    };
  };
  previews: {
    resolution: string;
    url: string;
  }[];
  dns: string;
  include_cnft: boolean;
  trust: string;
};
