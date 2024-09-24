# LittleLives Appointments
## Description
- A little rest API in NestJS to create, view, and schedule appointments

## Routes
- GET /appointments - view all appointments
- POST /appointments - create an appointment
- DELETE /appointments/:id - cancel an appointment with a certain ID

## How to run
- yarn install
- yarn run
- open localhost:3000

## Assumptions
- This REST API is for use by a single user.
- Delete by ID.
- Changes in .env file config regarding slot length does not impact existing appointments.
- Can view past appointments.
