#!/bin/sh

replaceAll() {
    export inputString="$1"
    export pattern="$2"
    export replacement="$3"

    echo "$inputString" | awk '{
        gsub(ENVIRON["pattern"], ENVIRON["replacement"])
        print
    }'
}

html=$(echo "PCEtLQpUaGlzIHNvdXJjZSBmaWxlIGlzIHBhcnQgb2YgdGhlIFN0YW5mb3JkIEJpb2Rlc2lnbiBEaWdpdGFsIEhlYWx0aCBTcGV6aSBXZWIgVGVtcGxhdGUgQXBwbGljYXRpb24gb3Blbi1zb3VyY2UgcHJvamVjdAoKU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTdGFuZm9yZCBVbml2ZXJzaXR5IGFuZCB0aGUgcHJvamVjdCBhdXRob3JzIChzZWUgQ09OVFJJQlVUT1JTLm1kKQoKU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVAotLT48IURPQ1RZUEUgaHRtbD48aHRtbCBsYW5nPSJlbiI+PGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8bGluayByZWw9Imljb24iIGhyZWY9Ii9mYXZpY29uLmljbyIgdHlwZT0iaW1hZ2UvaWNvIj4KICAgIDx0aXRsZT5TcGV6aSBXZWIgVGVtcGxhdGUgQXBwbGljYXRpb248L3RpdGxlPgogICAgPCEtLSB2aXRlLWVudnMgc2NyaXB0IHBsYWNlaG9sZGVyIHhLc1BtTHMzMHN3S3NkSXNWeCAtLT48c2NyaXB0IHR5cGU9Im1vZHVsZSIgY3Jvc3NvcmlnaW49IiIgc3JjPSIvYXNzZXRzL2luZGV4LURYRjViM3RqLmpzIj48L3NjcmlwdD4KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgY3Jvc3NvcmlnaW49IiIgaHJlZj0iL2Fzc2V0cy9pbmRleC1EalloeHB0UC5jc3MiPgogIDwvaGVhZD4KICA8Ym9keT4KICAgIDxkaXYgaWQ9InJvb3QiPjwvZGl2PgogIAoKPC9ib2R5PjwvaHRtbD4=" | base64 -d)

if printenv VITE_PUBLIC_FIREBASE_API_KEY &> /dev/null; then
    VITE_PUBLIC_FIREBASE_API_KEY_base64=$(printenv VITE_PUBLIC_FIREBASE_API_KEY | base64)
else
    VITE_PUBLIC_FIREBASE_API_KEY_base64="eEFwV2RSclg5OWtQclZnZ0UiQUl6YVN5RHo0VEU0RFhrZWNLaDVzQUxfWDd2ODJFM2daeEtQMm0wIgo="
fi
VITE_PUBLIC_FIREBASE_API_KEY=${VITE_PUBLIC_FIREBASE_API_KEY:-$(echo "QUl6YVN5RHo0VEU0RFhrZWNLaDVzQUxfWDd2ODJFM2daeEtQMm0wCg==" | base64 -d)}
if printenv VITE_PUBLIC_FIREBASE_APP_ID &> /dev/null; then
    VITE_PUBLIC_FIREBASE_APP_ID_base64=$(printenv VITE_PUBLIC_FIREBASE_APP_ID | base64)
else
    VITE_PUBLIC_FIREBASE_APP_ID_base64="eEFwV2RSclg5OWtQclZnZ0UiMTo2NjIyMTM1NDg1MDg6d2ViOjI1NTQ4OTkxMjY0ZmJmMjdlOGQ3MTkiCg=="
fi
VITE_PUBLIC_FIREBASE_APP_ID=${VITE_PUBLIC_FIREBASE_APP_ID:-$(echo "MTo2NjIyMTM1NDg1MDg6d2ViOjI1NTQ4OTkxMjY0ZmJmMjdlOGQ3MTkK" | base64 -d)}
if printenv VITE_PUBLIC_FIREBASE_AUTH_DOMAIN &> /dev/null; then
    VITE_PUBLIC_FIREBASE_AUTH_DOMAIN_base64=$(printenv VITE_PUBLIC_FIREBASE_AUTH_DOMAIN | base64)
