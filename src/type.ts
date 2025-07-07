/**
 * 存储接口定义
 * 提供统一的存储操作方法，支持异步操作
 */
export type Storage = {
  /**
   * 获取存储项
   * @param key 存储键名
   * @returns Promise<T | null> 返回存储的值，如果不存在则返回 null
   */
  getItem<T>(key: string): Promise<T | null>;

  /**
   * 设置存储项
   * @param key 存储键名
   * @param value 要存储的值
   * @returns Promise<T> 返回存储的值
   */
  setItem<T>(key: string, value: T): Promise<T>;

  /**
   * 删除存储项
   * @param key 要删除的键名
   * @returns Promise<void>
   */
  removeItem(key: string): Promise<void>;

  /**
   * 获取所有存储的键名
   * @returns Promise<string[]> 返回所有键名的数组
   */
  keys(): Promise<string[]>;

  /**
   * 清除所有存储项
   * @returns Promise<void>
   */
  clear(): Promise<void>;

  /**
   * 创建新的存储实例
   * @param name 实例名称
   * @returns Storage 返回新的存储实例
   */
  getInstance(name: string): Storage;
};
