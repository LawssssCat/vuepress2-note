---
title: Github Actions 使用笔记
---

参考：

+ ~~《77.关于自动化构建相关的知识介绍》 https://www.bilibili.com/video/BV1M3411T7iN/~~
+ 《78.11 2 创建github仓库以及配置自动化构建》 https://www.bilibili.com/video/BV1mR4y1P7Xj/
+ 《79.调整单元测试和命令》 https://www.bilibili.com/video/BV1A34y1Y7vr/
+ 《80.11 4 上传覆盖率数据道codecov.mp4》 https://www.bilibili.com/video/BV1zY411w7CU/
+ 《81.发布类库到npm》 https://www.bilibili.com/video/BV1cA4y1Q7ev/

alternate

+ Travis CI
+ Circle CI
+ Github Actions

```yaml
name: coverage

on: [push]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: true

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: pnpm
      - run: npm install
      - run: npm run

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build
```

## CodeCov

[link](./codecov)
