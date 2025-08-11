import {
  dragEvents,
  dropEvents,
  gestureEvents,
  pointerEvents,
  resizeEvents,
} from "./events";
import type { Interactable } from "interactjs";
import type { EmitFn, Ref } from "vue";

// Stores which handlers are currently active per Interactable
const activeHandlers = new WeakMap<
  Interactable,
  Map<string, (...args: unknown[]) => void>
>();

/**
 * Bind a group of events to an Interactable if they are not already bound.
 * Prevents duplicate listeners.
 */
function bindEvents(interact: Interactable, events: string[], emit: EmitFn) {
  let handlerMap = activeHandlers.get(interact);
  if (!handlerMap) {
    handlerMap = new Map();
    activeHandlers.set(interact, handlerMap);
  }

  events.forEach((eventName) => {
    // Skip if the event is already bound
    if (handlerMap!.has(eventName)) return;

    const handler = (...args: unknown[]) => emit(eventName, ...args);
    handlerMap!.set(eventName, handler);
    interact.on(eventName, handler);
  });
}

/**
 * Unbind a group of events from an Interactable.
 * Only removes the specific handlers that were bound by this composable.
 */
function unbindEvents(interact: Interactable, events: string[]) {
  const handlerMap = activeHandlers.get(interact);
  if (!handlerMap) return;

  events.forEach((eventName) => {
    const handler = handlerMap.get(eventName);
    if (handler) {
      interact.off(eventName, handler);
      handlerMap.delete(eventName);
    }
  });

  // If no handlers remain for this Interactable, clean up the map
  if (handlerMap.size === 0) {
    activeHandlers.delete(interact);
  }
}

/**
 * Composable for enabling/disabling Interact.js event groups in a safe,
 * duplicate-free way.
 */
export function useInteractEvents(interact: Ref<Interactable>, emit: EmitFn) {
  return {
    enablePointer: () => bindEvents(interact.value, pointerEvents, emit),
    disablePointer: () => unbindEvents(interact.value, pointerEvents),

    enableDrag: () => bindEvents(interact.value, dragEvents, emit),
    disableDrag: () => unbindEvents(interact.value, dragEvents),

    enableDrop: () => bindEvents(interact.value, dropEvents, emit),
    disableDrop: () => unbindEvents(interact.value, dropEvents),

    enableResize: () => bindEvents(interact.value, resizeEvents, emit),
    disableResize: () => unbindEvents(interact.value, resizeEvents),

    enableGesture: () => bindEvents(interact.value, gestureEvents, emit),
    disableGesture: () => unbindEvents(interact.value, gestureEvents),
  };
}