else
    VITE_PUBLIC_FIREBASE_AUTH_DOMAIN_base64="eEFwV2RSclg5OWtQclZnZ0Uic3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYuZmlyZWJhc2VhcHAuY29tIgo="
fi
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=${VITE_PUBLIC_FIREBASE_AUTH_DOMAIN:-$(echo "c3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYuZmlyZWJhc2VhcHAuY29tCg==" | base64 -d)}
if printenv VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &> /dev/null; then
    VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_base64=$(printenv VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | base64)
else
    VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_base64="eEFwV2RSclg5OWtQclZnZ0UiNjYyMjEzNTQ4NTA4Igo="
fi
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:-$(echo "NjYyMjEzNTQ4NTA4Cg==" | base64 -d)}
if printenv VITE_PUBLIC_FIREBASE_PROJECT_ID &> /dev/null; then
    VITE_PUBLIC_FIREBASE_PROJECT_ID_base64=$(printenv VITE_PUBLIC_FIREBASE_PROJECT_ID | base64)
else
    VITE_PUBLIC_FIREBASE_PROJECT_ID_base64="eEFwV2RSclg5OWtQclZnZ0Uic3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYiCg=="
fi
VITE_PUBLIC_FIREBASE_PROJECT_ID=${VITE_PUBLIC_FIREBASE_PROJECT_ID:-$(echo "c3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYK" | base64 -d)}
if printenv VITE_PUBLIC_FIREBASE_STORAGE_BUCKET &> /dev/null; then
    VITE_PUBLIC_FIREBASE_STORAGE_BUCKET_base64=$(printenv VITE_PUBLIC_FIREBASE_STORAGE_BUCKET | base64)
else
    VITE_PUBLIC_FIREBASE_STORAGE_BUCKET_base64="eEFwV2RSclg5OWtQclZnZ0Uic3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYuYXBwc3BvdC5jb20iCg=="
fi
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=${VITE_PUBLIC_FIREBASE_STORAGE_BUCKET:-$(echo "c3RhbmZvcmQtYmRoZy1lbmdhZ2UtaGYuYXBwc3BvdC5jb20K" | base64 -d)}
if printenv VITE_PUBLIC_EMULATOR &> /dev/null; then
    VITE_PUBLIC_EMULATOR_base64=$(printenv VITE_PUBLIC_EMULATOR | base64)
else
    VITE_PUBLIC_EMULATOR_base64="eEFwV2RSclg5OWtQclZnZ0UidHJ1ZSIK"
fi
VITE_PUBLIC_EMULATOR=${VITE_PUBLIC_EMULATOR:-$(echo "dHJ1ZQo=" | base64 -d)}
BASE_URL_base64="eEFwV2RSclg5OWtQclZnZ0UiLyIK"
BASE_URL=$(echo "Lwo=" | base64 -d)
MODE_base64="eEFwV2RSclg5OWtQclZnZ0UicHJvZHVjdGlvbiIK"
MODE=$(echo "cHJvZHVjdGlvbgo=" | base64 -d)
DEV_base64="eEFwV2RSclg5OWtQclZnZ0VmYWxzZQo="
DEV=$(echo "ZmFsc2UK" | base64 -d)
PROD_base64="eEFwV2RSclg5OWtQclZnZ0V0cnVlCg=="
PROD=$(echo "dHJ1ZQo=" | base64 -d)

processedHtml="$html"

processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_API_KEY%" "VITE_PUBLIC_FIREBASE_API_KEYxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_APP_ID%" "VITE_PUBLIC_FIREBASE_APP_IDxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_AUTH_DOMAIN%" "VITE_PUBLIC_FIREBASE_AUTH_DOMAINxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID%" "VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_IDxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_PROJECT_ID%" "VITE_PUBLIC_FIREBASE_PROJECT_IDxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_FIREBASE_STORAGE_BUCKET%" "VITE_PUBLIC_FIREBASE_STORAGE_BUCKETxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%VITE_PUBLIC_EMULATOR%" "VITE_PUBLIC_EMULATORxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%BASE_URL%" "BASE_URLxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%MODE%" "MODExPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%DEV%" "DEVxPsZs9swrPvxYpC")
processedHtml=$(replaceAll "$processedHtml" "%PROD%" "PRODxPsZs9swrPvxYpC")

processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_API_KEYxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_API_KEY")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_APP_IDxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_APP_ID")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_AUTH_DOMAINxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_AUTH_DOMAIN")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_IDxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_PROJECT_IDxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_PROJECT_ID")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_FIREBASE_STORAGE_BUCKETxPsZs9swrPvxYpC" "$VITE_PUBLIC_FIREBASE_STORAGE_BUCKET")
processedHtml=$(replaceAll "$processedHtml" "VITE_PUBLIC_EMULATORxPsZs9swrPvxYpC" "$VITE_PUBLIC_EMULATOR")
processedHtml=$(replaceAll "$processedHtml" "BASE_URLxPsZs9swrPvxYpC" "$BASE_URL")
processedHtml=$(replaceAll "$processedHtml" "MODExPsZs9swrPvxYpC" "$MODE")
processedHtml=$(replaceAll "$processedHtml" "DEVxPsZs9swrPvxYpC" "$DEV")
processedHtml=$(replaceAll "$processedHtml" "PRODxPsZs9swrPvxYpC" "$PROD")

json=""
json="$json{"
json="$json\"VITE_PUBLIC_FIREBASE_API_KEY\":\`$VITE_PUBLIC_FIREBASE_API_KEY_base64\`,"
json="$json\"VITE_PUBLIC_FIREBASE_APP_ID\":\`$VITE_PUBLIC_FIREBASE_APP_ID_base64\`,"
json="$json\"VITE_PUBLIC_FIREBASE_AUTH_DOMAIN\":\`$VITE_PUBLIC_FIREBASE_AUTH_DOMAIN_base64\`,"
json="$json\"VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\":\`$VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_base64\`,"
json="$json\"VITE_PUBLIC_FIREBASE_PROJECT_ID\":\`$VITE_PUBLIC_FIREBASE_PROJECT_ID_base64\`,"
json="$json\"VITE_PUBLIC_FIREBASE_STORAGE_BUCKET\":\`$VITE_PUBLIC_FIREBASE_STORAGE_BUCKET_base64\`,"
json="$json\"VITE_PUBLIC_EMULATOR\":\`$VITE_PUBLIC_EMULATOR_base64\`,"
json="$json\"BASE_URL\":\`$BASE_URL_base64\`,"
json="$json\"MODE\":\`$MODE_base64\`,"
json="$json\"DEV\":\`$DEV_base64\`,"
json="$json\"PROD\":\`$PROD_base64\`"
json="$json}"

script="
    <script data-script-description=\"Environment variables injected by vite-envs\">
      var envWithValuesInBase64 = $json;
      var env = {};
      Object.keys(envWithValuesInBase64).forEach(function (name) {
        const value = new TextDecoder().decode(
          Uint8Array.from(
            atob(envWithValuesInBase64[name]),
            c => c.charCodeAt(0))
        ).slice(0,-1);
        env[name] = value.startsWith(\"xApWdRrX99kPrVggE\") ? JSON.parse(value.slice(\"xApWdRrX99kPrVggE\".length)) : value;
      });
      window.__VITE_ENVS = env;
    </script>"

scriptPlaceholder="<!-- vite-envs script placeholder xKsPmLs30swKsdIsVx -->"

processedHtml=$(replaceAll "$processedHtml" "$scriptPlaceholder" "$script")

DIR=$(cd "$(dirname "$0")" && pwd)

echo "$processedHtml" > "$DIR/index.html"

swEnv_script="
const envWithValuesInBase64 = $json;
const env = {};
Object.keys(envWithValuesInBase64).forEach(function (name) {
  const value = new TextDecoder().decode(
    Uint8Array.from(
      atob(envWithValuesInBase64[name]),
      c => c.charCodeAt(0))
  ).slice(0,-1);
  env[name] = value.startsWith(\"xApWdRrX99kPrVggE\") ? JSON.parse(value.slice(\"xApWdRrX99kPrVggE\".length)) : value;
});
self.__VITE_ENVS = env;
"

echo "$swEnv_script" > "$DIR/swEnv.js" || echo "Not enough permissions to write to $DIR/swEnv.js"
