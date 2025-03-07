"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Briefcase, Activity, Calendar, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import html2canvas from "html2canvas"
import { zodiacSigns } from "@/lib/zodiac"

interface HoroscopeResultProps {
  horoscope: {
    health: string
    work: string
    love: string
    general: string
  }
  sign: string
  period: "daily" | "weekly"
}

export function HoroscopeResult({ horoscope, sign, period }: HoroscopeResultProps) {
  const resultRef = useRef<HTMLDivElement>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const saveAsImage = async () => {
    if (!resultRef.current) return

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#052e36",
        scale: 2,
      })

      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `${sign.toLowerCase()}-horoscope-${period}.png`
      link.click()
    } catch (error) {
      console.error("Error saving horoscope as image:", error)
    }
  }

  const zodiacSymbol = zodiacSigns.find((s) => s.name === sign)?.symbol || ""
  const russianSign = zodiacSigns.find((s) => s.name === sign)?.russianName || ""

  return (
    <motion.div
      ref={resultRef}
      className="bg-[#052e36]/60 backdrop-blur-lg rounded-xl p-6 border border-[#7eeeff]/20 shadow-[0_0_15px_rgba(126,238,255,0.15)] relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background hexagon pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <svg
            key={i}
            className="absolute"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <polygon points="50,3 100,28 100,72 50,97 3,72 3,28" fill="none" stroke="#f8d64e" strokeWidth="1" />
          </svg>
        ))}
      </div>

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <motion.path
          d="M0,50 L100,20 M30,0 L70,100 M10,10 L90,90 M90,10 L10,90 M50,0 L50,100"
          stroke="#f8d64e"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>

      <div className="flex justify-between items-center mb-6 relative z-9999">
        <div>
          <h2 className="text-3xl font-serif text-[#f8d64e] flex items-center gap-2 drop-shadow-[0_0_5px_rgba(248,214,78,0.5)]">
            <span>{zodiacSymbol}</span> {russianSign}
          </h2>
          <p className="text-sm text-[#7eeeff] flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {period === "daily" ? "Прогноз на завтра" : "Прогноз на неделю"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={saveAsImage}
          className="border-[#7eeeff]/30 text-[#f8d64e] hover:bg-[#7eeeff]/10"
        >
          <Download className="h-4 w-4 mr-2" /> Сохранить
        </Button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 relative z-10">
        <motion.div variants={item}>
          <Card className="bg-[#052e36]/80 border-[#7eeeff]/20 shadow-[0_0_10px_rgba(126,238,255,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#f8d64e] font-serif drop-shadow-[0_0_2px_rgba(248,214,78,0.5)]">
                Космический Обзор
              </CardTitle>
              <CardDescription className="text-[#7eeeff]/70">Ваш общий астрологический прогноз</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#e9f8fc]">{horoscope.general}</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item}>
            <Card className="bg-[#052e36]/80 border-[#7eeeff]/20 h-full shadow-[0_0_10px_rgba(126,238,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff7eb6]/50 to-transparent"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-[#f8d64e] font-serif drop-shadow-[0_0_2px_rgba(248,214,78,0.5)]">
                  <Heart className="h-5 w-5 mr-2 text-[#ff7eb6]" /> Любовь
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#e9f8fc]">{horoscope.love}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-[#052e36]/80 border-[#7eeeff]/20 h-full shadow-[0_0_10px_rgba(126,238,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7eeeff]/50 to-transparent"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-[#f8d64e] font-serif drop-shadow-[0_0_2px_rgba(248,214,78,0.5)]">
                  <Briefcase className="h-5 w-5 mr-2 text-[#7eeeff]" /> Карьера
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#e9f8fc]">{horoscope.work}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-[#052e36]/80 border-[#7eeeff]/20 h-full shadow-[0_0_10px_rgba(126,238,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a0ff9e]/50 to-transparent"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-[#f8d64e] font-serif drop-shadow-[0_0_2px_rgba(248,214,78,0.5)]">
                  <Activity className="h-5 w-5 mr-2 text-[#a0ff9e]" /> Здоровье
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#e9f8fc]">{horoscope.health}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 text-center text-sm text-[#7eeeff]/50 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        <p>Создано космическим ИИ • Сгенерировано {new Date().toLocaleDateString("ru-RU")}</p>
      </motion.div>
    </motion.div>
  )
}

