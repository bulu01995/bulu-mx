"use client"

/**
 * Dynamically load Lucide icons on the client.
 * Any icon you export from here will be tree-shaken automatically.
 */
import dynamic from "next/dynamic"
import type { SVGProps } from "react"
import type { JSX } from "react" // Declare JSX variable

function lazy(name: string) {
  return dynamic(
    async () => {
      const mod = await import("lucide-react")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore – dynamic key access is fine here
      const Icon = mod[name] as (props: SVGProps<SVGSVGElement>) => JSX.Element
      return (props: SVGProps<SVGSVGElement>) => <Icon {...props} />
    },
    { ssr: false },
  )
}

/* Export only the icons we actually use */
export const HardHat = lazy("HardHat")
export const Search = lazy("Search")
export const Edit = lazy("Edit")
export const Trash2 = lazy("Trash2")
export const Eye = lazy("Eye")
export const Phone = lazy("Phone")
export const MapPin = lazy("MapPin")
export const Star = lazy("Star")
export const Briefcase = lazy("Briefcase")
export const ToggleLeft = lazy("ToggleLeft")
export const ToggleRight = lazy("ToggleRight")
export const Shield = lazy("Shield")
export const ShieldCheck = lazy("ShieldCheck")
export const UserPlus = lazy("UserPlus")
export const Filter = lazy("Filter")
export const CheckCircle = lazy("CheckCircle")
export const XCircle = lazy("XCircle")
export const Clock = lazy("Clock")
export const Plus = lazy("Plus")
export const Mail = lazy("Mail")
export const Save = lazy("Save")
export const ArrowLeft = lazy("ArrowLeft")
export const FileText = lazy("FileText")
export const User = lazy("User")
