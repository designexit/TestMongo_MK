db.rating.insertMany([
  { _id: 1, rating: 1, user_id: 2 },
  { _id: 2, rating: 2, user_id: 3 },
  { _id: 3, rating: 3, user_id: 4 },
  { _id: 4, rating: 3, user_id: 1 },
  { _id: 5, rating: 4, user_id: 5 },
  { _id: 6, rating: 4, user_id: 8 },
  { _id: 7, rating: 5, user_id: 9 },
  { _id: 8, rating: 5, user_id: 10 },
  { _id: 9, rating: 5, user_id: 11 },
  { _id: 10, rating: 5, user_id: 12 },
]);

// 결과, 미리보기, 집계, 쿼리 (조건), 그룹, 집계순서
//db.rating.aggregate([{각 스테이지...},{각 스테이지...},{각 스테이지...}
db.rating.aggregate([
  {
    $match: {
      user_id: { $lte: 12 },
    },
  },
  {
    $group: {
      _id: '$rating',
      count: {
        $sum: 1,
      },
    },
  },
]);

//기본 스테이지
db.rating.aggregate([
  {
    $project: { _id: 1, rating: 1 },
  },
]);

db.rating.aggregate([
  {
    $project: { _id: 0, rating: 1, hi: 'new field' },
  },
]);

db.rating.aggregate([
  {
    //multiply 새 필드를 추가함.
    //$multiply 함수는 [요소1,요소2]: 요소1 x 요소2
    $project: {
      _id: 0,
      multiply: {
        $multiply: ['$_id', '$user_id'],
      },
    },
  },
]);

//$group안에 $sum과 비슷한 함수들이 존재,
db.rating.aggregate([
  {
    $match: {
      user_id: { $lte: 12 },
    },
  },
  {
    $group: {
      _id: '$rating',
      avg: { $avg: '$rating' },
      max: { $max: '$rating' },
      min: { $min: '$rating' },
      sum: { $sum: 1 },
    },
  },
]);

db.rating.aggregate([
  {
    $match: {
      rating: {
        $gte: 4,
      },
    },
  }, //스테이지 중하나인  match : 조건
  {
    $group: {
      _id: '$rating',
      user_ids: {
        // $push 대신에, $first, $last, $min, $max , $addToSet,
        // $avg
        $push: '$user_id', // 배열로 만들기.
      },
    },
  },
]);
//-> 평점 4 이상인 사용자의 id 들을 배열의 형태로 정리하도록 명령.

//$unwind
db.rating.aggregate([
  {
    $match: {
      rating: {
        $gte: 4,
      },
    },
  }, //스테이지 중하나인  match : 조건, 1번째  스테이지
  {
    $group: {
      _id: '$rating',
      user_ids: {
        $push: '$user_id', // 배열로 만들기. 2번째 스테이지.
      },
    },
  },
  {
    $unwind: '$user_ids',
  }, // 3번째 스테이지 , unwind 확인.
]);

//$out
db.rating.aggregate([
  {
    $group: {
      _id: '$rating',
      user_ids: {
        $push: '$user_id', // 배열로 만들기. 2번째 스테이지.
      },
    },
  },
  {
    $out: 'user_ids_by_rating', //컬렉션 이름.
  }, // out 어느 컬렉션 저장.
]);
db.user_ids_by_rating.find();

// ======== 고급 스테이지 ========
//$bucket
db.rating.aggregate([
  {
    $bucket: {
      groupBy: '$rating',
      boundaries: [2, 3, 5],
      default: 'Others', // 범위 밖의 기본값 필드의 이름.
      output: {
        count: { $sum: 1 },
        user_ids: { $push: '$user_id' }, // 배열로 나타내기.
      },
    },
  },
]);

//$facet
db.rating.aggregate([
  {
    $facet: {
      categorizedByRating: [{ $group: { _id: '$rating', count: { $sum: 1 } } }],
      'categorizedById(Auto)': [{ $bucketAuto: { groupBy: '$_id', buckets: 5 } }],
    },
  },
]);

//$lookup
db.by_month.aggregate([
  {
    $lookup: {
      from: 'area',
      localField: 'area_id',
      foreignField: '_id',
      as: 'area_data',
    },
  },
  { $limit: 1 },
]);


//$replaceRoot
db.by_month.aggregate([
  {
    $addFields: {
      'month_data.city_or_province': '$city_or_province',
      'month_data.county': '$county',
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $arrayElemAt: ['$month_data', 0],
      },
    },
  },
]);


//$sample
db.rating.aggregate([
  {
    $sample: { size: 3 },
  },
]);

//$sortByCount
db.rating.aggregate([
  {
    $sortByCount: '$rating',
  },
]);
