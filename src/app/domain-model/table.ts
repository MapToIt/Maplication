import * as SVG from 'svg.js';

enum tableColor {
  AVAILABLE = '#00ff00',
  OCCUPIED = '#ff0000'
};

export class Table {
  public tableId:number;
  public event:number;
  public company:number;
  public x:number;
  public y:number;
  public width:number;
  public height:number;
  public tableSVG:any;

  constructor(tableId: number, event:number, company:number, x:number, y:number, width:number, height:number){
    this.tableId = tableId;
    this.event = event;
    this.company = company;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tableSVG = null;
  }

  DrawTable(svg: any){
    let tempColor = '';
    if (this.company != null){
      tempColor = tableColor.OCCUPIED;
    } else {
      tempColor = tableColor.AVAILABLE;
    }
    this.tableSVG = svg.rect(this.width, this.height).fill(tempColor).opacity(.5).move(this.x, this.y);
  }
}
