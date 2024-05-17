# Weather App

This is a weather app backend API built using GraphQL and the OpenWeatherAPI. It provides weather data by interacting with the OpenWeatherAPI.

## Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- MongoDB
- OpenWeatherAPI Key

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/asaru707/weather-app.git
    cd weather-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:
    ```env
    OPENWEATHERAPPID=your_openweather_api_key
    MONGODBURI=your_mongodb_connection_uri
    ```

    - `OPENWEATHERAPPID`: Your API key from OpenWeatherAPI.
    - `MONGODBURI`: Your MongoDB connection URI.

### Running the App

To start the application, use the following command:
```sh
npm start
