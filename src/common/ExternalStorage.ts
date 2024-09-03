"use client"

export abstract class ExternalStorage {
  private listeners: (()=> void)[] = [];
  subscribe = (listener: () => void) => {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };
  emitChange = () => {
    for (let listener of this.listeners) {
      listener();
    }
  }
  abstract getSnapshot(): unknown
}