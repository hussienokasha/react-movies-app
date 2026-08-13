let startLoading: (() => void) | null = null;
let stopLoading: (() => void) | null = null;

export const loadingManager = {
  setStartLoading(fn: () => void) {
    startLoading = fn;
  },

  setStopLoading(fn: () => void) {
    stopLoading = fn;
  },

  start() {
    startLoading?.();
  },

  stop() {
    stopLoading?.();
  },
};  