<script>
import SidebarLink from "./SidebarLink";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
};
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>C</div>
        <div>B</div>
      </span>
      <span v-else>CHATBOT FOR SME</span>
    </h1>
    <SidebarLink to="../views/Product.vue" icon="fas fa-home"
      >สินค้า</SidebarLink
    >
    <SidebarLink to="./" icon="fas fa-balance-scale">ยอดขาย</SidebarLink>
    <SidebarLink to="./" icon="fas fa-newspaper">คำสั่งซื้อ</SidebarLink>
    <SidebarLink to="./" icon="fas fa-user-circle">บัญชี</SidebarLink>
    <SidebarLink to="./" icon="fas fa-robot">Jamemo</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: rgb(247, 152, 128);
  --sidebar-item-hover: rgb(230, 127, 68);
  --sidebar-item-active: rgb(212, 127, 101);
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgb(255, 255, 255, 0.7);

  transition: 0.2 lenear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
