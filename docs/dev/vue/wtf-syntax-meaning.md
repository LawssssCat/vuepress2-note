
`setup` 语法糖

<table>
<tr>
<td>完整写法</td>
<td>语法糖</td>
</tr>
<tr>
<td>

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

</td>
<td>

```vue
<script lang="ts" setup>
// ...
</script>
```

</td>
</tr>
</table>

`{{ .. }}` 表达式计算

```vue
{{ 1 + 1 }} // 2
```
