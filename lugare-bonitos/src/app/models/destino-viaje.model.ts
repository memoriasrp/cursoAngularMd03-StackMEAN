export class DestinoViajes {
    
  constructor(
    public nombre: string,
    public imagenUrl: string,
    public servicios: string[] = ['pileta', 'desayuno'],
    public votos: number = 0,
    public selected: boolean = false
  ) {}

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(v: boolean) {
    this.selected = v;
  }
 

}