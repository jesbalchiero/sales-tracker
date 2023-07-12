<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          SalesTracker
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          A aventura começa aqui 🚀
        </h5>
        <p class="mb-0">
          Torne o gerenciamento do seu aplicativo fácil e divertido!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                label="Usuário"
                placeholder="Johndoe"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="E-mail"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Senha"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">Eu concordo com a</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >política de privacidade e termos</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                Inscrever-se
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Já possui uma conta?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
                Faça login em vez disso
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
  @use "@core/scss/template/pages/page-auth.scss";
</style>
