function createEmployeeRecord(employeeInfo){
    let employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(employeeArray){
    return employeeArray.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, desiredDate){
    let inTime = employee.timeInEvents.find( e => {
        return e.date === desiredDate
    })
    let outTime = employee.timeOutEvents.find( e => {
        return e.date === desiredDate
    })
    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(employee, desiredDate){
    let hours = hoursWorkedOnDate(employee, desiredDate)
    return parseInt(hours) * employee.payPerHour
}

function allWagesFor(employee){
    let datesWorked = employee.timeInEvents.map( e => {
        return e.date
    })
    let weeklyWages = datesWorked.reduce( function(accumulator, e){
        return accumulator + wagesEarnedOnDate(employee, e)
    }, 0)
    return weeklyWages
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce( function(accumulator, employee){
        return accumulator + allWagesFor(employee)
    }, 0)
}