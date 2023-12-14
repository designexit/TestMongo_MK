// 기본 유효성 체크 확인 샘플
db.createCollection("emp", {
  validator: {
    $and: [{ empno: { $type: "string" } }, { deptno: { $in: [10, 20, 30] } }],
  },
});
db.emp.insert({ empno: "1111", ename: "JMJOO", deptno: 10 });
db.emp.insert({ empno: "1112", ename: "JMJOO", deptno: 20 });
db.emp.insert({ empno: "1113", ename: "JMJOO", deptno: 30 });
db.emp.insert({ empno: "1114", ename: "JMJOO", deptno: 40 });
db.createCollection("emp2", {
  validator: {
    $and: [
      { empno: { $type: "int" } },
      { ename: { $type: "string" } },
      { job: { $type: "string" } },
      { sal: { $type: "int" } },
      { hiredate: { $type: "date" } },
      { deptno: { $type: "int" } },
      { deptno: { $in: [10, 20, 30] } },
    ],
  },
});
db.emp2.insert({
  empno: 1111,
  ename: "JMJOO",
  job: "MANAGER",
  sal: 1200,
  hiredate: ISODate(),
  deptno: 10,
});
db.emp2.insert({
  empno: 2222,
  ename: "JMJ",
  job: "MANAGER",
  sal: 1200,
  hiredate: ISODate(),
  deptno: 40,
});
