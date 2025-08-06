<template>
  <div class="snapping">
    <interact
      draggable
      :dragOption="dragOption"
      class="grid-snap"
      @dragmove="dragmove"
    >
      Dragging is constrained to the corners of a grid
    </interact>
  </div>
</template>

<script setup lang="ts">
import interactjs from "interactjs";
import { InteractEvent } from "interactjs";
import { ref } from "vue";

const dragOption = ref({
  inertia: true,
  modifiers: [
    interactjs.modifiers.snap({
      targets: [interactjs.createSnapGrid({ x: 20, y: 20 })],
      range: Infinity,
      relativePoints: [{ x: 0, y: 0 }],
      offset: "parent",
    }),
    interactjs.modifiers.restrict({
      restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      endOnly: true,
    }),
  ],
});
const x = ref(0);
const y = ref(0);

function dragmove(event: InteractEvent<"drag">) {
  x.value += event.dx;
  y.value += event.dy;

  event.target.style.transform =
    "translate(" + x.value + "px, " + y.value + "px)";
}
</script>

<style scoped>
.snapping {
  width: 400px;
  height: 400px;
  background: white;

  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  box-sizing: border-box;
}
.grid-snap {
  width: 40%;
  height: 160px;
  background-color: #29e;
  color: #fff;
  font-size: 1.2em;
  border-radius: 4px;
  padding: 2%;
  touch-action: none;
  box-sizing: border-box;
}
</style>
