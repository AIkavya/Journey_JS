'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const modal = document.getElementById('readme-modal');
const modalClose = document.getElementById('readme-close');
const modalOverlay = document.querySelector('.modal__overlay');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }


    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}


class Running extends Workout
{
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace()
    {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{

    type = 'cycling';

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed;
    }
}

const run1 = new Running([]);

class App
{
    #map;
    #mapEvent;
    #workouts = [];

    constructor()
    { 
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._movePopUp.bind(this));
        modalClose.addEventListener('click', this._hideReadmeModal.bind(this));
        modalOverlay.addEventListener('click', this._hideReadmeModal.bind(this));
        
        this._showReadmeModal();
    }
    
    _getPosition()
    {
     navigator.geolocation.getCurrentPosition
        (
                this._loadMap.bind(this),
                 function ()
                    {
                       alert("Could not get your  position");
                    }
      );
    
    };
    
    _loadMap(position) {
 
          
        const { latitude, longitude } = position.coords;

        // const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        // console.log(url);

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        L.marker(coords).addTo(this.#map)
            .bindPopup() .setPopupContent(`${'You Are Here 📍'}`)
            .openPopup();

        this.#map.on('click', this._showForm.bind(this))
        
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
              
        })
        
    }
     
    
    _showForm(mapE) {
            this.#mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        
    }

    _hideForm()
    {
        
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";

        form.style.display = 'none';
        form.classList.add('hidden');

        setTimeout(() => form.style.display = 'grid', 1000);
        
        
    }
    _toggleElevationField()
    { 
        
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    
    }
    
    _newWorkout(e) {
        e.preventDefault();
        
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        let workout;
        const duration = Number(inputDuration.value);
        const allPositive = (...inputs) => inputs.every((inp) => inp > 0)
        const {lat,lng } =  this.#mapEvent.latlng;
        const validation = function (distance, duration, x)
        {
             if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(x) || !allPositive(distance,duration,x)) {
                alert('Inputs have to be a positive Number');
                return false;
            }
            return true;
        }

       

        if (type === 'running') {
            const cadence = Number(inputCadence.value)

            if (!validation(distance, duration, cadence)) return;

            workout = new Running([lat, lng], distance, duration, cadence);
            this.#workouts.push(workout);
            
        }

        if (type === 'cycling') {
            const elevation = Number(inputElevation.value)

            if (!validation(distance, duration, elevation)) return;
              workout = new Cycling([lat, lng], distance, duration, elevation);
            this.#workouts.push(workout);

           
        }

        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);
        

         
        this._hideForm()
        
        // Local storage...

        this._setLocalStorage();



         

           
            
       
    }

    _setLocalStorage()
    {
       localStorage.setItem('workouts',JSON.stringify(this.#workouts))    
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
        
    }

     _renderWorkoutMarker(workout){
              L.marker(workout.coords).addTo(this.#map)
                .bindPopup(L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`
                }))
                .setPopupContent(`${workout.description}`);
     }

    _showReadmeModal() {
        modal.classList.remove('hidden');
    }

    _hideReadmeModal() {
        modal.classList.add('hidden');
    }
    
    _renderWorkout(workout)
    {
         
       
        let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
        
        if (workout.type === 'running') {
            html+=`<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`
        }

        if (workout.type === 'cycling') {
              html+=`<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`
        }

        form.insertAdjacentHTML('afterend', html);
            
    
    }

    _movePopUp(e)
    {
        const workoutEl = e.target.closest('.workout');

        
        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)
        
        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1,    
            }
        })

    }
}
const app = new App();






    