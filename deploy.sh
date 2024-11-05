gcloud functions deploy emailSender \
  --runtime nodejs22 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars SENDGRID_API_KEY="$SENDGRID_API_KEY", SENDGRID_TO="$SENDGRID_TO", SENDGRID_FROM="$SENDGRID_FROM"