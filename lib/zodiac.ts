export const zodiacSigns = [
  {
    name: "Aries",
    russianName: "Овен",
    symbol: "♈",
    dates: "Mar 21 - Apr 19",
    russianDates: "21 мар - 19 апр",
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
  },
  {
    name: "Taurus",
    russianName: "Телец",
    symbol: "♉",
    dates: "Apr 20 - May 20",
    russianDates: "20 апр - 20 мая",
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
  },
  {
    name: "Gemini",
    russianName: "Близнецы",
    symbol: "♊",
    dates: "May 21 - Jun 20",
    russianDates: "21 мая - 20 июн",
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
  },
  {
    name: "Cancer",
    russianName: "Рак",
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    russianDates: "21 июн - 22 июл",
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
  },
  {
    name: "Leo",
    russianName: "Лев",
    symbol: "♌",
    dates: "Jul 23 - Aug 22",
    russianDates: "23 июл - 22 авг",
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
  },
  {
    name: "Virgo",
    russianName: "Дева",
    symbol: "♍",
    dates: "Aug 23 - Sep 22",
    russianDates: "23 авг - 22 сен",
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
  },
  {
    name: "Libra",
    russianName: "Весы",
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    russianDates: "23 сен - 22 окт",
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
  },
  {
    name: "Scorpio",
    russianName: "Скорпион",
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    russianDates: "23 окт - 21 ноя",
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
  },
  {
    name: "Sagittarius",
    russianName: "Стрелец",
    symbol: "♐",
    dates: "Nov 22 - Dec 21",
    russianDates: "22 ноя - 21 дек",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
  },
  {
    name: "Capricorn",
    russianName: "Козерог",
    symbol: "♑",
    dates: "Dec 22 - Jan 19",
    russianDates: "22 дек - 19 янв",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
  },
  {
    name: "Aquarius",
    russianName: "Водолей",
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    russianDates: "20 янв - 18 фев",
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
  },
  {
    name: "Pisces",
    russianName: "Рыбы",
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    russianDates: "19 фев - 20 мар",
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
  },
]

export function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1 // JavaScript months are 0-indexed
  const day = date.getDate()

  for (const sign of zodiacSigns) {
    // Check if date falls within the sign's range
    if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) {
      return sign.name
    }

    // Special case for Capricorn which spans December to January
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Capricorn"
    }
  }

  // Default fallback (should never reach here if data is correct)
  return "Unknown"
}

