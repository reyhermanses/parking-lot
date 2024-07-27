// src/ParkingLot.ts

interface Car {
    registrationNumber: string;
    color: string;
  }
  
  class ParkingLot {
    private capacity: number;
    private slots: (Car | null)[];
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.slots = Array(this.capacity).fill(null);
      console.log(`Created parking lot with ${capacity} slots`);
    }
  
    park(car: Car): void {
      for (let i = 0; i < this.capacity; i++) {
        if (this.slots[i] === null) {
          this.slots[i] = car;
          console.log(`Allocated slot number: ${i + 1}`);
          return;
        }
      }
      console.log('Sorry, parking lot is full');
    }
  
    leave(registrationNumber: string, hours: number): void {
      for (let i = 0; i < this.capacity; i++) {
        if (this.slots[i] && this.slots[i]!.registrationNumber === registrationNumber) {
          this.slots[i] = null;
          const charge = 10 + Math.max(0, hours - 2) * 10;
          console.log(
            `Registration number ${registrationNumber} with Slot Number ${
              i + 1
            } is free with Charge ${charge}`
          );
          return;
        }
      }
      console.log(`Registration number ${registrationNumber} not found`);
    }
  
    status(): void {
      console.log('Slot No. Registration No.');
      for (let i = 0; i < this.capacity; i++) {
        if (this.slots[i] !== null) {
          console.log(`${i + 1} ${this.slots[i]!.registrationNumber}`);
        }
      }
    }
  }
  
  export default ParkingLot;
  