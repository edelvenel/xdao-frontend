import { TonClient, JettonMaster, Address } from '@ton/ton';
import { Sender, SenderArguments, beginCell, storeStateInit } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';

export const client = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC', // TODO: config
});

export const jettonMaster = (jettonMasterAddress: string) => client.open(
  JettonMaster.create(
    Address.parse(jettonMasterAddress)
  )
);

export class TonConnectSender implements Sender {
  constructor(private readonly tonConnect: TonConnectUI) {}

  async send(args: SenderArguments): Promise<void> {
    await this.tonConnect.sendTransaction({
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
        {
          address: args.to.toString(),
          amount: args.value.toString(),
          payload: args.body?.toBoc().toString('base64'),
          stateInit: args.init
            ? beginCell()
                .store(storeStateInit(args.init))
                .endCell()
                .toBoc()
                .toString('base64')
            : undefined,
        },
      ],
    });
  }
}

// console.log(await getWalletAddress('0QBJQ6N4HjTRPbt2SEvXk7pneZWwHxJc6tVFR35eFPCW7_NM'), 'wallet address');

// {
//   "items": [
//     {
//       "address": "0:923674dbc308f7dfd8b0ae0cbd05bc4993af3ab3ad05edcbf3ce39114854c21f",
//       "jettonAddress": "EQBcXfhYlwJOdFncTjFJW3lE21gfkShkbyoh7Grn71eXBW5y",
//       "jettonMetadata": {
//         "address": "0:5c5df85897024e7459dc4e31495b7944db581f9128646f2a21ec6ae7ef579705",
//         "name": "tikva",
//         "symbol": "tikva",
//         "decimals": "9",
//         "image": "https://ton.org/download/ton_symbol.png",
//         "description": "tikva",
//         "preview": "https://cache.tonapi.io/imgproxy/h8JZDvTl0VTaAfJCu03t6b7FxXlNPIjXrvZl2x3JFN8/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24ub3JnL2Rvd25sb2FkL3Rvbl9zeW1ib2wucG5n.webp",
//         "_id": "680c0c16f0f2718af4763af6"
//       }
//     },
//     {
//       "address": "0:8a10e37ef4ebc8ed180db37c5791ac40dea06b9596c16626325217882ac9a1ea",
//       "jettonAddress": "EQCzb1RIlECuwtRvaylRrTr6hw-UvDT6LYm9jT7Fsmxlys4n",
//       "jettonMetadata": {
//         "address": "0:b36f54489440aec2d46f6b2951ad3afa870f94bc34fa2d89bd8d3ec5b26c65ca",
//         "name": "Test jetton",
//         "symbol": "TEST",
//         "decimals": "9",
//         "image": "https://ton.org/download/ton_symbol.png",
//         "description": "Test jetton description... bruh...",
//         "preview": "https://cache.tonapi.io/imgproxy/h8JZDvTl0VTaAfJCu03t6b7FxXlNPIjXrvZl2x3JFN8/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24ub3JnL2Rvd25sb2FkL3Rvbl9zeW1ib2wucG5n.webp",
//         "_id": "680c0c17f0f2718af4763af9"
//       }
//     },
//     {
//       "address": "0:c3b7aa623d6a0d52f25bcd4f0083a03d7872ce5e12dd5cd90cb39328dac08d2f",
//       "jettonAddress": "EQCDrVswZqMeuJuKTkDm_VLkAtevMUbspnXMQef_z7DunsVZ",
//       "jettonMetadata": {
//         "address": "0:83ad5b3066a31eb89b8a4e40e6fd52e402d7af3146eca675cc41e7ffcfb0ee9e",
//         "name": "Test jetton",
//         "symbol": "TEST",
//         "decimals": "9",
//         "image": "https://ton.org/download/ton_symbol.png",
//         "description": "Test jetton description... bruh...",
//         "preview": "https://cache.tonapi.io/imgproxy/h8JZDvTl0VTaAfJCu03t6b7FxXlNPIjXrvZl2x3JFN8/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24ub3JnL2Rvd25sb2FkL3Rvbl9zeW1ib2wucG5n.webp",
//         "_id": "680c0c3061aa9804fbfdfb9a"
//       }
//     }
//   ],
//   "total": 3
// }
