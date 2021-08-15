<template>
  <p>Use this form to upload new data and watch current data:</p>

  <form @submit.prevent>
    <div>
      <label for="name">Document:</label>
      <input id="name" type="number" min="0" v-model="num" @change="reSub" />
    </div>

    <div>
      <label for="foo"><code>foo</code>:</label>
      <input id="foo" type="number" v-model="foo" />
      <button type="button" @click="setFoo">Update</button>
    </div>

    <div>
      <label for="bar"><code>bar</code>:</label>
      <input id="bar" type="text" v-model="bar" />
      <button type="button" @click="setBar">Update</button>
    </div>

  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Unsubscribe } from 'firebase/firestore';
import { subscribe, setField } from '@/cloud';


export default defineComponent({
  setup() {

    let unsub: Unsubscribe;

    const num = ref(0);
    const foo = ref(0);
    const bar = ref("");

    const reSub = () => {
      unsub?.();
      unsub = subscribe(`/some-collection/document-${num.value}`, data => {
        foo.value = data?.foo ?? 58008;
        bar.value = data?.bar ?? '[NOT SET IN FIRESTORE YET]';
      });
    }

    const setFoo = () => {
      setField(`/some-collection/document-${num.value}`, 'foo', foo.value);
    }

    const setBar = () => {
      setField(`/some-collection/document-${num.value}`, 'bar', bar.value);
    }

    reSub();

    return {
      num, foo, bar,
      reSub, setFoo, setBar
    };
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  max-width: 52ch;
}

form div {
  display: flex;
}

form label, form input, form button {
  width: auto;
  flex: 1 1 auto;
  margin: 0.5em 0.2em;
}

form label {
  flex-grow: 0;
  text-align: right;
}
</style>
