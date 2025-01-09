import { CountUp } from 'countup.js'
import { Odometer } from 'odometer_countup'

export const numberCounter = () => {
  const now = new Date()
  const currentHour = now.getHours()
  // Get the current day of the month
  const today = new Date()
  const day = today.getDate()

  // Calculate the start value based on the day
  const startVal = day * 100 + 12

  // Check if the current time is between 8 AM and 6 PM
  if (currentHour >= 8 && currentHour < 18) {
    const countUp = new CountUp('odometer', 5235, {
      startVal: startVal,
      duration: 70000,
      useGrouping: false,
      plugin: new Odometer({ duration: 2.3, lastDigitDelay: 0 }),
    })

    if (!countUp.error) {
      countUp.start()
    } else {
      console.error(countUp.error)
    }
  } else {
    console.log('Number counter is inactive outside of 8 AM to 6 PM.')
    const countUp = new CountUp('odometer', startVal, {
      startVal: startVal,
      duration: 0,
      useGrouping: false,
    })

    if (!countUp.error) {
      countUp.start()
    } else {
      console.error(countUp.error)
    }
  }
}
