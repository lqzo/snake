import { Position } from './types';
import { GRID_SIZE } from './constants';
import { Snake } from './Snake';

export class Food {
  position: Position;

  constructor() {
    this.position = { x: 5, y: 5 };
  }

  spawn(snake: Snake) {
    let validPosition = false;
    let newPos: Position = { x: 0, y: 0 };

    while (!validPosition) {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      if (!snake.checkSelfCollision(newPos)) {
        validPosition = true;
      }
    }

    this.position = newPos;
  }
}
