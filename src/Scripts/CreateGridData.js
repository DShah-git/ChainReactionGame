let x = 10;
let y = 5;

function CreateGrid() {
  let whole = [];
  let cornerSet = ["1,1", [1, y].join(","), [x, 1].join(","), [x, y].join(",")];

  for (let i = 1; i <= x; i++) {
    let row = {};
    for (let j = 1; j <= y; j++) {
      let location = i + "," + j;
      if (cornerSet.includes(location)) {
        let inf = [];
        if (location === "1,1") {
          inf = ["1,2", "2,1"];
        } else if (location === [1, y].join(",")) {
          inf = [[1, y - 1].join(","), [1 + 1, y].join(",")];
        } else if (location === [x, 1].join(",")) {
          inf = [[x - 1, 1].join(","), [x, 1 + 1].join(",")];
        } else if (location === [x, y].join(",")) {
          inf = [[x - 1, y].join(","), [x, y - 1].join(",")];
        }
        let obj = {
          type:'corner',
          currentHold: 0,
          currentColor: null,
          influence: inf
        };
        row[location] = obj;
      } else if (i == 1 || i == x || j == 1 || j == y) {
        let inf = [];
        if (i == 1) {
          inf = [
            [i, j - 1].join(","),
            [i + 1, j].join(","),
            [i, j + 1].join(",")
          ];
        } else if (j == 1) {
          inf = [
            [i - 1, j].join(","),
            [i, j + 1].join(","),
            [i + 1, j].join(",")
          ];
        } else if (i == x) {
          inf = [
            [i, j - 1].join(","),
            [i - 1, j].join(","),
            [i, j + 1].join(",")
          ];
        } else if (j == y) {
          inf = [
            [i - 1, j].join(","),
            [i, j - 1].join(","),
            [i + 1, j].join(",")
          ];
        }
        let obj = {
          type:'edge',
          currentHold: 0,
          currentColor: null,
          influence: inf
          
        };
        row[location] = obj;
      } else {
        let inf = [
          [i, j - 1].join(","),
          [i - 1, j].join(","),
          [i + 1, j].join(","),
          [i, j + 1].join(",")
        ];
        let obj = {
          type:'free',
          currentHold: 0,
          currentColor: null,
          influence: inf
          
        };
        row[location] = obj;
      }
    }
    whole.push(row);
  }

  console.log(whole);
}

CreateGrid();
