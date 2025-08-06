# vue3-interactjs

Vue3-interactjs is **[interact.js](https://interactjs.io/)** component for [Vue3](http://vuejs.org).

# Install

## NPM

```sh
$ npm install vue3-interactjs
```

## Yarn

```sh
$ yarn add vue3-interactjs
```

# Registration

## JavaScript

```javascript
import { createApp } from "vue";
import VueInteractJs from "vue3-interactjs";

const app = createApp(...);
app.use(VueInteractJs);

// Now the app has started!
app.mount("#app");
```

# Component

```html
<template>
  <interact
    draggable
    :dragOption="dragOption"
    resizable
    :resizeOption="resizeOption"
    class="resize-drag"
    :style="style"
    @dragmove="dragmove"
    @resizemove="resizemove"
  >
    Drag and drop, resize from any edge or corner
  </interact>
</template>

<script>
  import interact from "interactjs";

  export default {
    name: "resizeDrag",
    data: () => ({
      resizeOption: {
        edges: { left: true, right: true, bottom: true, top: true },
      },
      dragOption: {
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
      },
      // values for interact.js transformation
      x: 0,
      y: 0,
      w: 200,
      h: 200,
    }),

    computed: {
      style() {
        return {
          height: `${this.h}px`,
          width: `${this.w}px`,
          transform: `translate(${this.x}px, ${this.y}px)`,
        };
      },
    },

    methods: {
      dragmove(event) {
        this.x += event.dx;
        this.y += event.dy;
      },
      resizemove(event) {
        this.w = event.rect.width;
        this.h = event.rect.height;

        this.x += event.deltaRect.left;
        this.y += event.deltaRect.top;
      },
    },
  };
</script>

<style scoped>
  .resize-drag {
    box-sizing: border-box;
    background: #41b883;

    /* To prevent interact.js warnings */
    user-select: none;
    -ms-touch-action: none;
    touch-action: none;
  }
</style>
```

# Vue-interactjs component API

```html
<!-- Add draggable / resizable / gesturable, then interact.js events are enabled -->
<!-- Options are passed to interact.js option -->
<interact
  :draggable="draggable"
  :dragOption="dragOption"
  :resizable="resizable"
  :resizeOption="resizeOption"
  :gesturable="gesturable"
  :gestureOption="resizeOption"
/>
```

```html
<!-- vue-interactjs converts all interact.js events into component events, e.g.: -->
<!-- Event names are lowerCase (same as interact.js) -->
<interact
  draggable
  resizable
  @dragstart="dragstart"
  @dragmove="dragmove"
  @draginertiastart="draginertiastart"
  @dragend="dragend"
  @resizemove="resizemove"
  @ready="ready"
  @hold="hold"
  ...
/>
```

## See Demo

Clone this repository and run command

```sh
$ npm run demo:dev
```

## interact.js API

- [Guide](https://interactjs.io/docs/)
- [API](https://interactjs.io/docs/api/Interactable.html)

# License

[MIT](https://github.com/ZugBahnHof/vue3-interactjs/blob/master/LICENSE)
