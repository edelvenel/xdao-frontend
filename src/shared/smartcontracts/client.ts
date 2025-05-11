import { TonClient } from "@ton/ton";

export const tonClient = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC', // TODO: config
});
  