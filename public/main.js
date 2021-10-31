
var doneCircle = document.getElementsByClassName("fa-times-circle");
var doneCheck = document.getElementsByClassName("fa-check");
var trash = document.getElementsByClassName("fa-trash");

Array.from(doneCheck).forEach(function(element) {
  element.addEventListener('click', function(){
   //use query this.parentNode.querySelector('.name')
    const name = this.parentNode.parentNode.childNodes[2].innerText
    const dueday = this.parentNode.parentNode.childNodes[4].innerText
    const chore = this.parentNode.parentNode.childNodes[6].innerText
    // const taskDone = this.parentNode.parentNode.childNodes[8].innerText
    console.log(name, dueday, chore)
    fetch('listOfChoresDone', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'dueday': dueday,
        'chore': chore,
        'taskDone': true
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(doneCircle).forEach(function(element) {
  element.addEventListener('click', function(){
   //use query this.parentNode.querySelector('.name')
    const name = this.parentNode.parentNode.childNodes[2].innerText
    const dueday = this.parentNode.parentNode.childNodes[4].innerText
    const chore = this.parentNode.parentNode.childNodes[6].innerText
    const taskDone = this.parentNode.parentNode.childNodes[8].innerText
    // const task = this.parentNode.parentNode.childNodes[7].innerText
    console.log(name, dueday, chore)
    fetch('listOfChoresNotDone', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'dueday': dueday,
        'chore': chore,
        'taskDone': true
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[2].innerText
    const dueday = this.parentNode.parentNode.childNodes[4].innerText
    const chore = this.parentNode.parentNode.childNodes[6].innerText
    const taskDone = this.parentNode.parentNode.childNodes[8].innerText
    console.log(name)
    
    fetch('listOfChores', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'dueday': dueday,
        'chore': chore,
        'taskDone': taskDone
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});