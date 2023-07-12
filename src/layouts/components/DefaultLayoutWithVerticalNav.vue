<script lang="ts" setup>
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <VerticalNavLayout>
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!--
          <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
          >
          <IconBtn>
          <VIcon icon="bx-search" />
          </IconBtn>
          <span class="d-none d-md-flex align-center text-disabled">
          <span class="me-3">Search</span>
          <span class="meta-key">&#8984;K</span>
          </span>
          </div>
        -->

        <VSpacer />

        <!--
          <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
          </IconBtn>
        -->

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Configurações de Conta',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />

      <!--
        <VerticalNavLink
        :item="{
        title: 'Login',
        icon: 'bx-log-in',
        to: '/login',
        }"
        />
        <VerticalNavLink
        :item="{
        title: 'Register',
        icon: 'bx-user-plus',
        to: '/register',
        }"
        />
        <VerticalNavLink
        :item="{
        title: 'Error',
        icon: 'bx-info-circle',
        to: '/no-existence',
        }"
        />
      -->
    </template>
    <slot />

    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
  .meta-key {
    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 6px;
    block-size: 1.5625rem;
    line-height: 1.3125rem;
    padding-block: 0.125rem;
    padding-inline: 0.25rem;
  }
</style>
