import { create } from "zustand";

interface Store {
  isOpen: boolean;
  isDialogOpen: boolean;
  selectedCid: number | null;
  selectedGreetingsIndex: number | null;
  selectedWorldBooks: number | null;
  selectedRegexIndex: number | null;
  proceedingList: { name: string; url: string }[] | null;
  convertorContent: string | null;
  selectCharacterDialogID: number | null;
  selectCharacterDialogOpen: boolean;
  closeDrawer: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedCid: (cid: number | null) => void;
  setSelectGreetingsIndex: (index: number | null) => void;
  setSelectedWorldBooks: (id: number | null) => void;
  setSelectedRegexIndex: (id: number | null) => void;
  setProceedingList: (list: { name: string; url: string }[] | null) => void;
  setConvertorContent: (content: string) => void;
  setSelectCharacterDialogID: (id: number | null) => void;
  setSelectCharacterDialogOpen: (open: boolean) => void;
}

const useStore = create<Store>((set) => ({
  isOpen: false,
  isDialogOpen: false,
  selectedCid: null,
  selectedGreetingsIndex: null,
  selectedWorldBooks: null,
  selectedRegexIndex: null,
  proceedingList: null,
  convertorContent: null,
  selectCharacterDialogID: null,
  selectCharacterDialogOpen: false,
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
  setConvertorContent: (content: string) => set({ convertorContent: content }),
  setSelectCharacterDialogID: (id: number | null) => set({ selectCharacterDialogID: id }),
  setSelectCharacterDialogOpen: (open: boolean) => set({ selectCharacterDialogOpen: open }),
}));

export default useStore;
