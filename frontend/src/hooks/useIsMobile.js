import { useSyncExternalStore } from "react";

const query = window.matchMedia("(min-width: 52.125rem)");
const subscribe = (listener) => {
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};

export default function useIsMobile() {
  return useSyncExternalStore(subscribe, () => !query.matches, () => true);
}
