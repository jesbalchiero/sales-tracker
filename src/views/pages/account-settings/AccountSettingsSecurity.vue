<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('12345678')
const newPassword = ref('87654321')
const confirmPassword = ref('87654321')

const passwordRequirements = [
  'Mínimo de 8 caracteres - quanto mais, melhor',
  'Pelo menos um caractere minúsculo',
  'Pelo menos um número, símbolo ou caractere de espaço em branco',
]

const serverKeys = [
  {
    name: 'Chave do Servidor 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Acesso Total',
  },
  {
    name: 'Chave do Servidor 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Somente Leitura',
  },
  {
    name: 'Chave do Servidor 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Acesso Total',
  },
]

const recentDevicesHeaders = [
  { title: 'NAVEGADOR', key: 'browser' },
  { title: 'DISPOSITIVO', key: 'device' },
  { title: 'LOCALIZAÇÃO', key: 'location' },
  { title: 'ATIVIDADE RECENTE', key: 'recentActivity' },
]

const recentDevices = [
  {
    browser: 'Chrome no Windows',
    device: 'HP Spectre 360',
    location: 'Nova Iorque, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },
  {
    browser: 'Chrome no iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'bx-mobile', color: 'error' },
  },
  {
    browser: 'Chrome no Android',
    device: 'Oneplus 9 Pro',
    location: 'São Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'bxl-android', color: 'success' },
  },
  {
    browser: 'Chrome no MacOS',
    device: 'Apple iMac',
    location: 'Nova Iorque, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-apple', color: 'secondary' },
  },
  {
    browser: 'Chrome no Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },
  {
    browser: 'Chrome no Android',
    device: 'Oneplus 9 Pro',
    location: 'São Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'bxl-android', color: 'success' },
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Alterar a Senha">
        <VForm>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Senha Atual"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Nova Senha"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Confirme a Nova Senha"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Requisitos de Senha:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="bxs-circle"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Salvar Alterações</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Reiniciar
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Autenticação de Dois Fatores">
        <VCardText>
          <p class="font-weight-semibold">
            A autenticação de dois fatores ainda não está habilitada.
          </p>
          <p>
            A autenticação de dois fatores adiciona uma camada adicional de segurança à sua conta, exigindo mais do que apenas uma senha para fazer login.
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Saber mais.</a>
          </p>

          <VBtn>
            Ativar 2FA
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Criar uma chave de API">
        <VRow>
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText>
              <VForm @submit.prevent="() => {}">
                <VRow>
                  <VCol cols="12">
                    <VSelect
                      label="Escolha o tipo de chave de API que você deseja criar"
                      placeholder="Selecione o tipo de chave de API"
                      :items="['Controle Total', 'Modificar', 'Ler e Executar', 'Listar Conteúdo da Pasta', 'Somente Leitura', 'Ler e Gravar']"
                    />
                  </VCol>

                  <VCol cols="12">
                    <VTextField
                      label="Nomeie a chave de API"
                      placeholder="Nomeie a chave de API"
                    />
                  </VCol>

                  <VCol cols="12">
                    <VBtn
                      type="submit"
                      block
                    >
                      Criar Chave
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Lista de chaves de API &amp; Acesso">
        <VCardText>
          Uma chave de API é uma string criptografada simples que identifica um aplicativo sem nenhum principal.
        </VCardText>

        <VCardText class="d-flex flex-column gap-y-4">
          <div
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            class="bg-var-theme-background pa-4"
          >
            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 mb-0 me-3">
                {{ serverKey.name }}
              </h6>
              <VChip
                label
                color="primary"
                size="small"
              >
                {{ serverKey.permission }}
              </VChip>
            </div>
            <p class="text-base font-weight-medium">
              <span class="me-3">{{ serverKey.key }}</span>
              <VIcon
                :size="18"
                icon="bx-copy"
                class="cursor-pointer"
              />
            </p>
            <span>Criado em {{ serverKey.createdOn }}</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Dispositivos Recentes">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
