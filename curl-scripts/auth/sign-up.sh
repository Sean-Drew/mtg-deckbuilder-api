#!/bin/bash

# API="http://localhost:4741"
URL_PATH="/sign-up"

curl "https://salty-bayou-84440.herokuapp.com${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "userName": "'"${USERNAME}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
