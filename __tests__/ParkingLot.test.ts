// __tests__/ParkingLot.test.ts

import ParkingLot from '../src/ParkingLot';

describe('ParkingLot', () => {
  it('should create a parking lot with the given capacity', () => {
    const parkingLot = new ParkingLot(6);
    expect(parkingLot).toBeDefined();
  });

  it('should park cars in the nearest available slot', () => {
    const parkingLot = new ParkingLot(3);
    expect(parkingLot.park({ registrationNumber: 'KA-01-HH-1234', color: 'White' })).toBe('Allocated slot number: 1');
    expect(parkingLot.park({ registrationNumber: 'KA-01-HH-9999', color: 'Black' })).toBe('Allocated slot number: 2');
    expect(parkingLot.park({ registrationNumber: 'KA-01-BB-0001', color: 'Blue' })).toBe('Allocated slot number: 3');
    expect(parkingLot.park({ registrationNumber: 'KA-01-HH-7777', color: 'Red' })).toBe('Sorry, parking lot is full');
  });

  it('should leave the car and calculate charges correctly', () => {
    const parkingLot = new ParkingLot(3);
    parkingLot.park({ registrationNumber: 'KA-01-HH-1234', color: 'White' });
    parkingLot.park({ registrationNumber: 'KA-01-HH-9999', color: 'Black' });
    parkingLot.park({ registrationNumber: 'KA-01-BB-0001', color: 'Blue' });

    expect(parkingLot.leave('KA-01-BB-0001', 4)).toBe('Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 30');
    expect(parkingLot.leave('KA-01-HH-1234', 1)).toBe('Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 10');
    expect(parkingLot.leave('DL-12-AA-9999', 2)).toBe('Registration number DL-12-AA-9999 not found');
  });

  it('should return the correct status of the parking lot', () => {
    const parkingLot = new ParkingLot(3);
    parkingLot.park({ registrationNumber: 'KA-01-HH-1234', color: 'White' });
    parkingLot.park({ registrationNumber: 'KA-01-HH-9999', color: 'Black' });

    const expectedStatus = `Slot No. Registration No.\n1 KA-01-HH-1234\n2 KA-01-HH-9999`;
    expect(parkingLot.status()).toBe(expectedStatus);
  });
});
