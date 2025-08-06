<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  watchEffect,
  PropType,
  onMounted,
  onUnmounted,
} from "vue";
import {
  bindDragEvents,
  bindDropEvents,
  bindGestureEvents,
  bindPointerEvents,
  bindResizeEvents,
} from "./utils";
import { Interactable, Target } from "interactjs";
import { DraggableOptions } from "@interactjs/actions/drag/plugin";
import { DropzoneOptions } from "@interactjs/actions/drop/plugin";
import { GesturableOptions } from "@interactjs/actions/gesture/plugin";
import { ResizableOptions } from "@interactjs/actions/resize/plugin";
import interact from "interactjs";
import {
  dragEvents,
  dropEvents,
  gestureEvents,
  pointerEvents,
  resizeEvents,
} from "./events";

const props = defineProps({
  draggable: { type: Boolean, required: false },
  dragOption: {
    type: Object as PropType<DraggableOptions>,
    default: () => ({}) as DraggableOptions,
  },
  resizable: { type: Boolean, required: false },
  resizeOption: {
    type: Object as PropType<ResizableOptions>,
    default: () => ({}) as ResizableOptions,
  },
  droppable: { type: Boolean, required: false },
  dropOption: {
    type: Object as PropType<DropzoneOptions>,
    default: () => ({}) as DropzoneOptions,
  },
  gesturable: { type: Boolean, required: false },
  gestureOption: {
    type: Object as PropType<GesturableOptions>,
    default: () => ({}) as GesturableOptions,
  },
  tag: {
    type: String,
    default: "div",
  },
});

const interactInstance = ref<Interactable | null>(null);
const root = ref<Element | null>(null);

const emit = defineEmits([
  "ready",
  ...dragEvents,
  ...resizeEvents,
  ...dropEvents,
  ...gestureEvents,
  ...pointerEvents,
]);

onMounted(() => {
  interactInstance.value = interact(root.value as Target);
  bindPointerEvents(interactInstance.value, emit.bind(this));
  emit("ready", interactInstance.value);
});

watchEffect(() => {
  if (!interactInstance.value || !root.value) {
    // Only run after initial setup
    return;
  }

  if (props.draggable) {
    initDrag();
  }
  if (props.resizable) {
    initResize();
  }
  if (props.droppable) {
    initDrop();
  }
  if (props.gesturable) {
    initGesture();
  }
});
function initDrag() {
  console.log("Drag init");
  interactInstance.value?.draggable(props.dragOption);
  bindDragEvents(interactInstance.value as Interactable, emit);
}
function initResize() {
  interactInstance.value?.resizable(props.resizeOption);
  bindResizeEvents(interactInstance.value as Interactable, emit);
}
function initDrop() {
  interactInstance.value?.dropzone(props.dropOption);
  bindDropEvents(interactInstance.value as Interactable, emit);
}
function initGesture() {
  interactInstance.value?.gesturable(props.gestureOption);
  bindGestureEvents(interactInstance.value as Interactable, emit);
}
onUnmounted(() => {
  interactInstance.value?.unset();
  interactInstance.value = null;
});
</script>

<template>
  <component :is="tag" ref="root" class="interact">
    <slot />
  </component>
</template>
