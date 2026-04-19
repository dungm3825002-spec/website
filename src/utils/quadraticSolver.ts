export interface QuadraticResult {
  type: 'two-real' | 'one-real' | 'complex' | 'no-solution';
  discriminant: number;
  x1?: number;
  x2?: number;
  realPart?: number;
  imaginaryPart?: number;
  vertex?: { x: number; y: number };
  axis?: number;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  // Tính delta (discriminant)
  const discriminant = b * b - 4 * a * c;
  
  // Tính đỉnh parabol
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  const vertex = { x: vertexX, y: vertexY };
  const axis = vertexX;

  if (discriminant > 0) {
    // Hai nghiệm phân biệt
    const sqrtDelta = Math.sqrt(discriminant);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);
    
    return {
      type: 'two-real',
      discriminant,
      x1,
      x2,
      vertex,
      axis
    };
  } else if (discriminant === 0) {
    // Nghiệm kép
    const x = -b / (2 * a);
    
    return {
      type: 'one-real',
      discriminant,
      x1: x,
      vertex,
      axis
    };
  } else {
    // Nghiệm phức
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    
    return {
      type: 'complex',
      discriminant,
      realPart,
      imaginaryPart,
      vertex,
      axis
    };
  }
}

export function formatNumber(num: number, decimals: number = 4): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // Làm tròn đến số chữ số thập phân nhất định
  const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  
  // Loại bỏ các số 0 thừa
  return rounded.toString();
}
