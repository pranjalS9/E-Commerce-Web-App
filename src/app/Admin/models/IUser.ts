export interface IUser {
    id: number,
    username: string,
    name: {
        firstname: string,
        lastname: string
    },
    email: string,
    address: {
        number: string,
        street: string,
        city: string,
        zipcode: string
    },
    phone: string
}