#!/bin/sh
COMMIT_REF=$(echo $(git rev-parse HEAD) | cut -c1-7)

# yarn run build
# aws s3 sync public s3://keycat.co/${COMMIT_REF}
aws cloudfront update-distribution --id E2HOZ8X60BG48M --default-root-object ${COMMIT_REF}/index.html