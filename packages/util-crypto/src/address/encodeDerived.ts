// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { Prefix } from './types';

import { decodeAddress } from './decode';
import { encodeAddress } from './encode';
import { createKeyDerived } from './keyDerived';

/**
 * @name encodeDerivedAddress
 * @summary Creates a derived address as used in Tetcore utility.
 * @description
 * Creates a Tetcore derived address based on the input address/publicKey and the index supplied.
 */
export function encodeDerivedAddress (who: Uint8Array | string, index: BigInt | BN | number, ss58Format?: Prefix): string {
  return encodeAddress(createKeyDerived(decodeAddress(who), index), ss58Format);
}
