//use("test")
//find(<query>,<projection>)
//query : 조건부, projection : 보고싶은 열
// 교차로 내 .accident_count만 보여주고 나머지 열 안 보여줌 -> 단, _id는 제외
db.by_road_type.find(
  {county:"강릉시"},
  {"교차로내.accident_count":1}
  );

// _id 제외해줘 select 교차로내.accident_count
db.by_road_type.find(
  {county:"강릉시"},
  {"교차로내.accident_count":1, _id:0}
  );
  
// 다보여줘. select *
db.by_road_type.find(
  {county:"강릉시"}
  );


  db.by_road_type.find(
    {county:"강릉시"},
    {"교차로내.accident_count":1, "터널안.accident_count":1}
    );

  db.by_road_type.find({'기타단일로.death_toll':0}, {city_or_province:1, county:1})


  db.inventory.insertMany([
    { item: "journal", qty: 25, tags: ["blank", "red"] },
    { item: "notebook", qty: 50, tags: ["red", "blank"] },
    { item: "paper", qty: 100, tags: ["yellow", "pink"] },
    { item: "planner", qty: 75, tags: ["blank", "red"] },
    { item: "postcard", qty: 45, tags: ["blue"] }
    ]);

// 쿼리예제, 한문장씩 출력해 보기 ()
db.inventory.find({item:{$eq:'journal'}});
db.inventory.find({item:'journal'});
db.inventory.find({tags: {$in : ['red']}});
db.inventory.find({tags: {$nin:["blank","blue"]}});

// 알파벳a~z까지 d로 끝나는 단어
db.inventory.find({tags: {$in : [/^[a-z]*d/]}});

// 알파벳 b가 포함된...
db.inventory.find({tags: {$in : [/^b/]}});

// 수량이 50이하
db.inventory.find({qty:{$not:{$gt:50}}});
db.inventory.find({qty:{$lte:50}});

// 90초과 50미만
db.inventory.find({$or:[{qty:{$gt:90}},{qty:{$lt:50}}]});

// 50초과 90미만(50~90사이)
db.inventory.find({$and:[{qty:{$gt:50}},{qty:{$lt:90}}]});
db.inventory.find({qty:{$gt:50,$lt:90}});


// 단순 검색
db.stores.insert(
  [
  { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
  { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
  { _id: 3, name: "Coffee Shop", description: "Just coffee" },
  { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
  { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
  ]
  );

  
//#Text index
db.stores.createIndex({name:"text",description:"text"});

//$text Operation
db.stores.find( { $text: { $search: "java coffee shop" } } );

db.stores.find( { $text: { $search: "java shop" } } );

db.stores.find( { $text: { $search: "shop" } } );

db.stores.find( { $text: { $search: "\"coffee shop\"" } } );

db.stores.find( { $text: { $search: "\"coffee and\"" } } );

db.stores.find( { $text: { $search: "java shop -coffee" } } );

db.stores.find( { $text: { $search: "java -shop -coffee" } } );

db.stores.find( { $text: { $search: "java -shop -coffee" } } );


db.inventory.find({tags: ["red", "blank"]});




db.collection.insertMany([
  { item: "journal", qty: 25, tags: [10,20,30,40,50] },
  { item: "notebook", qty: 50, tags: [1,2,3,4,5] },
  { item: "paper", qty: 100, tags: [3,6,9,12,15] },
  { item: "planner", qty: 75, tags: [7,8,9,10,11] },
  { item: "postcard", qty: 45, tags: [2,4,6,8,10] }
  ]);

  //10초과 15미만 
  // all x > 10, all x < 15 : 10초과 , 15미만인 숫자
db.collection.find({tags: {$gt: 10, $lt: 15}});
// 10 < x < 15 
db.collection.find({tags: {$elemMatch: {$gt: 10, $lt: 15}}});


db.by_month.find({$and: [
  {month_data: {$elemMatch: {month: "01월", heavy_injury: 0}}},
  {month_data: {$elemMatch: {month: "02월", death_toll: 0}}}
  ]});


// 순서가 중요함
db.inventory.find({tags: ["red", "blank"]});
db.inventory.find({tags: ["blank", "red"]});
// $all을 쓰면 "red", "blank" 순서와 상관 없이 해당 요소가 있는지만 확인
db.inventory.find({tags: {$all: ["red", "blank"]}});

db.collection.find({tags: {$size: 5}}); //배열 lenth가 5인 문서


// {item: "book", tags: ["red", "blank"]}
// 잘못됨. tags의 첫번째 인자[0]가 아니라 tags 배열의 0이란 원소를 출력하라는 의미
db.collection.find({}, {"tags.10": 1});
// tags 배열의 [0], [1]을 출력하라 (앞에서 부터 2개를 출력하라)
db.collection.find({}, {tags: {$slice: 2}});
// tags 배열의 [2:3] 을 출력하라 (2부터 3개 요소 출력 - 2:인덱스번호, 3:갯수)
db.collection.find({}, {tags: {$slice: [2, 3]}});

//특정 조건에 부합하는 필드만 출력하라
db.inventory.find({}, {$elemMatch: {$regex: /^b/}}); //에러남
db.inventory.find({ tags: { $regex: /^b/ } });
db.inventory.find({ tags: { $elemMatch: { $regex: /^b/ } } });

//특정 조건에 부합하는 첫번째 데이터만 출력하라
//db.inventory.find({tags: “red”}, {“tags.$:true})