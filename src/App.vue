<template>
  <div>
    <div class="flex mx-4 my-4 items-center">
      <a
        href="https://github.com/m4xsh/bahoth-helper"
        target="_blank"
      ><h1 class="text-center text-xl">github <font-awesome-icon
        class="text-red-600"
        :icon="['fa', 'heart']"
      /></h1></a>
      <div class="flex-auto" />
      <OmenCounter v-if="characterSelected()" />
      <div class="flex-auto" />
      <ResetButton v-if="characterSelected()" />
    </div>
    <div class="mx-8">
      <div
        v-for="item in items"
        :key="item"
        class="justify-center flex flex-col"
      >
        <button
          v-if="showName(item.id)"
          :class="{'text-2xl':true, ['text-'+item.color+'-400']:true}"
          @click="setActive(item.id)"
        >
          {{ item.name }}
        </button>
        <div v-if="active == item.id">
          <div class="flex text-xs flex-col text-center">
            <div>Alter: {{ item.age }}</div>
            <div>Größe: {{ item.size }} m</div>
            <div>Gewicht: {{ item.weight }} kg</div>
            <div>Hobbys: {{ item.hobbies.join(', ') }}</div>
            <div>Geburtstag: {{ item.birthday }}</div>
          </div>
          <div
            v-for="type in [['speed', 'Tempo'], ['might', 'Stärke'], ['sanity', 'Verstand'], ['knowledge', 'Wissen']]"
            :key="type"
            class="my-4"
          >
            <div class="my-2 text-center">
              {{ type[1] }}
            </div>
            <div class="flex justify-center">
              <div
                v-for="(val, key) in item.stats[type[0]].values"
                :key="val"
              >
                <div :set="checked = isChecked(item.id + item.stats[type[0]].id, item.stats[type[0]].baseIndex, key)">
                  <input
                    :id="item.id + item.stats[type[0]].id + key"
                    type="radio"
                    class="hidden"
                    :name="item.id + item.stats[type[0]].id"
                    :value="val"
                    :checked="checked"
                  >
                  <label
                    v-if="val != 0"
                    class="border-2 border-gray-200 p-2 bg-gray-200 rounded shadow text-xs mx-1"
                    :class="{'bg-green-300 border-green-300' : item.stats[type[0]].baseIndex == key}"
                    :for="item.id + item.stats[type[0]].id + key"
                    @click="save(item.id + item.stats[type[0]].id, key)"
                  >
                    {{ val }}
                  </label>
                  <label
                    v-else
                    class="border-2 border-gray-200 p-2 bg-gray-200 rounded shadow text-xs mx-1"
                    :for="item.id + item.stats[type[0]].id + key"
                    @click="save(item.id + item.stats[type[0]].id, key)"
                  >
                    <font-awesome-icon :icon="['fa', 'skull']" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notes v-if="characterSelected()" />
    </div>
  </div>
</template>

<script>
import data from './assets/data.json'
import OmenCounter from './components/OmenCounter'
import ResetButton from './components/ResetButton'
import Notes from './components/Notes'

export default {
    components: {
        OmenCounter, ResetButton, Notes
    },
    data() {
        return {
            items: data.items,
            active: localStorage.getItem('active')
        }
    },
    methods: {
        save: (key, value) => {
            localStorage.setItem(key, value)
        },
        isChecked: (storageKey, baseIndex, currentKey) => {
            const storage = localStorage.getItem(storageKey);
            return (null !== storage && storage == currentKey) || (null === storage && currentKey == baseIndex)
        },
        isActive: (id) => {
            return id == localStorage.getItem('active')
        },
        setActive(id) {
            this.active = id
            localStorage.setItem('active', id)
        },
        showName: (id) => {
            const active = localStorage.getItem('active')
            return null === active || id == localStorage.getItem('active')
        },
        characterSelected: () => {
            return null !== localStorage.getItem('active')
        }
    }
}
</script>

<style>
    input:checked ~ label {
        @apply border-gray-700;
    }
</style>
