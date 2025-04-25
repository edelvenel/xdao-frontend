import { TonClient } from '@ton/ton';

export const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});
