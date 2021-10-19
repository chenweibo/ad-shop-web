<template>
  <div class="size">
    账户余额：{{ momey }}元
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Momey',
  props: {},
  data() {
    return {}
  }, computed: {
    ...mapGetters([
      'momey'
    ])
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.size{
  font-size: 15px!important;
}
</style>
