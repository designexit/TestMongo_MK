//use("test");
db.character.insertMany([
  {name: 'x', inventory: ['pen', 'cloth', 'pen'] },
  {name: 'y', inventory: ['book', 'cloth'], position:{x:1, y:5}},
  {name: 'z', inventory: ['wood', 'pen'], position:{x:0, y:9}}
  ]);

  //조회
  db.character.find();

  //수정
  db.character.update({}, {
    $set:{"inventory.$[penElm]":"pencil"}},
    {arrayFilters:[{penElm:'pen'}]
    });

  // 수정
  db.character.updateMany({}, {
    $set:{"inventory.$[penElm]":"pencil"}},
    {arrayFilters:[{penElm:'pen'}]
    });

