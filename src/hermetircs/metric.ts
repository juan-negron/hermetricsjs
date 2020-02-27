class Metric {
  private readonly _name: string;

  constructor (name = 'Generic') {
    this._name = name
  }

  /**
  * distance
  */
  public distance (source: string, target: string, cost: number = 1): number {
    return source === target ? 0 : 1
  }

  public maxDistance (source: string, target: string, cost: number = 1): number {
    return (source.length === 0 && target.length === 0) ? 0 : 1
  }
  public minDistance(source: string, target: string, cost: number = 1) : number {
    return 0
  }
  public normalized(x: number, low: number = 0, high: number = 1): number {
    //const norm : number = 0
    if (high <= low) {
      return 0
    }
    if (x >= high) {
      return 1
    }
    if (x <= low) {
      return 0
    }

    return (x - low) / (high - low)

  }
  public normalizedDistance(source: string, target: string, cost: number = 1): number {
    const x : number = this.distance(source, target, cost)
    const min: number= this.minDistance(source, target, cost)
    const max: number = this.maxDistance(source, target, cost)
    return this.normalized(x, min, max)
  }
  public similarity( source: string, target: string, cost: number = 1) : number {
    return 1 - this.normalizedDistance(source, target, cost)
  }
}

export default Metric
