import * as SVG from 'svg.js';
import { Company } from './company';

export class Table {
  public tableId:number;
  public mapId:number;
  public event:number; //Todo: remove
  public companyId:number;
  public xCoordinate:number;
  public yCoordinate:number;
  public width:number;
  public height:number;
  public company: Company;
  //Todo: add company domain-model
  public tableSVG:any;

  constructor(tableId: number, mapId:number, companyId:number, xCoordinate:number, yCoordinate:number, width:number, height:number){
    this.tableId = tableId;
    this.mapId = mapId;
    this.companyId = companyId;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.width = width;
    this.height = height;
    this.tableSVG = null;
  }

}
