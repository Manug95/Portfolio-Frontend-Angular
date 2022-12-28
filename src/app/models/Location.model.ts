export class Location {
    private country: string = "";
    private city: string = "";
    private street: string = "";

    constructor() {}

    // getters y setters

    getCountry(): string {
        return this.country;
    }

    setCountry(country: string) {
        this.country = country;
    }

    getCity(): string {
        return this.city;
    }

    setCity(city: string) {
        this.city = city;
    }

    getStreet(): string {
        return this.street;
    }

    setStreet(street: string) {
        this.street = street;
    }
}