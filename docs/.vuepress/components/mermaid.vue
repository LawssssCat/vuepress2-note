<template>
  <div class="mermaid" style="background-color: #fff">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
      });
      m.init();
    });
  },
  updated() {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
      });
      m.init();
    });
  },
};
</script>
