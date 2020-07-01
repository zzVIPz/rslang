/* TODO: define magic numbers and colors in constants */
export default function createPuzzle(length, borderColor) {
  const puzzle = document.createElement('canvas');
  puzzle.classList.add('Block--isClickable');
  const ctx = puzzle.getContext('2d');
  puzzle.height = 50;
  puzzle.width = length + 16;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.strokeStyle = borderColor;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 0);
  ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 17);
  ctx.arc(puzzle.width + 5 - (Math.sqrt(2) / 2 + 1) * 10, 25, 10,
    (5 / 4) * Math.PI + 0.2, (3 / 4) * Math.PI - 0.2, false);
  ctx.moveTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 33);
  ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 50);
  ctx.lineTo(0, 50);

  ctx.lineTo(0, 33);
  ctx.arc(5, 25, 10, (3 / 4) * Math.PI, (5 / 4) * Math.PI, true);
  ctx.lineTo(0, 17);
  ctx.lineTo(0, 0);

  ctx.fillStyle = '#1c283b';
  ctx.fill();

  ctx.stroke();
  ctx.clip();

  return puzzle;
}
