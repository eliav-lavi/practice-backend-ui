export const instructions = {
  dataAccess: {
    title: 'Data Access',
    goal: 'Implement routes to fetch static data from the server.',
    paragraphs: [
      "While flights are a rather dynamic resource, our data regarding airlines and airports changes much less often. Flights are the focus of the app we'll be building, however we will need some static data regarding airports and airlines to make it richer and fuller. For this purpose, in this challenge you need to supply backend routes for fetching all airport and airline data - one path for each."
    ]
  },

  basicSearch: {
    title: 'Basic Search',
    goal: 'Implement a route that supports the simplest form of flight search - a single flight on a single date.',
    paragraphs: [
      "Assuming you have completed the previous challenge, Data Access, you now have routes for retrieving all airport and airline records.",
      "In this challenge, you are requested to supply a route for basic journey search. In the search form below, the two airport fields are filled with data from the airports route, try playing with it. Then just pick any date within March 2008 (that's the scope of the dataset we're working with here!). A successful implementation should display relevant flights below the search form. Click on 'View API Spec' for accurate structures and don't forget to configure your paths!"
    ]
  },

  citySearch: {
    title: 'City Search',
    goal: 'Improve basic search by allowing a more accessible search - by city names.',
    paragraphs: [
      "Assuming you have completed the previous challenge, Basic Search, you now have a working route that supplies single flights by airport IATA code and departure date.",
      "In this challenge, you are requested to supply a new route that extends the previous one by accepting city names as input. The city fields are loaded with all possible airports' cities thanks to the airports route. A successful implementation should display relevant flights below the search form. Click on 'View API Spec' for accurate structures and don't forget to configure your paths!"
    ]
  },

  roundTrip: {
    title: 'Round Trip',
    goal: 'Add the core functionality of searching for a return flight.',
    paragraphs: [
      "Assuming you have completed the previous challenge, City Search, you now have a working route that supplies single flights by city names and departure date.",
      "In this challenge, you are requested to supply a new route that extends the previous one by accepting a return date as well. A successful implementation should display relevant trips - each trip consists of outbound flight and return flight - below the search form. Click on 'View API Spec' for accurate structures and don't forget to configure your paths!"
    ]
  },

  connectingFlights: {
    title: 'Connecting Flights',
    goal: 'Offer more results by suggesting connecting flights.',
    paragraphs: [
      "Assuming you have completed the previous challenge, Round Trip, you now have a working route that supplies a full trip.",
      "In this challenge, you are requested to supply a new route that extends the previous one by supporting both direct and connecting flights, for both outbound and return flights."
    ]
  },

  filters: {
    title: 'Filters',
    goal: 'Allow filters for more relevant results.',
    paragraphs: [
      "Assuming you have completed the previous challenge, Connecting Flights, you now have a working route that supplies connected flights whenever possible.",
      "In this challenge, you are requested to supply a new route that extends the previous one by accepting an filters object and serving relevant results accordingly."
    ]
  }
}

