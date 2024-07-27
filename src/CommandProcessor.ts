// src/CommandProcessor.ts

import * as fs from 'fs';
import * as readline from 'readline';
import ParkingLot from './ParkingLot';

/**
 * Class responsible for processing parking lot commands from a file.
 */
class CommandProcessor {
  private parkingLot: ParkingLot | null = null;

  constructor(private filename: string) {}

  /**
   * Reads commands from the input file and processes them.
   */
  processCommands(): void {
    const fileStream = fs.createReadStream(this.filename);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      this.processLine(line.trim());
    });
  }

  /**
   * Processes a single line of command.
   * @param line The command line to process.
   */
  private processLine(line: string): void {
    const commandParts = line.split(' ');

    if (commandParts.length === 0) return;

    const command = commandParts[0];

    switch (command) {
      case 'create_parking_lot':
        const capacity = parseInt(commandParts[1], 10);
        this.parkingLot = new ParkingLot(capacity);
        break;
      case 'park':
        if (this.parkingLot) {
          const registrationNumber = commandParts[1];
          const color = commandParts[2];
          this.parkingLot.park({ registrationNumber, color });
        } else {
          console.log('Parking lot not created');
        }
        break;
      case 'leave':
        if (this.parkingLot) {
          const registrationNumber = commandParts[1];
          const hours = parseInt(commandParts[2], 10);
          this.parkingLot.leave(registrationNumber, hours);
        } else {
          console.log('Parking lot not created');
        }
        break;
      case 'status':
        if (this.parkingLot) {
          this.parkingLot.status();
        } else {
          console.log('Parking lot not created');
        }
        break;
      default:
        console.log(`Unknown command: ${command}`);
    }
  }
}

export default CommandProcessor;
