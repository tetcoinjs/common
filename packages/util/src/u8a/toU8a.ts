// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bufferToU8a } from '../buffer/toU8a';
import { hexToU8a } from '../hex/toU8a';
import { isBuffer } from '../is/buffer';
import { isHex } from '../is/hex';
import { isString } from '../is/string';
import { stringToU8a } from '../string/toU8a';

function convertArray (value: number[] | Uint8Array): Uint8Array {
  return Array.isArray(value)
    ? Uint8Array.from(value)
    : value;
}

function convertString (value: string): Uint8Array {
  return isHex(value)
    ? hexToU8a(value)
    : stringToU8a(value);
}

/**
 * @name u8aToU8a
 * @summary Creates a Uint8Array value from a Uint8Array, Buffer, string or hex input.
 * @description
 * `null` or `undefined` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { { u8aToU8a } from '@tetcoin/util';
 *
 * u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
 * u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
 * ```
 */
export function u8aToU8a (value?: number[] | Buffer | Uint8Array | string | null): Uint8Array {
  if (!value) {
    return new Uint8Array();
  } else if (isBuffer(value)) {
    return bufferToU8a(value);
  } else if (isString(value)) {
    return convertString(value);
  }

  return convertArray(value);
}
