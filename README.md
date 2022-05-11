# Stormy

[![GitHub workflow status](https://img.shields.io/github/workflow/status/ayltai/stormy/CI?style=flat)](https://github.com/ayltai/stormy/actions)
[![Coverage](https://img.shields.io/sonar/coverage/ayltai_stormy?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Violations](https://img.shields.io/sonar/violations/ayltai_stormy?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Tech debt](https://img.shields.io/sonar/tech_debt/ayltai_stormy?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Quality gate](https://img.shields.io/sonar/quality_gate/ayltai_stormy?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Maintainability rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_stormy&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Reliability rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_stormy&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Security rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_stormy&metric=security_rating)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ayltai_stormy&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ayltai_stormy)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/ayltai/stormy?style=flat)
![Maintenance](https://img.shields.io/maintenance/yes/2022)
[![Release](https://img.shields.io/github/release/ayltai/stormy.svg?style=flat)](https://github.com/ayltai/stormy/releases)
[![License](https://img.shields.io/github/license/ayltai/stormy.svg?style=flat)](https://github.com/ayltai/stormy/blob/master/LICENSE)

A gorgeous weather forecast menubar app for macOS.

## Features
* Beautifully designed and easy to use weather app
* Current conditions, hourly and daily forecasts
* Supports multiple weather providers
* Provides only the information that matters to you
* Automatically refresh latest weather data
* Supports metric and imperial units
* Dark and light mode
* ... and more!

## Weather providers
* [AccuWeather](https://www.accuweather.com)
* [OpenWeatherMap](https://openweathermap.org)

## Screenshots

![Dark mode](design/dark-mode.jpg)

![Light mode](design/light-mode.jpg)

## Development
1. Install [NodeJS](https://nodejs.org)
2. Install dependencies
   ```shell
   npm i --legacy-peer-deps
   ```

### Configurations

#### AccuWeather API
1. Get an API key from [AccuWeather](https://developer.accuweather.com)
2. Specify the API key for using AccuWeather:
   ```shell
   export REACT_APP_API_KEY_ACCUWEATHER=XXXXX
   ```

#### OpenWeatherMap API
1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Specify the API key for using OpenWeatherMap:
   ```shell
   export REACT_APP_API_KEY_OPENWEATHERMAP=XXXXX
   ```

#### HERE API
1. Get an API key from [HERE](https://developer.here.com)
2. Specify the API key for using HERE:
   ```shell
   export REACT_APP_API_KEY_HERE=XXXXX
   ```

#### Unsplash API
1. Get an API key from [Unsplash](https://unsplash.com/developers)
2. Specify the API key for using Unsplash:
   ```shell
   export REACT_APP_API_KEY_UNSPLASH=XXXXX
   ```

### Run
1. Open a terminal window and run:
   ```shell
   npm start
   ```
2. Open a second terminal window and run:
   ```shell
   npm run electron
   ```

### Build
```shell
npm run build
```

### Package
```shell
npm run package
```

## License
This project is licensed under the terms of the [MIT license](https://github.com/ayltai/stormy/blob/LICENSE).
