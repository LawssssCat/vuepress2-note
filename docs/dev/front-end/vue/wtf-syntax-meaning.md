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

### `:` `@` 特殊符号

`:`=`v-model:` —— 数据绑定

`@` —— 事件触发

```vue
<!-- Element UI 分页组件 -->
<el-pagination
    :current-page="page"
    :total="total"
    :page-size="limit"
    style="padding: 30px 0; text-align:center;"
    layout="total, prev,pager,next,jumper"
    @current-change="fetchData"
/>
```

### `{{ .. }}` 表达式计算

```vue
{{ 1 + 1 }} // 2
```
