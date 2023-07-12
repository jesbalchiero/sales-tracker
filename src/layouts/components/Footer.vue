<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Feito com
      <VIcon
        icon="bx-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      por <a
        href="https://github.com/jesbalchiero"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Jean Sbalchiero</a>
    </span>
  </div>
</template>
