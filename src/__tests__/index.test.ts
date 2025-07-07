import { describe, it, expect, beforeEach } from 'vitest';
import storage, { createStorage } from '../index';

describe('Storage', () => {
  const testStorage = createStorage('test');

  beforeEach(async () => {
    await testStorage.clear();
  });

  it('should create a storage instance', () => {
    expect(storage).toBeDefined();
    expect(testStorage).toBeDefined();
  });

  it('should set and get item', async () => {
    const testKey = 'testKey';
    const testValue = { foo: 'bar' };

    await testStorage.setItem(testKey, testValue);
    const retrievedValue = await testStorage.getItem(testKey);

    expect(retrievedValue).toEqual(testValue);
  });

  it('should return null for non-existent item', async () => {
    const value = await testStorage.getItem('nonexistent');
    expect(value).toBeNull();
  });

  it('should remove item', async () => {
    const testKey = 'testKey';
    const testValue = 'test';

    await testStorage.setItem(testKey, testValue);
    await testStorage.removeItem(testKey);
    const value = await testStorage.getItem(testKey);

    expect(value).toBeNull();
  });

  it('should get all keys', async () => {
    const items = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };

    await Promise.all(
      Object.entries(items).map(([key, value]) =>
        testStorage.setItem(key, value)
      )
    );

    const keys = await testStorage.keys();
    expect(keys).toHaveLength(3);
    expect(keys).toEqual(expect.arrayContaining(['key1', 'key2', 'key3']));
  });

  it('should clear all items', async () => {
    await testStorage.setItem('key1', 'value1');
    await testStorage.setItem('key2', 'value2');

    await testStorage.clear();
    const keys = await testStorage.keys();

    expect(keys).toHaveLength(0);
  });

  it('should create new instance with getInstance', () => {
    const newInstance = testStorage.getInstance('newTest');
    expect(newInstance).toBeDefined();
    expect(newInstance).not.toBe(testStorage);
  });
});
