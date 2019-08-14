export class Room {
    constructor(
      public name: string,
      public description: string,
      public capacity: number,
      public createdAt: string,
      public updatedAt: string,
      public equipement?: any[],
      public photo?: string
    ) {}
  }
