import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {
  // RGB Black color codes rgb(0,0,0) #000000
  // RGB White color codes rgb(255,255,255) #FFFFFF
  colors = ['#000000', '#FFFFFF'];
  bottomRightColor: string;
  topLeftColor: string;
  gridNumberAxes = 10;
  gridNumberAbscisse = 10;
  width: number;
  height: number;
  /** Template reference to the canvas element */
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor() {}

  populateColorGrid() {

    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );

    // Create color gradient
    gradient.addColorStop(0, this.topLeftColor);
    gradient.addColorStop(1, this.colors[1]);
    // Apply gradient to canvas
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 40, this.width, this.gridNumberAbscisse);
  }
  /**
   * Draws  using the context we obtained earlier on
   */
  private draw() {
    this.width = (this.canvas.nativeElement as HTMLCanvasElement).width;
    this.height = (this.canvas.nativeElement as HTMLCanvasElement).height;
    const x = this.width / this.gridNumberAxes;
    const y = this.height / this.gridNumberAbscisse;
    this.context.save(); // The origin of the coordinate system is at the top left corner of the grid

    for (let i = 0; i < this.gridNumberAxes; i = i + 1) {
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(0, this.width);
      this.context.stroke();
      this.context.translate(x, 0);
    }
    this.context.restore();

    for (let j = 0; j < this.gridNumberAbscisse; j = j + 1) {
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(this.height, 0);
      this.context.stroke();
      this.context.translate(0, y);
    }
  }

  ngOnInit(): void {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );
    this.draw();
  }
}
