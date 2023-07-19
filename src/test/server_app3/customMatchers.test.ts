import { Reservation } from "../../app/server_app/model/ReservationModel"
expect.extend({
    toBeValidReservation(reservation : Reservation) {
        const validId = (reservation.id.length > 5) ? true : false;
        const validUser = (reservation.user.length > 5) ? true : false;

        return {
            pass: validId && validUser,
            message: () => "Expected reservation to have valid id and user"
        }
    }
})

interface CustomMatchers<R> {
    toBeValidReservation() : R
}

declare global {
    namespace jest {
        interface Matchers<R> extends CustomMatchers<R> {}
    }
}

const someReservation : Reservation = {
    id: '123456',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser',
}

describe('custom matchers test', () => {
    it('check for valid reservation', () => {
        expect(someReservation).toBeValidReservation()
    })
})