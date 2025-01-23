import { CountUp } from 'countup.js'
import { Odometer } from 'odometer_countup'

export const numberCounterInitialLoad = () => {
  return new Promise((resolve, reject) => {
    const countUp = new CountUp('initial-odometer', 100, {
      startVal: 0,
      duration: 3, // Duration in seconds
      useGrouping: false,
      decimalPlaces: 0, // No decimal places
      formattingFn: (n) => {
        return n.toString().padStart(3, '0')
      },
      plugin: new Odometer({ duration: 1, lastDigitDelay: 0 }),
      onComplete: () => {},
    })

    if (!countUp.error) {
      countUp.start(() => {
        console.log('test')
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
