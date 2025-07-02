import { CountUp } from 'countup.js'
import { Odometer } from 'odometer_countup'

export const numberCounterInitialLoad = () => {
  return new Promise((resolve, reject) => {
    const lastVisit = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()

    // Determine animation duration based on previous visits
    const animationDuration = lastVisit === today ? 0.25 : 0.5

    const countUp = new CountUp('initial-odometer', 100, {
      startVal: 0,
      duration: animationDuration, // Adjusted duration based on previous visits
      useGrouping: false,
      decimalPlaces: 0, // No decimal places
      formattingFn: (n) => {
        return n.toString().padStart(3, '0')
      },
      plugin: new Odometer({
        duration: animationDuration / 3,
        lastDigitDelay: 0,
      }), // Adjusted Odometer duration proportionally
      onComplete: () => {},
    })

    // Store today's date as the last visit
    localStorage.setItem('lastVisit', today)

    if (!countUp.error) {
      countUp.start(() => {
        document.querySelector('.mask-text_square').classList.add('has-loaded')
        setTimeout(() => {
          resolve()
        }, 300)
      })
    } else {
      console.error(countUp.error)
      reject(countUp.error)
    }
  })
}
