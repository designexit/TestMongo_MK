//playground:연습장 만들기
// 전체 실행 
// 한줄 실행 
use("testBlog");
db.users.insertOne({x:1});

use("testBlog");
db.users2.insertOne({ name:"MinKyoung Kim", email:"kmk@gmail.com"});

use("testBlog");
db.users2.find();

db.users2.updateOne({name:"MinKyoung Kim"}, {$set:{ age:30}});

db.users2.findOne({name:"MinKyoung Kim"});

db.users2.findOne({"name.first":"SangYong2"});

db.users2.updateOne({"name.first":"SangYong2"}, {$set:{ "name.last":"Lee2"}});