db.stores.getIndexes();

db.employees.getIndexes(); //# Single-key 인덱스
db.employees.createIndex({empno:1});
db.employees.createIndex({empno:1, deptno:-1}); //# Compound 인덱스
db.employees.getIndexes();
db.employees.createIndex({deptno:1});
db.employees.find({deptno:10}).pretty();
db.employees.find({deptno:10}).explain();
db.employees.find({deptno:10}).sort({empno:-1});
db.employees.find({deptno:10}).sort({empno:-1}).explain();
db.employees.dropIndex({empno:1});

//샘플 코드
db.employees.insertMany([
  {
    empno: 101,
    deptno: 10,
    ename: "John Smith",
    salary: 60000,
    hiredate: "2022-03-15",
    comm: 2000,
  },
  {
    empno: 102,
    deptno: 20,
    ename: "Alice Johnson",
    salary: 55000,
    hiredate: "2021-11-28",
    comm: 1500,
  },
  {
    empno: 103,
    deptno: 10,
    ename: "Emily Davis",
    salary: 62000,
    hiredate: "2023-01-10",
    comm: 1800,
  },
  {
    empno: 104,
    deptno: 30,
    ename: "Michael Wilson",
    salary: 58000,
    hiredate: "2022-07-02",
    comm: 1600,
  },
  {
    empno: 105,
    deptno: 20,
    ename: "Sophia Martinez",
    salary: 59000,
    hiredate: "2021-09-05",
    comm: 1700,
  },
  {
    empno: 106,
    deptno: 30,
    ename: "James Brown",
    salary: 57000,
    hiredate: "2022-05-20",
    comm: 1400,
  },
  {
    empno: 107,
    deptno: 40,
    ename: "Olivia Lee",
    salary: 61000,
    hiredate: "2023-02-18",
    comm: 1900,
  },
  {
    empno: 108,
    deptno: 40,
    ename: "William Anderson",
    salary: 54000,
    hiredate: "2021-12-04",
    comm: 1300,
  },
  {
    empno: 109,
    deptno: 20,
    ename: "Liam Clark",
    salary: 63000,
    hiredate: "2022-08-12",
    comm: 2200,
  },
  {
    empno: 110,
    deptno: 10,
    ename: "Ava Rodriguez",
    salary: 57000,
    hiredate: "2023-04-07",
    comm: 1600,
  },
]);

// 좌표 관련 , 인덱스 이용해서 검색 해보기.
db.users.insertOne({ x: 1 });
// GeoSpatial INDEX
for (var i = 0; i < 100; i++) {
  db.spatial.insert({ pos: [i % 10, Math.floor(i / 10)] });
}
db.spatial.ensureIndex({ pos: "2d" });
db.spatial.find({ pos: { $near: [5, 5] } }, { _id: 0 }).limit(5);
//CENTER
db.spatial.find({ pos: { $within: { $center: [[5, 5], 2] } } }, { _id: 0 });
//BOX
db.spatial.find(
  {
    pos: {
      $within: {
        $box: [
          [5, 5],
          [6, 6],
        ],
      },
    },
  },
  { _id: 0 }
);
//POLYGON
db.spatial.find(
  {
    pos: {
      $within: {
        $polygon: [
          [3, 4],
          [5, 7],
          [7, 4],
        ],
      },
    },
  },
  { _id: 0 }
);
//Multi-Location Documents 검색 예:
db.tel_pos.insert({
  mobile_no: "01038631858",
  last_pos: [
    [127.0945116, 37.535397],
    [126.9815316, 37.5685375],
    [127.0305035, 37.5017141],
  ],
});
db.tel_pos.insert({
  mobile_no: "01075993678",
  last_pos: [
    [127.1353452, 37.4576521],
    [127.1359081, 37.4512311],
    [125.7823091, 36.3339801],
  ],
});
db.tel_pos.insert({
  mobile_no: "01071229021",
  last_pos: [
    [126.3411234, 36.1098761],
    [124.3410922, 37.3409901],
    [127.2223331, 37.091209],
  ],
});
db.tel_pos.ensureIndex({ last_pos: "2d" });
db.tel_pos
  .find(
    {
      last_pos: {
        $within: { $centerSphere: [[127.0352915, 37.5360206], 30 / 3963] },
      },
    },
    { _id: 0, mobile_no: 1, last_pos: 1 }
  )
  .pretty();