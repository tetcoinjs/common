// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@tetcoin/util-crypto/types';
import type { KeyringPair$Json, KeyringPair$JsonEncodingTypes, KeyringPair$Meta } from '../types';

import { base64Encode } from '@tetcoin/util-crypto';

import { ENCODING } from './defaults';

interface PairStateJson {
  address: string;
  meta: KeyringPair$Meta;
}

// version 2 - nonce, encoded (previous)
// version 3 - salt, nonce, encoded
const VERSION = '3';

const ENC_NONE: KeyringPair$JsonEncodingTypes[] = ['none'];

export function pairToJson (type: KeypairType, { address, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address,
    encoded: base64Encode(encoded),
    encoding: {
      content: ['pkcs8', type],
      type: isEncrypted
        ? ENCODING
        : ENC_NONE,
      version: VERSION
    },
    meta
  };
}
