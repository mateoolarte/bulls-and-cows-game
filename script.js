$(document).ready(() => {
  Array.prototype.allValuesSame = function () {

    for (let i = 1; i < this.length; i++) {
      if (this[i] !== this[0]) return false;
    }

    return true;
  }

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  function countInArray(array, number) {
    return array.filter(item => item == number).length;
  }

  const Secretnumber = () => shuffle("0123456789".split('')).join('').substring(0, 4)

  var numberSecret = Secretnumber()
  var numberSecretString = numberSecret
  var arrNumbers = []
  console.log(parseInt(numberSecret))

  $(".popup-winner a").on("click", function (e) {
    e.preventDefault()

    $("table tbody").empty()
    numberSecret = Secretnumber()
    picas = 0
    fijas = 0
    numberSecretString = numberSecret
    arrNumbers = []
    repeatNum = 0
    console.log(parseInt(numberSecret))

    for (let index = 0; index < 4; index++) arrNumbers.push(parseInt(numberSecretString[index]))

    $("#number").focus().val("")
    $(".popup-winner").addClass("none")
  })

  for (let index = 0; index < 4; index++) arrNumbers.push(parseInt(numberSecretString[index]))

  $("form").on("submit", function (e) {
    e.preventDefault()

    const inputValue = $("#number").val()
    let arrInputNum = []
    var picas = 0
    var fijas = 0
    var repeatNum = 0

    for (let index = 0; index < inputValue.length; index++) arrInputNum.push(parseInt(inputValue[index]))

    for (let index = 0; index < arrInputNum.length; index++) {
      if (countInArray(arrInputNum, arrInputNum[index]) > 1) {
        repeatNum++
      }
    }

    if (inputValue.length < 4) {
      $(".instruction span, input").addClass("error")
    } else if (inputValue.length > 4) {
      $(".instruction span, input").addClass("error")
    } else if (arrInputNum.allValuesSame()) {
      $(".instruction span, input").addClass("error")
    } else if (repeatNum > 0) {
      $(".instruction span, input").addClass("error")
    } else {
      $(".instruction span, input").removeClass("error")

      for (let index = 0; index < arrNumbers.length; index++) {

        if (arrNumbers.includes(arrInputNum[index])) {

          if (arrInputNum[index] == arrNumbers[index]) {
            fijas++
          } else {
            picas++
          }

        }

      }

      $("table tbody").prepend(`<tr><td>${inputValue}</td><td>${picas}</td><td>${fijas}</td></tr>`)

      fijas === 4 ? $(".popup-winner").removeClass("none") : ""
    }
  })
})