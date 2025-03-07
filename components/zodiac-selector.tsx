"use client"

import { zodiacSigns } from "@/lib/zodiac"
import { motion } from "framer-motion"

interface ZodiacSelectorProps {
  onSelect: (sign: string) => void
  selected: string | null
}

export function ZodiacSelector({ onSelect, selected }: ZodiacSelectorProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 text-[#7eeeff]">Выберите Ваш Знак Зодиака</h3>
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {zodiacSigns.map((sign) => (
          <motion.div
            key={sign.name}
            variants={item}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(248, 214, 78, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(sign.name)}
            className={`
              cursor-pointer rounded-lg p-3 text-center transition-all relative overflow-hidden
              ${
                selected === sign.name
                  ? "bg-gradient-to-br from-[#f8d64e]/80 to-[#f8a832]/80 text-[#052e36] border border-[#f8d64e]"
                  : "bg-[#052e36]/60 hover:bg-[#0a4b5c]/60 border border-[#7eeeff]/20"
              }
            `}
          >
            {selected === sign.name && (
              <motion.div
                className="absolute inset-0 bg-[#f8d64e]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
            <div className="flex flex-col items-center relative z-10">
              <div className="text-2xl mb-1">{sign.symbol}</div>
              <div className="text-sm font-medium">{sign.russianName}</div>
              <div className="text-xs opacity-70">{sign.russianDates}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

