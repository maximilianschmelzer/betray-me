<template>
  <div class="flex">
    <div class="text-center text-sm mr-2">
      {{ omen }} Omen
    </div>
    <div class="flex-auto" />
    <button
      class="mr-3 border border-red-600 shadow bg-red-600 text-white rounded text-sm w-6 h-6"
      @click="decrement()"
    >
      <font-awesome-icon :icon="['fa', 'minus']" />
    </button>
    <button
      class="border border-green-600 shadow bg-green-600 text-white rounded text-sm w-6 h-6"
      @click="increment()"
    >
      <font-awesome-icon :icon="['fa', 'plus']" />
    </button>
  </div>
</template>

<script>

export default {
    data() {
        return {
            omen: this.getOmen()
        }
    },
    methods: {
        getOmen: () => {
            const count = localStorage.getItem('omen')
            return null !== count ? parseInt(count) : 0
        },
        increment() {
            if (12 === this.omen) {
                return
            }

            this.omen++
            this.saveInStorage()
        },
        decrement() {
            if (0 === this.omen) {
                return
            }

            this.omen--
            this.saveInStorage()
        },
        saveInStorage() {
            localStorage.setItem('omen', this.omen)
        }
    }
}

</script>
