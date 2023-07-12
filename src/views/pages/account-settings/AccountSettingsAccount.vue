<script lang="ts" setup>
const accountData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'Figma',
  phone: '+55 (54) 3543-9876',
  address: 'Av Rio Branco, Caxias do Sul, 10001',
  state: 'Rio Grande do Sul',
  cep: '99996958',
  country: 'Brasil',
  language: 'Português',
  timezone: '(GMT-03:00) Brasilia',
  currency: 'BRL',
}

const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR',
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Detalhes da Conta">
        <VCardText>
          <VForm class="mt-6">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.firstName"
                  placeholder="John"
                  label="Nome"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.lastName"
                  placeholder="Doe"
                  label="Sobrenome"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.org"
                  label="Organização"
                  placeholder="SalesTracker"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.phone"
                  label="PTelefone"
                  placeholder="+55 (54) 3223-3223"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.address"
                  label="Endereço"
                  placeholder="Av Faria Lima, São Paulo, 768"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.state"
                  label="Estado"
                  placeholder="São Paulo"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.cep"
                  label="Cep"
                  placeholder="99999-999"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="accountDataLocal.country"
                  label="País"
                  :items="['USA', 'Canada', 'UK', 'Brasil', 'Argentina', 'Espanha', 'Australia']"
                  placeholder="País"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="accountDataLocal.language"
                  label="Linguagem"
                  placeholder="Linguagem"
                  :items="['English', 'Spanish', 'Português']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="accountDataLocal.timezone"
                  label="Fuso Horário"
                  placeholder="Fuso Horário"
                  :items="timezones"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="accountDataLocal.currency"
                  label="Moeda"
                  placeholder="Moeda"
                  :items="currencies"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Salvar alterações</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reiniciar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Desativar Conta">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="Confirmo a desativação da minha conta"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
          >
            Desativar Conta
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
