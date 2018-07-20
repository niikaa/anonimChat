export default {
  methods: {
    longDate(date) {
      const newDate = new Date(date)
      let result = newDate.getFullYear() + "-"
      let day = newDate.getDate()
      if (day <= 9) day = "0" + day
      result += day + "-"
      let month = newDate.getMonth()
      if (month <= 9) month = "0" + month
      result += month + " "
      let hour = newDate.getHours()
      if (hour <= 9) hour = "0" + hour
      result += hour + ":"
      let minute = newDate.getMinutes()
      if (minute <= 9) minute = "0" + minute
      result += minute
      return result
    }
  }
}
