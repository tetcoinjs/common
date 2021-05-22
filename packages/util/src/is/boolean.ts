// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name isBoolean
 * @summary Tests for a boolean value.
 * @description
 * Checks to see if the input value is a JavaScript boolean.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBoolean } from '@tetcoin/util';
 *
 * isBoolean(false); // => true
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isBoolean (value: any): value is boolean {
  return typeof value === 'boolean';
}
