import { beginCell, Cell, Dictionary } from '@ton/core';
import { createHash } from 'crypto';

const sha256 = (str: string) => {
  return createHash('sha256').update(str).digest();
};

const ONCHAIN_CONTENT_PREFIX = 0x00;
// const OFFCHAIN_CONTENT_PREFIX = 0x01;
const SNAKE_PREFIX = 0x00;

export type JettonMetaDataKeys =
  | 'name'
  | 'description'
  | 'image'
  | 'symbol'
  | 'decimals'
  | 'uri';

const jettonOnChainMetadataSpec: {
  [key in JettonMetaDataKeys]: 'utf8' | 'ascii';
} = {
  name: 'utf8',
  description: 'utf8',
  image: 'ascii',
  decimals: 'utf8',
  symbol: 'utf8',
  uri: 'ascii',
};

export function buildJettonOnchainMetadata(data: {
  [key: string]: string | undefined;
}): Cell {
  // const KEYLEN = 256;
  const dict = Dictionary.empty(
    Dictionary.Keys.Buffer(32),
    Dictionary.Values.Cell()
  );

  Object.entries(data).forEach(([key, value]) => {
    if (!jettonOnChainMetadataSpec[key as JettonMetaDataKeys])
      throw new Error(`Unsupported onchain key: ${key}`);
    if (!value) return;

    let bufferToStore = Buffer.from(
      value,
      jettonOnChainMetadataSpec[key as JettonMetaDataKeys]
    );
    const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

    const rootCell = beginCell();
    rootCell.storeUint(SNAKE_PREFIX, 8);
    let currentCell = rootCell;

    while (bufferToStore.length > 0) {
      currentCell.storeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
      bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
      if (bufferToStore.length > 0) {
        const newCell = beginCell();
        currentCell.storeRef(newCell.endCell());
        currentCell = newCell;
      }
    }

    dict.set(sha256(key), rootCell.endCell());
  });

  return beginCell()
    .storeUint(ONCHAIN_CONTENT_PREFIX, 8)
    .storeDict(dict)
    .endCell();
}
