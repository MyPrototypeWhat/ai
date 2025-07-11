import { expect, it, describe } from 'vitest';
import { DelayedPromise } from './delayed-promise';

describe('DelayedPromise', () => {
  it('should resolve when accessed after resolution', async () => {
    const dp = new DelayedPromise<string>();
    dp.resolve('success');
    expect(await dp.promise).toBe('success');
  });

  it('should reject when accessed after rejection', async () => {
    const dp = new DelayedPromise<string>();
    const error = new Error('failure');
    dp.reject(error);
    await expect(dp.promise).rejects.toThrow('failure');
  });

  it('should resolve when accessed before resolution', async () => {
    const dp = new DelayedPromise<string>();
    const promise = dp.promise;
    dp.resolve('success');
    expect(await promise).toBe('success');
  });

  it('should reject when accessed before rejection', async () => {
    const dp = new DelayedPromise<string>();
    const promise = dp.promise;
    const error = new Error('failure');
    dp.reject(error);
    await expect(promise).rejects.toThrow('failure');
  });

  it('should maintain the resolved state after multiple accesses', async () => {
    const dp = new DelayedPromise<string>();
    dp.resolve('success');
    expect(await dp.promise).toBe('success');
    expect(await dp.promise).toBe('success');
  });

  it('should maintain the rejected state after multiple accesses', async () => {
    const dp = new DelayedPromise<string>();
    const error = new Error('failure');
    dp.reject(error);
    await expect(dp.promise).rejects.toThrow('failure');
    await expect(dp.promise).rejects.toThrow('failure');
  });
});
