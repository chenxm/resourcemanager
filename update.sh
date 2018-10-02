#! /bin/bash

SCRIPT_DIR=$(cd $(dirname $0);pwd)
EGRET_CORE=$(cd "${SCRIPT_DIR}/../egret-core";pwd)
LIB_DIR=${EGRET_CORE}/tools/lib/resourcemanager


pushd ${SCRIPT_DIR}/

npm run script-publish
if ! [ -d ${LIB_DIR} ]; then
	mkdir ${LIB_DIR}
fi
cp script/out/vendor.js ${LIB_DIR}/index.js

popd




