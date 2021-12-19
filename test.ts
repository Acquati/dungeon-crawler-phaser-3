let x = randomDirection(Phaser.Math.Between(0, 4))

switch (x) {
  case 0:
    this.x0 += 1
    break
  case 1:
    this.x1 += 1
    break
  case 2:
    this.x2 += 1
    break
  case 3:
    this.x3 += 1
    break
  case 4:
    this.x4 += 1
    break
}

const total = this.x0 + this.x1 + this.x2 + this.x3 + this.x4

console.log(
  (this.x0 / total).toFixed(4),
  (this.x1 / total).toFixed(4),
  (this.x2 / total).toFixed(4),
  (this.x3 / total).toFixed(4),
  (this.x4 / total).toFixed(4)
)
