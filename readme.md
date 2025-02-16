# Sort Destination API
## Description

API to Sort Tickets destinations to human readable format

## Project setup

```bash
$ gh repo clone fabriciosaab/sort-destination-api
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Usage Example: Adding and Sorting Tickets
### 1️⃣ Add a New Ticket
To add a ticket, send a POST request to:
```POST 
http://localhost:3000/tickets
```

With the following JSON body:

```json
{
  "from": "St. Anton am Arlberg Bahnhof",
  "to": "Innsbruck Hbf",
  "identification": "train RJX 765",
  "access": "Platform 3",
  "seat": "Seat number 17C",
  "luggage": ""
}
```
#### 📌 Response Example:

```json
{
  "id": 1,
  "from": "St. Anton am Arlberg Bahnhof",
  "to": "Innsbruck Hbf",
  "identification": "train RJX 765",
  "access": "Platform 3",
  "seat": "Seat number 17C",
  "luggage": ""
}
```

### 2️⃣ Add More Tickets
Repeat the POST request with different cities to create a full itinerary:

### 3️⃣ Sort the Tickets
To sort the tickets in the correct order, send a GET request to:

```http
GET http://localhost:3000/tickets/sortTickets
```

#### 📌 Response Example:

```json
[
  {
    "id": 1,
    "from": "St. Anton am Arlberg Bahnhof",
    "to": "Innsbruck Hbf",
    "identification": "train RJX 765",
    "access": "Platform 3",
    "seat": "Seat number 17C",
    "luggage": "",
    "order": 1
  },
  {
    "id": 2,
    "from": "Innsbruck Hbf",
    "to": "Innsbruck Airport",
    "identification": "Tram S5",
    "access": "",
    "seat": "",
    "luggage": "Self-check-in luggage at counter",
    "order": 2
  },
  {
    "id": 3,
    "from": "Innsbruck Airport",
    "to": "Venice",
    "identification": "Flight AA904",
    "access": "gate 10",
    "seat": "seat 18B",
    "luggage": "Self-check-in luggage at counter",
    "order": 3
  }
]
```

### 4️⃣ Get an HTML Formatted List
To see the itinerary as an ordered list in HTML, send a GET request to:

```http
GET http://localhost:3000/tickets/sort-description
```

#### 📌 Response Example:

```html
<h2>Travel Itinerary</h2>
<ol>
    <li>Board train RJX 765, Platform 3 from St. Anton am Arlberg Bahnhof to Innsbruck Hbf. Seat number 17C.</li>
    <li>Board Tram S5 from Innsbruck Hbf to Innsbruck Airport.</li>
    <li>Board Flight AA904, gate 10 from Innsbruck Airport to Venice. seat 18B. Self-check-in luggage at counter.</li>
</ol>
```

Now, if you open this endpoint in a browser, you'll see a nicely formatted travel itinerary! 🚀


## Contact

- Author - Fabricio Saab
- GitHub - [https://github.com/fabriciosaab](https://github.com/fabriciosaab)
- Linkedin - [https://www.linkedin.com/in/fabricio-saab](https://www.linkedin.com/in/fabricio-saab)