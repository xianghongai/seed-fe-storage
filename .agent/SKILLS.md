---
name: seed-fe-storage
description: @seed-fe/storage 使用指引，帮助快速完成常见存储读写与实例隔离场景。
---

# SKILLS

这个文档只聚焦“怎么用 `@seed-fe/storage`”。

## Skill 1: basic-storage-usage

- **用途**: 用默认实例完成基础读写。
- **何时使用**: 需要存、取、删单个 key，或清空缓存。
- **用法**:
  1. `import storage from '@seed-fe/storage'`
  2. `await storage.setItem('user', { id: 1 })`
  3. `const user = await storage.getItem('user')`
  4. `await storage.removeItem('user')` / `await storage.clear()`

## Skill 2: multi-instance-isolation

- **用途**: 用不同实例隔离业务数据。
- **何时使用**: 需要把用户信息、设置、草稿等分仓存储。
- **用法**:
  1. `import { createStorage } from '@seed-fe/storage'`
  2. `const userStorage = createStorage('user')`
  3. `const settingsStorage = createStorage('settings')`
  4. 分别在各自实例上调用 `setItem/getItem/clear`

## Skill 3: typed-storage-usage

- **用途**: 用 TypeScript 泛型获得类型安全。
- **何时使用**: 需要在读取后直接获得类型提示与校验。
- **用法**:
  1. 定义类型，如 `type User = { id: number; name: string }`
  2. `await storage.setItem<User>('currentUser', value)`
  3. `const user = await storage.getItem<User>('currentUser')`
  4. 读取结果按 `User | null` 处理空值分支

## Skill 4: key-management

- **用途**: 管理当前实例下所有键。
- **何时使用**: 需要做缓存巡检、批量清理前确认、调试存储状态。
- **用法**:
  1. `const keys = await storage.keys()`
  2. 基于 keys 做过滤或展示
  3. 必要时执行 `await storage.clear()` 清空当前实例
