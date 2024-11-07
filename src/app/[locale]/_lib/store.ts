// store.ts
import { create } from "zustand";

interface DrawerCharacter {
  cid: number | null;
  cover: string;
  json: {
    name: string;
    data: {
      creator: string;
      character_version: string;
    };
  };
}

interface Store {
  isOpen: boolean;
  isDialogOpen: boolean;
  drawerCharacter: DrawerCharacter | null;
  selectedCid: number | null;
  selectedGreetingsIndex: number | null;
  selectedWorldBooks: number | null;
  selectedRegexIndex: number | null;
  proceedingList: { name: string; url: string }[] | null;
  openDrawer: (character: DrawerCharacter) => void;
  closeDrawer: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedCid: (cid: number | null) => void;
  setSelectGreetingsIndex: (index: number | null) => void;
  setSelectedWorldBooks: (id: number | null) => void;
  setSelectedRegexIndex: (id: number | null) => void;
  setProceedingList: (list: { name: string; url: string }[] | null) => void;
}

const useStore = create<Store>((set) => ({
  isOpen: false,
  isDialogOpen: false,
  drawerCharacter: null,
  selectedCid: null,
  selectedGreetingsIndex: null,
  selectedWorldBooks: null,
  selectedRegexIndex: null,
  proceedingList: null,
  openDrawer: (drawerCharacter: DrawerCharacter) =>
    set({ isOpen: true, drawerCharacter }),
  closeDrawer: () => set({ isOpen: false }),
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
  setSelectedCid: (cid: number | null) => set({ selectedCid: cid }),
  setSelectGreetingsIndex: (index: number | null) =>
    set({ selectedGreetingsIndex: index }),
  setSelectedWorldBooks: (id: number | null) => set({ selectedWorldBooks: id }),
  setSelectedRegexIndex: (id: number | null) => set({ selectedRegexIndex: id }),
  setProceedingList: (list: { name: string; url: string }[] | null) =>
    set({ proceedingList: list }),
}));

export default useStore;
