"use client"

import { useState } from "react"
import { ZodiacSelector } from "@/components/zodiac-selector"
import { DatePicker } from "@/components/date-picker"
import { HoroscopeResult } from "@/components/horoscope-result"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles } from "lucide-react"
import { getZodiacSign } from "@/lib/zodiac"
import { motion } from "framer-motion"
import { ConstellationBackground } from "@/components/constellation-background"

export default function Home() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null)
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [period, setPeriod] = useState<"daily" | "weekly">("daily")
  const [horoscope, setHoroscope] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [inputMethod, setInputMethod] = useState<"sign" | "date">("sign")

  const handleSignSelect = (sign: string) => {
    setSelectedSign(sign)
  }

  const handleDateSelect = (date: Date | null) => {
    setBirthDate(date)
    if (date) {
      const sign = getZodiacSign(date)
      setSelectedSign(sign)
    }
  }

  const generateHoroscope = async () => {
    if (!selectedSign) return

    setLoading(true)
    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sign: selectedSign,
          period: period,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate horoscope")
      }

      const data = await response.json()
      setHoroscope(data)
    } catch (error) {
      console.error("Error generating horoscope:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#052e36] via-[#0a4b5c] to-[#063a47] text-[#e9f8fc] p-6 relative overflow-hidden">
      <ConstellationBackground />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#f8d64e] drop-shadow-[0_0_8px_rgba(248,214,78,0.5)]">
            Нейрогороскоп
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto text-[#7eeeff]">
            Узнайте свой персональный астрологический прогноз, созданный космическим ИИ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#052e36]/60 backdrop-blur-lg rounded-xl p-6 mb-8 border border-[#7eeeff]/20 shadow-[0_0_15px_rgba(126,238,255,0.15)]"
        >
          <Tabs
            defaultValue="sign"
            onValueChange={(value) => setInputMethod(value as "sign" | "date")}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#052e36]/80 border border-[#7eeeff]/20">
              <TabsTrigger value="sign" className="data-[state=active]:bg-[#0a4b5c] data-[state=active]:text-[#f8d64e]">
                Выбрать Знак Зодиака
              </TabsTrigger>
              <TabsTrigger value="date" className="data-[state=active]:bg-[#0a4b5c] data-[state=active]:text-[#f8d64e]">
                Ввести Дату Рождения
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign" className="mt-4">
              <ZodiacSelector onSelect={handleSignSelect} selected={selectedSign} />
            </TabsContent>
            <TabsContent value="date" className="mt-4">
              <DatePicker onSelect={handleDateSelect} selected={birthDate} />
            </TabsContent>
          </Tabs>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-[#7eeeff]">Период Прогноза</h3>
            <div className="flex gap-4">
              <Button
                variant={period === "daily" ? "default" : "outline"}
                onClick={() => setPeriod("daily")}
                className={
                  period === "daily"
                    ? "bg-[#f8d64e] hover:bg-[#f8d64e]/80 text-[#052e36]"
                    : "border-[#7eeeff]/30 text-[#7eeeff] hover:bg-[#7eeeff]/10"
                }
              >
                На Завтра
              </Button>
              <Button
                variant={period === "weekly" ? "default" : "outline"}
                onClick={() => setPeriod("weekly")}
                className={
                  period === "weekly"
                    ? "bg-[#f8d64e] hover:bg-[#f8d64e]/80 text-[#052e36]"
                    : "border-[#7eeeff]/30 text-[#7eeeff] hover:bg-[#7eeeff]/10"
                }
              >
                На Неделю
              </Button>
            </div>
          </div>

          <Button
            onClick={generateHoroscope}
            disabled={!selectedSign || loading}
            className="w-full bg-gradient-to-r from-[#f8d64e] to-[#f8a832] hover:opacity-90 text-[#052e36] font-medium shadow-[0_0_15px_rgba(248,214,78,0.3)]"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Консультируемся с космосом...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Раскрыть Вашу Космическую Судьбу
              </>
            )}
          </Button>
        </motion.div>

        {horoscope && <HoroscopeResult horoscope={horoscope} sign={selectedSign!} period={period} />}
      </div>
    </main>
  )
}

