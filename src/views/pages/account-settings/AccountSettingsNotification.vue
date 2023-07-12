<script lang="ts" setup>
const recentDevices = ref(
  [
    {
      type: 'Novidade para você',
      email: true,
      browser: true,
      app: true,
    },
    {
      type: 'Atividade da conta',
      email: true,
      browser: true,
      app: true,
    },
    {
      type: 'Um novo navegador usado para fazer login',
      email: true,
      browser: true,
      app: false,
    },
    {
      type: 'Um novo dispositivo está vinculado',
      email: true,
      browser: false,
      app: false,
    },
  ],
)

const selectedNotification = ref('Só quando estou online')
</script>

<template>
  <VCard title="Dispositivos recentes">
    <VCardText>
      Precisamos de permissão do seu navegador para mostrar notificações.
      <a href="javascript:void(0)">Solicitar permissão</a>
    </VCardText>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            Tipo
          </th>
          <th scope="col">
            E-MAIL
          </th>
          <th scope="col">
            NAVEGADOR
          </th>
          <th scope="col">
            App
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="device in recentDevices"
          :key="device.type"
        >
          <td>
            {{ device.type }}
          </td>
          <td>
            <VCheckbox v-model="device.email" />
          </td>
          <td>
            <VCheckbox v-model="device.browser" />
          </td>
          <td>
            <VCheckbox v-model="device.app" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => {}">
        <p class="text-base font-weight-medium">
          Quando devemos enviar notificações?
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              v-model="selectedNotification"
              mandatory
              :items="['Somente quando estou online', 'A qualquer hora']"
            />
          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Salvar Alterações
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
          >
            Reiniciar
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
  .v-table {
    th {
      text-align: start !important;
    }
  }
</style>
