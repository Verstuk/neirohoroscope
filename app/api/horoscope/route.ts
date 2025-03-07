export async function POST(request: Request) {
  const { sign, period } = await request.json();

  if (!sign) {
    return new Response(JSON.stringify({ error: "Знак зодиака обязателен" }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    // Создаем промт на основе периода
    const timeframe = period === "daily" ? "завтра" : "неделя";
    const system = "Вы опытный и мистический астролог с глубоким знанием знаков зодиака и небесных влияний. Предоставляйте проницательные, персонализированные гороскопы, которые кажутся подлинными и значимыми. Ваш тон должен быть мудрым, слегка таинственным и обнадеживающим. Избегайте общих советов и сосредоточьтесь на конкретных прогнозах, связанных со знаком зодиака.";
    const prompt = `Создайте подробный гороскоп для знака ${sign} на ${timeframe}. Структурируйте ваш ответ в формате JSON со следующими разделами:
      1. "general": Общий прогноз (2-3 предложения)
      2. "love": Прогноз любви и отношений (2-3 предложения)
      3. "work": Прогноз карьеры и работы (2-3 предложения)
      4. "health": Прогноз здоровья и благополучия (2-3 предложения)
      
      Сделайте каждый раздел специфичным для черт ${sign} и текущих астрологических выравниваний. Будьте конкретны, проницательны и избегайте общих утверждений. Верните ТОЛЬКО объект JSON без какого-либо дополнительного текста или форматирования.
      
      Ответ пришли на русском языке`;

    // Прямой API-запрос к OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || ""}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free",
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Разбор JSON-ответа
    let horoscope: {
      general: string;
      love: string;
      work: string;
      health: string;
    };
    try {
      // Извлекаем JSON из текста (на случай, если модель добавит лишний текст)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        horoscope = JSON.parse(jsonMatch[0]);
      } else {
        horoscope = JSON.parse(text);
      }
    } catch (error) {
      console.error("Ошибка при разборе JSON гороскопа:", error);
      // Резервная структура, если разбор не удался
      horoscope = {
        general: "Космическая сеть в настоящее время выстраивается для вас таинственным образом.",
        love: "Небесные связи указывают на интересные события в ваших отношениях.",
        work: "Цифровое созвездие указывает на потенциал роста в вашей карьере.",
        health: "Энергетические потоки космической сети поддерживают ваше благополучие в это время.",
      };
    }

    return new Response(JSON.stringify(horoscope), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Ошибка при генерации гороскопа:", error);
    return new Response(JSON.stringify({ error: "Не удалось сгенерировать гороскоп" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}