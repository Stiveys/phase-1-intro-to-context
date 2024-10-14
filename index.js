function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, e) => {
        return total + wagesEarnedOnDate(employee, e.date);
    }, 0);
}
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}
