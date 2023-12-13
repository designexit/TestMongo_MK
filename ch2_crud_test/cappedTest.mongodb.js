use("testDB");
db.createCollection("cappedC", {capped:true, size:10000});
db.cappedC.insertOne({x:1});
db.cappedC.find();

// stats 조회
use("testDB");
db.cappedC.stats();

for(i = 0; 1<1000; i++) {
  db.capped.insertOne({x:1});
}

use("testDB");
db.createCollection("cappedC2", {capped:true, size:10000});
db.cappedC2.insertOne({x:1});
db.cappedC2.find();

for(i = 0; 1<1000; i++) {
  db.cappedC2.insertOne({x:1});
}

use("testDB");
db.cappedC2.stats();

//서버 상태조회
use("testDB");
//db.getCollectionInfos();
db.serverStatus();