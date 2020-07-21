#!/bin/bash


echo "push to branch master"
git push origin master


echo "start auto deploy"
ssh dockermachine@165.22.243.7 "bash auto.sh"
