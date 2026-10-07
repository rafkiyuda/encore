import {
  Building2, CalendarCheck, CookingPot, CupSoda, Lightbulb, PartyPopper, Store, Tent, Truck,
} from 'lucide-react'

// Peta nama ikon (dipakai dari config.js) → komponen lucide
const icons = { Building2, CalendarCheck, CookingPot, CupSoda, Lightbulb, PartyPopper, Store, Tent, Truck }

export default function Icon({ name, ...props }) {
  const C = icons[name] ?? Lightbulb
  return <C aria-hidden="true" {...props} />
}
