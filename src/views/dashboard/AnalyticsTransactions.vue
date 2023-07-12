<script setup lang="ts">
import chartInfo from '@images/cards/chart-info.png'
import creditCardSuccess from '@images/cards/credit-card-success.png'
import creditCardWarning from '@images/cards/credit-card-warning.png'
import paypalError from '@images/cards/paypal-error.png'
import walletPrimary from '@images/cards/wallet-primary.png'

const transactions = [
  {
    amount: +82.6,
    paymentMethod: 'Paypal',
    description: 'Enviar dinheiro',
    icon: paypalError,
    color: 'error',
  },
  {
    paymentMethod: 'Carteira',
    amount: +270.69,
    description: 'Pix',
    icon: walletPrimary,
    color: 'primary',
  },
  {
    amount: +637.91,
    paymentMethod: 'Transferir',
    description: 'Reembolso',
    icon: chartInfo,
    color: 'info',
  },
  {
    paymentMethod: 'Cartão de Crédito',
    amount: -838.71,
    description: 'Pedido de Comida',
    icon: creditCardSuccess,
    color: 'success',
  },
  {
    paymentMethod: 'Carteira',
    amount: +203.33,
    description: 'Starbucks',
    icon: walletPrimary,
    color: 'primary',
  },
  {
    paymentMethod: 'Mastercard',
    amount: -92.45,
    description: 'Pedido de Comida',
    icon: creditCardWarning,
    color: 'warning',
  },
]
</script>

<template>
  <VCard title="Transações">
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="item in transactions"
          :key="item.paymentMethod"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="item.color"
              :image="item.icon"
              class="me-3"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1">
            {{ item.paymentMethod }}
          </VListItemSubtitle>
          <VListItemTitle>
            {{ item.description }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1">{{ item.amount > 0 ? `+R$${Math.abs(item.amount)}` : `-R$${Math.abs(item.amount)}` }}</span>
              <span class="text-disabled">BRL</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.6rem;
  }
</style>
