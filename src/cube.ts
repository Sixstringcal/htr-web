class RubiksCube {
    // Define the initial state of the cube
    edgePermutation: number[]; // An array representing the position of each edge (0-11)
    edgeOrientation: boolean[]; // An array representing the orientation of each edge
    cornerPermutation: number[]; // An array representing the position of each corner (0-7)
    cornerOrientation: number[]; // An array representing the orientation of each corner (0-2)
    solvedEdgePermutation = [...Array(12).keys()];
    solvedEdgeOrientation = Array(12).fill(true);
    solvedCornerPermutation = [...Array(8).keys()];
    solvedCornerOrientation = Array(8).fill(0);
  
    constructor() {
      // Initialize the cube with a solved state
      this.edgePermutation = [...Array(12).keys()];
      this.edgeOrientation = Array(12).fill(true); // All edges are initially oriented
      this.cornerPermutation = [...Array(8).keys()];
      this.cornerOrientation = Array(8).fill(0); // All corners are initially oriented
    }
  
    solve() {
      this.edgeOrientation = this.solvedEdgeOrientation;
      this.edgePermutation = this.solvedEdgePermutation;
      this.cornerOrientation = this.solvedCornerOrientation;
      this.cornerPermutation = this.solvedCornerPermutation;
    }
  
    cpSolved() {
      return this.arraysEqual(
        this.cornerPermutation,
        this.solvedCornerPermutation
      );
    }
  
    // Apply a sequence of moves to the cube
    applyMoves(moves: string) {
      const moveRegex = /([RULDFB])([2']?)/g;
      let match;
  
      while ((match = moveRegex.exec(moves))) {
        const move = match[1];
        const modifier = match[2];
  
        if (modifier === "2") {
          this.performMove(move);
          this.performMove(move);
        } else if (modifier === "'") {
          this.performMove(move);
          this.performMove(move);
          this.performMove(move);
        } else {
          this.performMove(move);
        }
      }
    }
  
    // Helper method to perform a single move
    private performMove(move: string) {
      if (move === "U") {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[0];
        this.edgePermutation[0] = this.edgePermutation[3];
        this.edgePermutation[3] = this.edgePermutation[2];
        this.edgePermutation[2] = this.edgePermutation[1];
        this.edgePermutation[1] = tempEdgePermutation;
        var tempEdgeOrientation = this.edgeOrientation[0];
        this.edgeOrientation[0] = this.edgeOrientation[3];
        this.edgeOrientation[3] = this.edgeOrientation[2];
        this.edgeOrientation[2] = this.edgeOrientation[1];
        this.edgeOrientation[1] = tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[0];
        this.cornerPermutation[0] = this.cornerPermutation[3];
        this.cornerPermutation[3] = this.cornerPermutation[2];
        this.cornerPermutation[2] = this.cornerPermutation[1];
        this.cornerPermutation[1] = tempCornerPermutation;
        var tempCornerOrientation = this.cornerOrientation[0];
        this.cornerOrientation[0] = this.cornerOrientation[3];
        this.cornerOrientation[3] = this.cornerOrientation[2];
        this.cornerOrientation[2] = this.cornerOrientation[1];
        this.cornerOrientation[1] = tempCornerOrientation;
      } else if (move === "D") {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[8];
        this.edgePermutation[8] = this.edgePermutation[11];
        this.edgePermutation[11] = this.edgePermutation[10];
        this.edgePermutation[10] = this.edgePermutation[9];
        this.edgePermutation[9] = tempEdgePermutation;
  
        var tempEdgeOrientation = this.edgeOrientation[8];
        this.edgeOrientation[8] = this.edgeOrientation[11];
        this.edgeOrientation[11] = this.edgeOrientation[10];
        this.edgeOrientation[10] = this.edgeOrientation[9];
        this.edgeOrientation[9] = tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[4];
        this.cornerPermutation[4] = this.cornerPermutation[7];
        this.cornerPermutation[7] = this.cornerPermutation[6];
        this.cornerPermutation[6] = this.cornerPermutation[5];
        this.cornerPermutation[5] = tempCornerPermutation;
        var tempCornerOrientation = this.cornerOrientation[4];
        this.cornerOrientation[4] = this.cornerOrientation[7];
        this.cornerOrientation[7] = this.cornerOrientation[6];
        this.cornerOrientation[6] = this.cornerOrientation[5];
        this.cornerOrientation[5] = tempCornerOrientation;
      } else if (move === "R") {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[1];
        this.edgePermutation[1] = this.edgePermutation[6];
        this.edgePermutation[6] = this.edgePermutation[9];
        this.edgePermutation[9] = this.edgePermutation[5];
        this.edgePermutation[5] = tempEdgePermutation;
        var tempEdgeOrientation = this.edgeOrientation[1];
        this.edgeOrientation[1] = this.edgeOrientation[6];
        this.edgeOrientation[6] = this.edgeOrientation[9];
        this.edgeOrientation[9] = this.edgeOrientation[5];
        this.edgeOrientation[5] = tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[2];
        var tempCornerOrientation = this.cornerOrientation[2];
        this.cornerPermutation[2] = this.cornerPermutation[5];
        this.cornerOrientation[2] = (this.cornerOrientation[5] + 2) % 3;
        this.cornerPermutation[5] = this.cornerPermutation[6];
        this.cornerOrientation[5] = (this.cornerOrientation[6] + 1) % 3;
        this.cornerPermutation[6] = this.cornerPermutation[1];
        this.cornerOrientation[6] = (this.cornerOrientation[1] + 2) % 3;
        this.cornerPermutation[1] = tempCornerPermutation;
        this.cornerOrientation[1] = (tempCornerOrientation + 1) % 3;
      } else if (move === "L") {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[3];
        this.edgePermutation[3] = this.edgePermutation[4];
        this.edgePermutation[4] = this.edgePermutation[11];
        this.edgePermutation[11] = this.edgePermutation[7];
        this.edgePermutation[7] = tempEdgePermutation;
        var tempEdgeOrientation = this.edgeOrientation[3];
        this.edgeOrientation[3] = this.edgeOrientation[4];
        this.edgeOrientation[4] = this.edgeOrientation[11];
        this.edgeOrientation[11] = this.edgeOrientation[7];
        this.edgeOrientation[7] = tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[0];
        var tempCornerOrientation = this.cornerOrientation[0];
        this.cornerPermutation[0] = this.cornerPermutation[7];
        this.cornerOrientation[0] = (this.cornerOrientation[7] + 2) % 3;
        this.cornerPermutation[7] = this.cornerPermutation[4];
        this.cornerOrientation[7] = (this.cornerOrientation[4] + 1) % 3;
        this.cornerPermutation[4] = this.cornerPermutation[3];
        this.cornerOrientation[4] = (this.cornerOrientation[3] + 2) % 3;
        this.cornerPermutation[3] = tempCornerPermutation;
        this.cornerOrientation[3] = (tempCornerOrientation + 1) % 3;
      } else if (move === "F") {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[2];
        var tempEdgeOrientation = this.edgeOrientation[2];
        this.edgePermutation[2] = this.edgePermutation[7];
        this.edgeOrientation[2] = !this.edgeOrientation[7];
        this.edgePermutation[7] = this.edgePermutation[8];
        this.edgeOrientation[7] = !this.edgeOrientation[8];
        this.edgePermutation[8] = this.edgePermutation[6];
        this.edgeOrientation[8] = !this.edgeOrientation[6];
        this.edgePermutation[6] = tempEdgePermutation;
        this.edgeOrientation[6] = !tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[3];
        var tempCornerOrientation = this.cornerOrientation[3];
        this.cornerPermutation[3] = this.cornerPermutation[4];
        this.cornerOrientation[3] = (this.cornerOrientation[4] + 2) % 3;
        this.cornerPermutation[4] = this.cornerPermutation[5];
        this.cornerOrientation[4] = (this.cornerOrientation[5] + 1) % 3;
        this.cornerPermutation[5] = this.cornerPermutation[2];
        this.cornerOrientation[5] = (this.cornerOrientation[2] + 2) % 3;
        this.cornerPermutation[2] = tempCornerPermutation;
        this.cornerOrientation[2] = (tempCornerOrientation + 1) % 3;
      } else {
        // Edge movements
        var tempEdgePermutation = this.edgePermutation[0];
        var tempEdgeOrientation = this.edgeOrientation[0];
        this.edgePermutation[0] = this.edgePermutation[5];
        this.edgeOrientation[0] = !this.edgeOrientation[5];
        this.edgePermutation[5] = this.edgePermutation[10];
        this.edgeOrientation[5] = !this.edgeOrientation[10];
        this.edgePermutation[10] = this.edgePermutation[4];
        this.edgeOrientation[10] = !this.edgeOrientation[4];
        this.edgePermutation[4] = tempEdgePermutation;
        this.edgeOrientation[4] = !tempEdgeOrientation;
  
        // Corner movements
        var tempCornerPermutation = this.cornerPermutation[1];
        var tempCornerOrientation = this.cornerOrientation[1];
        this.cornerPermutation[1] = this.cornerPermutation[6];
        this.cornerOrientation[1] = (this.cornerOrientation[6] + 2) % 3;
        this.cornerPermutation[6] = this.cornerPermutation[7];
        this.cornerOrientation[6] = (this.cornerOrientation[7] + 1) % 3;
        this.cornerPermutation[7] = this.cornerPermutation[0];
        this.cornerOrientation[7] = (this.cornerOrientation[0] + 2) % 3;
        this.cornerPermutation[0] = tempCornerPermutation;
        this.cornerOrientation[0] = (tempCornerOrientation + 1) % 3;
      }
    }
  
    // Check if the cube is solved
    isSolved(): boolean {
      return (
        this.arraysEqual(this.edgeOrientation, this.solvedEdgeOrientation) &&
        this.arraysEqual(this.cornerOrientation, this.solvedCornerOrientation) &&
        this.arraysEqual(this.edgePermutation, this.solvedEdgePermutation) &&
        this.arraysEqual(this.cornerPermutation, this.solvedCornerPermutation)
      );
    }
  
    fbEoSovled(): boolean {
      return this.arraysEqual(this.edgeOrientation, this.solvedEdgeOrientation);
    }
  
    udDrSolved(): boolean {
      return (
        this.arraysEqual(this.edgeOrientation, this.solvedEdgeOrientation) &&
        this.arraysEqual(this.cornerOrientation, this.solvedCornerOrientation) &&
        this.edgePermutation[4] > 3 &&
        this.edgePermutation[4] < 8 &&
        this.edgePermutation[5] > 3 &&
        this.edgePermutation[5] < 8 &&
        this.edgePermutation[6] > 3 &&
        this.edgePermutation[6] < 8 &&
        this.edgePermutation[7] > 3 &&
        this.edgePermutation[7] < 8
      );
    }
  
    allOpposites(): boolean {
      return (
        this.udDrSolved &&
        this.cornerPermutation[0] % 2 === 0 &&
        this.cornerPermutation[2] % 2 === 0 &&
        this.cornerPermutation[4] % 2 === 0 &&
        this.cornerPermutation[6] % 2 === 0 &&
        this.cornerPermutation[1] % 2 === 1 &&
        this.cornerPermutation[3] % 2 === 1 &&
        this.cornerPermutation[5] % 2 === 1 &&
        this.cornerPermutation[7] % 2 === 1 &&
        (this.edgePermutation[0] === 0 ||
          this.edgePermutation[0] === 2 ||
          this.edgePermutation[0] === 8 ||
          this.edgePermutation[0] === 10) &&
        (this.edgePermutation[2] === 0 ||
          this.edgePermutation[2] === 2 ||
          this.edgePermutation[2] === 8 ||
          this.edgePermutation[2] === 10) &&
        (this.edgePermutation[8] === 0 ||
          this.edgePermutation[8] === 2 ||
          this.edgePermutation[8] === 8 ||
          this.edgePermutation[8] === 10) &&
        (this.edgePermutation[10] === 0 ||
          this.edgePermutation[10] === 2 ||
          this.edgePermutation[10] === 8 ||
          this.edgePermutation[10] === 10) &&
        (this.edgePermutation[1] === 1 ||
          this.edgePermutation[1] === 3 ||
          this.edgePermutation[1] === 9 ||
          this.edgePermutation[1] === 11) &&
        (this.edgePermutation[3] === 1 ||
          this.edgePermutation[3] === 3 ||
          this.edgePermutation[3] === 9 ||
          this.edgePermutation[3] === 11) &&
        (this.edgePermutation[9] === 1 ||
          this.edgePermutation[9] === 3 ||
          this.edgePermutation[9] === 9 ||
          this.edgePermutation[9] === 11) &&
        (this.edgePermutation[11] === 1 ||
          this.edgePermutation[11] === 3 ||
          this.edgePermutation[11] === 9 ||
          this.edgePermutation[11] === 11)
      );
    }
  
    private arraysEqual(arr1: any[], arr2: any[]): boolean {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    }

    public areEqual(cube: RubiksCube): boolean {
      const filterEdges = (arr: any[]) => arr.filter((_, i) => i < 4 || i > 7);
        return (
          this.arraysEqual(filterEdges(this.edgePermutation), filterEdges(cube.edgePermutation)) &&
          this.arraysEqual(filterEdges(this.edgeOrientation), filterEdges(cube.edgeOrientation)) &&
            this.arraysEqual(this.cornerPermutation, cube.cornerPermutation) &&
            this.arraysEqual(this.cornerOrientation, cube.cornerOrientation)
        );
        }
  }
  
  export { RubiksCube };