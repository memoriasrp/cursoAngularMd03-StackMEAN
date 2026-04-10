export class DestinoViajes {

  constructor(
    public nombre: string,
    public imagenUrl: string,
    public votos: number = 0, // 3º lugar
    public servicios: string[] = ['pileta', 'desayuno'], // 4º lugar
    public selected: boolean = false // 5º lugar
  ) { }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(v: boolean) {
    this.selected = v;
  }


}