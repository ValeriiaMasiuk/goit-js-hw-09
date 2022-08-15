import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name = delay]'),
  step: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
  form: document.querySelector('form'),
  startBtn: document.querySelector('button')
}

const formData = {
  delay: 0,
  step: 0,
  amount: 0,
}

function onInputChange(evt) {
  formData[evt.target.name] = Number(evt.target.value)
  // console.log(formData)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {   

    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      } else {
        reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
      }
    }, delay)
  })
}

refs.delay.addEventListener('input', onInputChange)
refs.step.addEventListener('input', onInputChange)
refs.amount.addEventListener('input', onInputChange)



refs.startBtn.addEventListener('click', (evt) => {
  evt.preventDefault()

  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, formData.delay)
      .then(result => { })
      .catch(error => { })
    
    formData.delay += formData.step;
    refs.form.reset()
  }
})





