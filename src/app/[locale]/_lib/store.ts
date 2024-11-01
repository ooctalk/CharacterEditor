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
  selectedRegexIndex: number | null; // 修改为 string | null
  openDrawer: (character: DrawerCharacter) => void;
  closeDrawer: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedCid: (cid: number | null) => void;
  setSelectGreetingsIndex: (index: number | null) => void;
  setSelectedWorldBooks: (id: number | null) => void;
  setSelectedRegexIndex: (id: number | null) => void; // 修改为 string | null
}

const useStore = create<Store>((set) => ({
  isOpen: false,
  isDialogOpen: false,
  drawerCharacter: null,
  selectedCid: null,
  selectedGreetingsIndex: null,
  selectedWorldBooks: null, // 初始化 selectedWorldBooks
  selectedRegexIndex: null, // 初始化为 null
  openDrawer: (drawerCharacter: DrawerCharacter) =>
    set({ isOpen: true, drawerCharacter }),
  closeDrawer: () => set({ isOpen: false }),
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
  setSelectedCid: (cid: number | null) => set({ selectedCid: cid }),
  setSelectGreetingsIndex: (index: number | null) =>
    set({ selectedGreetingsIndex: index }),
  setSelectedWorldBooks: (id: number | null) => set({ selectedWorldBooks: id }), // 实现 setSelectedWorldBooks
  setSelectedRegexIndex: (id: number | null) => set({ selectedRegexIndex: id }),
}));

export default useStore;
