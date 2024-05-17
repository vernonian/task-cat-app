<script lang="ts">
  const currentDateTime:Date = new Date();
  const MONTHS = [ 
    { name: 'Jan', days: 31, },
    { name: 'Feb', days: 28, },
    { name: 'Mar', days: 31, },
    { name: 'Apr', days: 30, },
    { name: 'May', days: 31, },
    { name: 'Jun', days: 30, },
    { name: 'Jul', days: 31, },
    { name: 'Aug', days: 31, },
    { name: 'Sep', days: 30, },
    { name: 'Oct', days: 31, },
    { name: 'Nov', days: 30, },
    { name: 'Dec', days: 31, }
  ]

  // Initialise start date values
  let startMonth:string;
  let startDate:number;
  setStartMonthAndDate();

  // Initialize end date values
  let endMonth:string;
  let endDate:number;
  setEndMonthAndDate();

  // Setter Helpers
  function setStartMonthAndDate() {
    // Set start month to current month
    startMonth = getRomanizedMonth(currentDateTime.getMonth());

    // Set start date to the 0th index of this week's date
    startDate = currentDateTime.getDate() - currentDateTime.getDay();
  }

  function setEndMonthAndDate() {
    let currentMonthNumberOfDays:number = MONTHS[currentDateTime.getMonth()].days;
    let tempEndDate:number = startDate + 6; // Add 6 to get the int of when the week ends (6 because index starts at 0, Sun to Sat)

    // If adding 7 to date makes the month change, 
    if (tempEndDate > currentMonthNumberOfDays) {

      // Set month to +1 of current month
      setEndMonth(currentDateTime.getMonth() + 1);

      // Set endDate to proper value
      setEndDate(tempEndDate % currentMonthNumberOfDays);
    }
    // If adding 7 doesn't make the month change
    else {
      // Set endDate to current date (tempEndDate)
      setEndDate(tempEndDate);

      // Set month to current month
      setEndMonth(currentDateTime.getMonth());
    }
  }

  function setEndDate(date:number) {
    endDate = date;
  }

  function setEndMonth(month:number | string) {
    if (typeof month === 'number') {
      endMonth = getRomanizedMonth(month);
    }
    else {
      endMonth = month
    }
  }

  // Getter Helpers
  function getRomanizedMonth(month:number):string {
    return MONTHS[month].name;
  }
</script>

<span>{startMonth} {startDate} - {endMonth} {endDate}</span>