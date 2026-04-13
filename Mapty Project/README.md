# Mapty Workout Tracker

## Project Overview
Mapty is a workout tracking web application that lets users log running and cycling workouts on an interactive map. The app uses browser geolocation to find the user's current location, Leaflet for map rendering, and localStorage to persist workouts across page refreshes.

## Features
- Detects and centers the map on the user's current location.
- Displays a "You Are Here" marker for the current position.
- Shows a README modal every time the page loads.
- Adds workouts by clicking the map and filling the workout form.
- Supports running and cycling workouts with type-specific inputs.
- Validates input values and blocks invalid workout submissions.
- Renders workout cards in the sidebar.
- Saves workouts to localStorage so they persist on reload.
- Clicking a saved workout moves the map to that workout marker.

## How to Use
1. Open `index.html` in a browser.
2. Allow location access when prompted.
3. Close the README modal with the × button or by clicking outside it.
4. Click anywhere on the map to open the workout entry form.
5. Select `Running` or `Cycling`.
6. Enter `Distance`, `Duration`, and the type-specific field (`Cadence` for running, `Elev Gain` for cycling).
7. Submit the form to create the workout and map marker.
8. Click a workout item in the sidebar to center the map on that workout.

## File Structure
- `index.html` — Contains the page markup, including the map container, sidebar, workout form, and modal.
- `style.css` — Defines visual styling for the layout, modal, map, workouts, and responsive interactions.
- `script.js` — Implements the app logic, including map setup, form handling, localStorage, and modal control.
- `README.md` — This documentation file.

## App Architecture
The app is built with a small class-based JavaScript architecture.

### `Workout` class
The base class used for all workouts.
- Properties:
  - `date` — The date and time when the workout was created.
  - `id` — A unique identifier generated from the current timestamp.
  - `coords` — Latitude and longitude of the workout location.
  - `distance` — Distance covered in kilometers.
  - `duration` — Duration in minutes.
  - `description` — A human-readable workout title generated from the date and type.
- Methods:
  - `_setDescription()` — Builds a description string like "Running on April 14" using the workout type and date.

### `Running` class
Extends `Workout` and represents a running workout.
- Properties:
  - `type` — Always set to `'running'`.
  - `cadence` — Steps per minute.
  - `pace` — Calculated as `duration / distance`.
- Methods:
  - `calcPace()` — Computes pace in minutes per kilometer.

### `Cycling` class
Extends `Workout` and represents a cycling workout.
- Properties:
  - `type` — Always set to `'cycling'`.
  - `elevation` — Elevation gain in meters.
  - `speed` — Calculated as `distance / (duration / 60)`.
- Methods:
  - `calcSpeed()` — Computes speed in km/h.

### `App` class
The main controller for the application.
- Private fields:
  - `#map` — Leaflet map instance.
  - `#mapEvent` — Stores the click event when the map is clicked.
  - `#workouts` — Array of saved workout objects.
- Core responsibilities:
  - Initialize browser geolocation and load the map.
  - Read and write workouts to localStorage.
  - Manage DOM event listeners for form submission, type switching, workout click navigation, and modal close.
  - Render workout markers and workout cards.

## Event and Rendering Flow
1. `App` constructor initializes the app and adds event listeners.
2. `_getPosition()` requests the user's current location.
3. `_loadMap()` creates the Leaflet map and places the initial current location marker.
4. `_getLocalStorage()` loads saved workouts and renders them in the sidebar.
5. Clicking the map triggers `_showForm()` to display the workout form.
6. Submitting the form triggers `_newWorkout()`:
   - validates inputs,
   - creates either `Running` or `Cycling`,
   - stores the workout,
   - renders the workout marker and card,
   - saves data to localStorage,
   - hides the form.
7. Clicking a workout card triggers `_movePopUp()` to center the map on the workout marker.

## Local Storage
- Workouts are saved as JSON using `localStorage.setItem('workouts', JSON.stringify(this.#workouts))`.
- On page load, stored workouts are retrieved and parsed.
- The current implementation restores workout data, but class methods such as `calcPace()` and `calcSpeed()` are not automatically restored from JSON. The app uses saved properties directly when rendering.

## Modal Behavior
- The `README` modal is displayed on every page load using `_showReadmeModal()`.
- The modal can be closed by:
  - clicking the close button,
  - clicking the overlay outside the modal content.
- The modal uses a high `z-index` so it stays above the Leaflet map.

## Styling Notes
- The app uses a dark sidebar theme with a light map area.
- Workout cards are differentiated by type using left border colors.
- The modal uses an overlay and centered content for clarity on page load.

## Improvements and Extensions
Possible future upgrades:
- Restore workout objects with full method behavior after loading from localStorage.
- Add delete and edit controls for workouts.
- Add map markers with popup content for saved workouts only.
- Add responsive mobile layout for smaller screens.

## Author
This Mapty version was built as a JavaScript practice project with clean HTML, CSS, and JavaScript using Leaflet and localStorage.
