export default function isBot (userAgent) {
  return /(bot|check|cloud|crawler|download|monitor|preview|scan|spider|google|qwantify|yahoo|HeadlessChrome)/i.test(userAgent)
}
