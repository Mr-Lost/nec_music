<template>
    <div id="my-header">
      <div class="header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="header-main">
        <slot name="header-main"></slot>
      </div>
      <div class="header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'myHeader'
}
</script>

<style scoped lang="scss" src="@/assets/css/myHeader.scss">
</style>
