// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage } from '.';

describe('assertSingletonPackage', (): void => {
  const PKG = '@tetcoin/util';
  const VER1 = '9.8.0-beta.45';
  const VER2 = '9.7.1';
  const VER3 = '9.6.1';
  const PATH = '/Users/jaco/Projects/tetcoinjs/api/node_modules/@tetcoin/util';
  const RES2 = `Multiple instances of @tetcoin/util detected, ensure that there is only one package in your dependency tree.\n\t${VER1}\t${PATH}/01\n\t${VER2}        \t${PATH}/02`;
  const RES3 = `${RES2}\n\t${VER3}        \t${PATH}/03`;

  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER1 }, `${PATH}/01`);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log the second time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER2 }, `${PATH}/02`);
    expect(spy).toHaveBeenCalledWith(RES2);
    spy.mockRestore();
  });

  it('should allow for function use', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER3 }, () => `${PATH}/03`);
    expect(spy).toHaveBeenCalledWith(RES3);
    spy.mockRestore();
  });
});
