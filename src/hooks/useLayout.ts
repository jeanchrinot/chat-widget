import { create } from "zustand"

export type LayoutStore = {
  openDialog: boolean
  mainBgClassName: string
  mainBgTextColorClassName: string
  setOpenDialog: (status: boolean) => void
  setMainBgTextColorClassName: (className: string) => void
}

export const useLayout = create<LayoutStore>((set) => ({
  openDialog: false,
  mainBgClassName: "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
  mainBgTextColorClassName: "text-white",
  setOpenDialog: (status: boolean) => set({ openDialog: status }),
  setMainBgClassName: (className: string) =>
    set({ mainBgClassName: className }),
  setMainBgTextColorClassName: (className: string) =>
    set({ mainBgTextColorClassName: className }),
}))
