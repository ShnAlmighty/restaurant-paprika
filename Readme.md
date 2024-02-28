# Restaurant Filtering Backend

## Information
This repository contains APIs developed for basic restaurant search functionalities based on various filters such as type of cuisine, dietary preferences, etc.

## Prerequisites
 Install the dependencies by running the below commands from the project's root directory in the command line:
```bash
$npm install
```

## Starting the Process
To start the server:
```bash 
$npm start
```

## API Documentation

#### Create Restaurant
This will be used to add a new restaurant to the database

```http
POST /restaurants
```
Request Schema
| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the restaurant |
| `latitude` | `string` | **Required**. Longitude coordinate of the restaurant |
| `longitude` | `string` | **Required**. Latitude coordinate of the restaurant |
| `cuisine` | `string` | **Required**. Type of primary cusine supported by the restaurant |
| `dietary_preferences` | `array` | **Required**. An array of string/s which contains the dietary preferences supported by this restaurant |

Response Schema
| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Id of the restaurant |
| `created_at` | `string` | Restaurant addition timestamp |
| `name` | `string` | Name of the restaurant |
| `location` | `object` | Object containing details of the restaurant's location and coordinate type (DB ref)|
| `location.type` | `string` | Type of location stored in DB |
| `location.coordinates` | `object` | Object containing coordinates of the restaurant |
| `location.coordinates.latitude` | `number` | Longitude coordinate of the restaurant |
| `location.coordinates.longitude` | `number` | Latitude coordinate of the restaurant |
| `cuisine` | `string` | Type of primary cusine served by the restaurant |
| `dietary_preferences` | `array` | An array of string/s which contains the dietary preferences supported by this restaurant |

#### Read Restaurants
This will be used to fetch the restaurants using various filters

```http
GET /restaurants
```
Request Schema
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `latitude` | `string` | Longitude coordinate of the restaurant |
| `longitude` | `string` | Latitude coordinate of the restaurant |
| `cuisine` | `string` | Type of primary cusine served by the restaurant |
| `dietary_preferences` | `array` | An array of string/s which contains the dietary preferences supported by this restaurant |

Response Schema
| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Id of the restaurant |
| `name` | `string` | Name of the restaurant |
| `cuisine` | `string` | Type of primary cusine served by the restaurant |
| `latitude` | `number` | Longitude coordinate of the restaurant |
| `longitude` | `number` | Latitude coordinate of the restaurant |
| `created_at` | `string` | Restaurant addition timestamp |
| `dist_meters` | `number` | Distance from the provided coordinates (if coordinates are provided in the query)  |
| `dietary_preferences` | `array` | An array of string/s which contains the dietary preferences supported by this restaurant |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.