const apis = {
  airlines: {
    name: 'Airlines',
    path: '/airlines',
    type: 'get',
    requestedParameters: [],
    expectedResponse: `
    [
      {
        code: string
        name: string
        logoUrl: string
      }
    ]
    `
  },

  airports: {
    name: 'Airports',
    path: '/airports',
    type: 'get',
    requestedParameters: [],
    expectedResponse: `
    [
      {
        name: string
        city: string
        country: string
        iata: string
        gmt: integer
      }
    ]
    `
  },

  basicSearch: {
    name: 'Basic Search',
    path: '/basic_search',
    type: 'get',
    requestedParameters: [
      { name: 'origin ', type: 'string', description: "Origin airport IATA code." },
      { name: 'destination', type: 'string', description: "Destination airport IATA code." },
      { name: 'departureDate', type: 'string', description: "The date of the journey's departure. Format should be YYYY-MM-DD." },
    ],
    expectedResponse: `
    {
      flights: [
        {
          origin: string
          destination: string
          departureDatetime: string
          arrivalDatetime: string
          flightNum: string
          uniqueCarrier: string
          price: integer
        }
      ]
    }
    `
  },

  citySearch: {
    name: 'City Search',
    path: '/city_search',
    type: 'get',
    requestedParameters: [
      { name: 'originCity', type: 'string', description: "Origin City." },
      { name: 'destinationCity', type: 'string', description: "Destination City." },
      { name: 'departureDate', type: 'string', description: "The date of the journey's departure. Format should be YYYY-MM-DD." },
    ],
    expectedResponse: `
    {
      flights: [
        {
          origin: string
          destination: string
          departureDatetime: string
          arrivalDatetime: string
          flightNum: string
          uniqueCarrier: string
          price: integer
        }
      ]
    }
    `
  },

  roundTrip: {
    name: 'Round Trip',
    path: '/round_trip',
    type: 'get',
    requestedParameters: [
      { name: 'originCity', type: 'string', description: "Origin City." },
      { name: 'destinationCity', type: 'string', description: "Destination City." },
      { name: 'departureDate', type: 'string', description: "The date of the journey's departure. Format should be YYYY-MM-DD." },
      { name: 'returnDate', type: 'string', description: "The date of the journey's return. Format should be YYYY-MM-DD." }
    ],
    expectedResponse: `
    {
      trips: [
        {
          price: integer
          outbound_flight: {
            origin: string
            destination: string
            departureDatetime: string
            arrivalDatetime: string
            flightNum: string
            uniqueCarrier: string
          }
          return_flight: {
            origin: string
            destination: string
            departureDatetime: string
            arrivalDatetime: string
            flightNum: string
            uniqueCarrier: string
          }
        }
      ]
    }
    `
  },

  connectingFlights: {
    name: 'Connecting Flights',
    path: '/connecting_flights',
    type: 'get',
    requestedParameters: [
      { name: 'originCity', type: 'string', description: "Origin City." },
      { name: 'destinationCity', type: 'string', description: "Destination City." },
      { name: 'departureDate', type: 'string', description: "The date of the journey's departure. Format should be YYYY-MM-DD." },
      { name: 'returnDate', type: 'string', description: "The date of the journey's return. Format should be YYYY-MM-DD." }
    ],
    expectedResponse: `
    {
      trips: [
        {
          price: integer
          outbound_flights: [
            {
              origin: string
              destination: string
              departureDatetime: string
              arrivalDatetime: string
              flightNum: string
              uniqueCarrier: string
            }
          ]
          return_flights: [
            {
              origin: string
              destination: string
              departureDatetime: string
              arrivalDatetime: string
              flightNum: string
              uniqueCarrier: string
            }
          ]
        }
      ]
    }
    `
  },

  filters: {
    name: 'Filters',
    path: '/filters',
    type: 'get',
    requestedParameters: [
      { name: 'originCity', type: 'string', description: "Origin City." },
      { name: 'destinationCity', type: 'string', description: "Destination City." },
      { name: 'departureDate', type: 'string', description: "The date of the journey's departure. Format should be YYYY-MM-DD." },
      { name: 'returnDate', type: 'string', description: "The date of the journey's return. Format should be YYYY-MM-DD." },
      { name: 'maxPrice', type: 'number', description: "Optional parameter. Max price in dollars for any suggested journey" },
      { name: 'departAfter', type: 'number', description: "Optional parameter. Minimal hour for departure, for any of the journey's flights. Values run from 0 to 23 (a 24-hours clock) and represent local hour at origin." },
      { name: 'landBefore', type: 'number', description: "Optional parameter. Maximal hour for landing, for any of the journey's flights. Values run from 0 to 23 (a 24-hours clock) and represent local hour at destination." },
      { name: 'directFlightsOnly', type: 'boolean', description: 'Signifies whether connecting flights should be present in search results alongside direct flights or not.' }
    ],
    expectedResponse: `
    {
      trips: [
        {
          price: integer
          outbound_flights: [
            {
              origin: string
              destination: string
              departureDatetime: string
              arrivalDatetime: string
              flightNum: string
              uniqueCarrier: string
            }
          ]
          return_flights: [
            {
              origin: string
              destination: string
              departureDatetime: string
              arrivalDatetime: string
              flightNum: string
              uniqueCarrier: string
            }
          ]
        }
      ]
    }
    `
  }
}

export const challengesApis = {
  dataAccess: [apis.airlines, apis.airports],
  basicSearch: [apis.airlines, apis.airports, apis.basicSearch],
  citySearch: [apis.airlines, apis.airports, apis.citySearch],
  roundTrip: [apis.airlines, apis.airports, apis.roundTrip],
  connectingFlights: [apis.airlines, apis.airports, apis.connectingFlights],
  filters: [apis.airlines, apis.airports, apis.filters]
}









export const journeysApiResponse = `
{
  journeys: [
    {
      origin: string
      destination: string
      departureDatetime: string
      arrivalDatetime: string
      flightNum: string
      uniqueCarrier: string
      price: integer
    }
  ]
}`;

export const airlinesApiResponse = `
[
  {
    code: string
    name: string
    logoUrl: string
  }
]
`;

export const airportsApiResponse = `
[
  {
    name: string
    city: string
    country: string
    iata: string
    gmt: integer
  }
]`;

export const topIatas: String[] = ['ATL', 'LAX', 'ORD', 'DFW', 'DEN', 'JFK', 'SFO', 'LAS', 'SEA', 'CLT',
  'EWR', 'MCO', 'PHX', 'MIA', 'IAH', 'BOS', 'MSP', 'DTW', 'FLL', 'PHL', 'LGA', 'BWI', 'SLC', 'DCA', 'IAD',
  'SAN', 'MDW', 'TPA', 'HNL', 'PDX'];
