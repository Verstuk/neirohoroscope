"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { getZodiacSign, zodiacSigns } from "@/lib/zodiac"
import { motion } from "framer-motion"
import { ru } from "date-fns/locale"

interface DatePickerProps {
  onSelect: (date: Date | null) => void
  selected: Date | null
}

export function DatePicker({ onSelect, selected }: DatePickerProps) {
  const [date, setDate] = useState<Date | null>(selected)
  const zodiacSign = date ? getZodiacSign(date) : null

  const handleSelect = (date: Date | undefined) => {
    const dateToUse = date ?? null;
    setDate(dateToUse);
    onSelect(dateToUse);
  };
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Label className="text-lg font-medium text-[#7eeeff]">Ваша Дата Рождения</Label>
        <p className="text-sm text-[#7eeeff]/70 mb-2">Выберите дату рождения, чтобы определить ваш знак зодиака</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-[#052e36]/60 p-4 rounded-lg border border-[#7eeeff]/20 shadow-[0_0_10px_rgba(126,238,255,0.1)]">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={handleSelect}
            locale={ru}
            className="bg-transparent"
            classNames={{
              day_selected: "bg-[#f8d64e] text-[#052e36]",
              day_today: "bg-[#7eeeff]/20 text-[#7eeeff]",
              day: "hover:bg-[#0a4b5c] focus:bg-[#0a4b5c]",
            }}
          />
        </div>

        {zodiacSign && (
          <motion.div
            className="bg-[#052e36]/60 p-6 rounded-lg border border-[#7eeeff]/20 flex-1 flex flex-col justify-center items-center relative overflow-hidden shadow-[0_0_10px_rgba(126,238,255,0.1)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#f8d64e]/5 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="text-4xl mb-2 relative z-10">
              {zodiacSigns.find((sign) => sign.name === zodiacSign)?.symbol}
            </div>
            <h3 className="text-xl font-serif text-[#f8d64e] mb-1 relative z-10">
              {zodiacSigns.find((sign) => sign.name === zodiacSign)?.russianName}
            </h3>
            <p className="text-sm opacity-80 text-center relative z-10">
              {zodiacSigns.find((sign) => sign.name === zodiacSign)?.russianDates}
            </p>

            {/* Constellation lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
              <motion.path
                d="M20,20 L40,30 L60,25 L80,40 L70,60 L50,70 L30,50 Z"
                stroke="#f8d64e"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

