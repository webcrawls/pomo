import type { Updater, Writable } from "svelte/store";
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { debounce } from "$lib/util";

// Defines options that can be passed to the localStore
export interface StoreTarget<T> {
  key: string;
  defaultValue?: T;
  deserializer?: (value: string) => T;
  serializer?: (value: T) => string;
}

// Creates a localStorage-backed Svelte store
export const localStore = <T = any>(
  storageTarget?: StoreTarget<T>,
): Writable<T> & {
  target: (target: StoreTarget<T>) => void;
} => {
  const {
    subscribe,
    set: initialSet,
    update: initialUpdate,
  } = writable<T>(storageTarget?.defaultValue);

  // state
  let _value: T;
  let _key: string | undefined;
  let _deserializer: ((value: string) => T) | undefined;
  let _serializer: ((value: T) => string) | undefined;
  let _defaultValue: T | undefined;

  // If a storageTarget has been provided,
  // this function will load the stored value into localStorage
  const loadStorage = (): void => {
    if (!_key || !_deserializer) return;

    const stored = browser ? localStorage.getItem(_key) : null;
    const deserialized = stored ? _deserializer(stored) : null;

    if (stored) {
      // @ts-ignore it wont be null i promise
      initialSet(deserialized);
    } else if (_defaultValue) {
      set(_defaultValue);
    }
  };

  // If a storageTarget has been provided,
  // this function saves the store's current value to localStorage.
  const saveStorage = () => {
    if (!_key || !_serializer) return;
    browser && localStorage.setItem(_key, _serializer(_value));
  };

  const target = (newTarget: StoreTarget<T>) => {
    // initialize state
    _key = newTarget.key;
    _defaultValue = newTarget.defaultValue;

    // defaulting to JSON parse/stringify if no *ializers were passed
    _deserializer = newTarget.deserializer ?? JSON.parse;
    _serializer = newTarget.serializer ?? JSON.stringify;

    loadStorage();
  };
  // A custom store.set that calls saveStorage

  const set = (newValue: T) => {
    _value = newValue;
    console.log({ set: _value });
    initialSet(_value);
    saveStorage();
  };
  // A custom store.update that proxies to our store.set

  const update = (fn: Updater<T>): void => set(fn(_value));
  // Updates the store's target. This will load from storage.

  // If an initial storageTarget was given, load from storage..
  if (storageTarget && storageTarget.key) {
    target(storageTarget);
    loadStorage();
  }

  return { subscribe, set: debounce(set, 100), update, target };
};
