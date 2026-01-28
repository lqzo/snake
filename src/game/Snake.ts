import { Position, Direction } from './types';
import { GRID_SIZE } from './constants';

export class Snake {
  body: Position[];
  direction: Direction;
  newDirection: Direction;
  growPending: number;

  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    this.direction = 'UP';
    this.newDirection = 'UP';
    this.growPending = 0;
  }

  reset() {
    this.body = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    this.direction = 'UP';
    this.newDirection = 'UP';
    this.growPending = 0;
  }

  setDirection(dir: Direction) {
    // Prevent 180 degree turns
    if (this.direction === 'UP' && dir === 'DOWN') return;
    if (this.direction === 'DOWN' && dir === 'UP') return;
    if (this.direction === 'LEFT' && dir === 'RIGHT') return;
    if (this.direction === 'RIGHT' && dir === 'LEFT') return;
    
    this.newDirection = dir;
  }

  move() {
    this.direction = this.newDirection;
    const head = { ...this.body[0] };

    switch (this.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    this.body.unshift(head);

    if (this.growPending > 0) {
      this.growPending--;
    } else {
      this.body.pop();
    }
  }

  grow() {
    this.growPending++;
  }

  checkCollision(): boolean {
    const head = this.body[0];

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }

    // Self collision (start checking from index 1)
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }

    return false;
  }

  checkSelfCollision(position: Position): boolean {
    return this.body.some(segment => segment.x === position.x && segment.y === position.y);
  }
}
