# 运行格式 ./build.sh
cp ./real.js ../config/index.js
cp ./global_real.js ../src/global.js
cd ..
npm run build

cd sh
cp ./test.js ../config/index.js
cp ./global_test.js ../src/global.js
cd ..
npm run build

cd sh
cp ./global_local.js ../src/global.js
