<template>
  <shop-detail :is-edit="true" />
</template>

<script>
import ShopDetail from './components/ShopDetail'
export default {
  name: 'CreateShop',
  components: { ShopDetail }
}
</script>
