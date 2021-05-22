// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a, u8aEq } from '@tetcoin/util';
import { waitReady } from '@tetcoin/wasm-crypto';

import { randomAsU8a } from '../random/asU8a';
import { schnorrkelKeypairFromSeed } from './keypair/fromSeed';
import { schnorrkelVrfSign } from './vrfSign';
import { schnorrkelVrfVerify } from './vrfVerify';

const MESSAGE = stringToU8a('this is a message');

describe('vrf sign and verify', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('has 96-byte proofs', (): void => {
    const pair = schnorrkelKeypairFromSeed(randomAsU8a());

    expect(schnorrkelVrfSign(MESSAGE, pair)).toHaveLength(96);
  });

  it('signing is deterministic', (): void => {
    const pair = schnorrkelKeypairFromSeed(randomAsU8a());
    const proof1 = schnorrkelVrfSign(MESSAGE, pair);
    const proof2 = schnorrkelVrfSign(MESSAGE, pair);

    expect(u8aEq(proof1.subarray(0, 32), proof2.subarray(0, 32))).toBe(true);
  });

  it('can sign and verify a message', (): void => {
    const pair = schnorrkelKeypairFromSeed(randomAsU8a());
    const proof = schnorrkelVrfSign(MESSAGE, pair);

    expect(schnorrkelVrfVerify(MESSAGE, proof, pair.publicKey)).toBe(true);
  });

  it('can sign and verify a message (with context)', (): void => {
    const context = 'my context';
    const pair = schnorrkelKeypairFromSeed(randomAsU8a());
    const proof = schnorrkelVrfSign(MESSAGE, pair, context);

    expect(schnorrkelVrfVerify(MESSAGE, proof, pair.publicKey, context)).toBe(true);
  });

  it('can sign and verify a message (with context & extra)', (): void => {
    const context = 'my context';
    const extra = 'some extra transcript data';
    const pair = schnorrkelKeypairFromSeed(randomAsU8a());
    const proof = schnorrkelVrfSign(MESSAGE, pair, context, extra);

    expect(schnorrkelVrfVerify(MESSAGE, proof, pair.publicKey, context, extra)).toBe(true);
  });

  it('throws error when publicKey lengths do not match', (): void => {
    expect(
      () => schnorrkelVrfVerify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        new Uint8Array(96),
        new Uint8Array(31)
      )
    ).toThrow(/Invalid publicKey/);
  });

  it('throws error when proof lengths do not match', (): void => {
    expect(
      () => schnorrkelVrfVerify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        new Uint8Array(99),
        new Uint8Array(32)
      )
    ).toThrow(/Invalid vrfSign/);
  });
});
