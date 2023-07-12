<script setup lang="ts">
import ErrorHeader from '@/components/ErrorHeader.vue'
import misc404 from '@images/pages/404.png'
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-code="404"
      error-title="Página Não Encontrada ⚠️"
      error-description="Não foi possível encontrar a página que você está procurando."
    />

    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="misc404"
        alt="Em breve"
        :max-width="800"
        class="mx-auto"
      />
      <VBtn
        to="/"
        class="mt-10"
      >
        Voltar à Página Inicial
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
  @use "@core/scss/template/pages/misc.scss";
</style>
