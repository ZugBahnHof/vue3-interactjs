<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  watchEffect,
  PropType,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
} from "vue";
import { useInteractEvents } from "./utils";
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

const events = useInteractEvents(interactInstance, emit);

onMounted(() => {
  interactInstance.value = interact(root.value as Target);
  events.enablePointer();
  emit("ready", interactInstance.value);
});

watchEffect(() => {
  if (!interactInstance.value || !root.value) {
    // Only run after initial setup
    return;
  }

  if (props.draggable) {
    initDrag();
  } else {
    events.disableDrag();
  }

  if (props.resizable) {
    initResize();
  } else {
    events.disableResize();
  }

  if (props.droppable) {
    initDrop();
  } else {
    events.disableDrop();
  }

  if (props.gesturable) {
    initGesture();
  } else {
    events.disableGesture();
  }
});
function initDrag() {
  console.log("Drag init");
  interactInstance.value?.draggable(props.dragOption);
  events.enableDrag();
}
function initResize() {
  interactInstance.value?.resizable(props.resizeOption);
  events.enableResize();
}
function initDrop() {
  interactInstance.value?.dropzone(props.dropOption);
  events.enableDrop();
}
function initGesture() {
  interactInstance.value?.gesturable(props.gestureOption);
  events.enableGesture();
}
function disable() {
  interactInstance.value?.unset();
  interactInstance.value = null;
  console.log("Disabled");
}
onBeforeUnmount(disable);
onUnmounted(disable);

defineExpose({
  interact: interactInstance,
  $el: root,
  root,
  disable,
});
</script>

<template>
  <component :is="tag" ref="root" class="interact">
    <slot />
  </component>
</template>
