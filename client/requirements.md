## Packages
framer-motion | Essential for playful animations (bouncing, transitions)
lucide-react | Iconography for categories
clsx | For conditional class merging
tailwind-merge | For handling class conflicts

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["'Fredoka'", "'Comic Sans MS'", "cursive"],
  body: ["'Quicksand'", "sans-serif"],
}

Tailwind Config - extend colors:
colors: {
  wizmo: {
    blue: "#4da6ff",
    yellow: "#ffd93d",
    green: "#6bcb77",
    orange: "#ff9a3c",
    purple: "#9b72cf",
    bg: "#f0f8ff",
  }
}

Integration assumptions:
- "Wizmo" character image is at `/images/wizmo.png`
- API endpoints strictly follow @shared/routes
- LocalStorage used for offline persistence of scores
