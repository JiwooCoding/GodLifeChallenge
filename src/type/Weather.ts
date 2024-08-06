export interface WeatherData {
    name: string;
    main: {
        temp: number;
        temp_min:number;
        temp_max:number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    coord: {
        lon: number;
        lat: number;
    };
}

export interface CityName {
    [key: string]: string;
}