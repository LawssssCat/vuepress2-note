---
title: Vue 奇怪语法整理
---

### `setup` 语法糖

完整写法

```vue
<script lang="ts">
export default {
    setup() {
        // ...
        return {}
    },
}
</script>
```

语法糖

```vue
<script lang="ts" setup>
// ...
</script>
```

### `{{ .. }}` 表达式计算

```vue
{{ 1 + 1 }} // 2
```
