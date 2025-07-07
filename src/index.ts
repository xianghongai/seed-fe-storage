import { Storage } from './type';
import localforage from 'localforage';

/**
 * 创建存储实例
 * 基于 localforage 实现，支持多种存储方式（IndexedDB、WebSQL、localStorage）
 *
 * @example
 * ```typescript
 * // 使用默认实例
 * import storage from './index';
 * await storage.setItem('key', 'value');
 * ```
 *
 * @param name 存储实例名称，用于隔离不同实例的数据
 * @returns Storage 返回存储实例
 */
export const createStorage = (name: string): Storage => {
  const store = localforage.createInstance({ name });

  return {
    getItem: <T>(key: string): Promise<T | null> => store.getItem(key),

    setItem: <T>(key: string, value: T): Promise<T> => store.setItem(key, value),

    removeItem: (key: string): Promise<void> => store.removeItem(key),

    keys: (): Promise<string[]> => store.keys(),

    clear: (): Promise<void> => store.clear(),

    getInstance: (instanceName: string): Storage => createStorage(instanceName),
  };
};

/**
 * 默认存储实例
 * 使用 'global' 作为实例名称
 */
export default createStorage('global');
