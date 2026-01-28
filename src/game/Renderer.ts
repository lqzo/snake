import { COLORS, GRID_SIZE } from './constants';
import { Snake } from './Snake';
import { Food } from './Food';

export class Renderer {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  cellSize: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.cellSize = width / GRID_SIZE;
  }

  clear() {
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawGrid() {
    this.ctx.strokeStyle = COLORS.grid;
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= GRID_SIZE; i++) {
      const pos = i * this.cellSize;
      
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(pos, 0);
      this.ctx.lineTo(pos, this.canvasHeight);
      this.ctx.stroke();

      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, pos);
      this.ctx.lineTo(this.canvasWidth, pos);
      this.ctx.stroke();
    }
  }

  drawSnake(snake: Snake) {
    snake.body.forEach((segment, index) => {
      this.ctx.fillStyle = index === 0 ? COLORS.snakeHead : COLORS.snakeBody;
      
      const x = segment.x * this.cellSize;
      const y = segment.y * this.cellSize;
      
      // Draw rounded rectangle for snake segments
      this.roundRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2, 4);
      this.ctx.fill();
      
      // Draw eyes for head
      if (index === 0) {
        this.ctx.fillStyle = '#FFFFFF';
        const eyeSize = this.cellSize * 0.2;
        
        let leftEyeX = 0, leftEyeY = 0, rightEyeX = 0, rightEyeY = 0;
        
        switch (snake.direction) {
          case 'UP':
            leftEyeX = x + this.cellSize * 0.25;
            leftEyeY = y + this.cellSize * 0.2;
            rightEyeX = x + this.cellSize * 0.75;
            rightEyeY = y + this.cellSize * 0.2;
            break;
          case 'DOWN':
            leftEyeX = x + this.cellSize * 0.75;
            leftEyeY = y + this.cellSize * 0.8;
            rightEyeX = x + this.cellSize * 0.25;
            rightEyeY = y + this.cellSize * 0.8;
            break;
          case 'LEFT':
            leftEyeX = x + this.cellSize * 0.2;
            leftEyeY = y + this.cellSize * 0.75;
            rightEyeX = x + this.cellSize * 0.2;
            rightEyeY = y + this.cellSize * 0.25;
            break;
          case 'RIGHT':
            leftEyeX = x + this.cellSize * 0.8;
            leftEyeY = y + this.cellSize * 0.25;
            rightEyeX = x + this.cellSize * 0.8;
            rightEyeY = y + this.cellSize * 0.75;
            break;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  drawFood(food: Food) {
    this.ctx.fillStyle = COLORS.food;
    const x = food.position.x * this.cellSize + this.cellSize / 2;
    const y = food.position.y * this.cellSize + this.cellSize / 2;
    const radius = this.cellSize / 2 - 2;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, r);
    this.ctx.arcTo(x + w, y + h, x, y + h, r);
    this.ctx.arcTo(x, y + h, x, y, r);
    this.ctx.arcTo(x, y, x + w, y, r);
    this.ctx.closePath();
  }
}
