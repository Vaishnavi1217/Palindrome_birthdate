var dateInput = document.querySelector("#date-input");
var checkBtn = document.querySelector("#check-btn");
var outputDiv = document.querySelector("#output-div")


function reverseStr(str){
    var reversedStr = str.split('').reverse().join('')
    return reversedStr;
}
// console.log(reverseStr('hello'))

function isPalindrome(str){
    var reverse = reverseStr(str)
    return reverse===str; 
}
// console.log(isPalindrome('mom'))

function convertDateToString(date){
    var StrDate={day:'',month:'',year:''}
    if(date.day<10){
        StrDate.day = '0'+date.day
    }
    else{
        StrDate.day = date.day.toString()
    }
    if(date.month<10){
        StrDate.month='0'+date.month;
    }
    else{
        StrDate.month=date.month.toString()
    }
    StrDate.year = date.year.toString()
    return StrDate;
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);
    
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy =  dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year + dateStr.month + dateStr.day.slice(-2);

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}
function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
  
    return flag;
  }

  function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%4===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    return false;
  }
  function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month===2){
        if(isLeapYear(year)){
            if(day > 29){
                day=1;
                month++
            }
        }
        else{
            if(day > 28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;

        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date)

    while(1){
        counter++;
        var Palindrome = checkPalindromeForAllDateFormats(nextDate);
        if(Palindrome){
            break;
        }
    nextDate = getNextDate(nextDate);
    }

    return [counter , nextDate]
}

// var date = {
//     day: 31,
//     month: 12,
//     year: 2020
// }

function clickHandler(p){
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var listOfDates = bdayStr.split('-');

        var date = {
            day:Number(listOfDates[2]),
            month:Number(listOfDates[1]),
            year:Number(listOfDates[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            showResult("Yay!Your birthday is a Palindrome!!!")
        }
        else{
            var [counter , nextDate] = getNextPalindromeDate(date);
            showResult("Oops!Your birthday is not a Palindrome! The next palindrome date is " +nextDate.day +"-" +nextDate.month +"-" +nextDate.year + ".You missed by " + counter +"days.")
        }
    }
}

function showResult(msg){
    outputDiv.innerText=msg;
}

checkBtn.addEventListener("click",clickHandler)



// console.log(getNextPalindromeDate(date))
// console.log(getNextDate(date))
// console.log(convertDateToString(date))
// console.log(getAllDateFormats(date))
// console.log(checkPalindromeForAllDateFormats(date))


