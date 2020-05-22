<template>
  <button
    class="px-3 py-1 border border-red-600 bg-red-600 text-white rounded text-xs shadow"
    @click="reset()"
  >
    <font-awesome-icon :icon="['fa', 'undo']" />
  </button>
</template>

<script>

export default {
    methods: {
        reset() {
            if (confirm('Wirklich zurücksetzen?')) {
                this.$parent.active = null
                this.$parent.notes = ''
                localStorage.clear()
            }
        }
    }
}

</script>
