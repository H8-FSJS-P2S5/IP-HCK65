module.exports = {
  apps: [
    {
      name: "Weebify",
      script: "./bin/www",
      env: {
        NODE_ENV: "production",
        PORT: 80,
        DATABASE_URL: "postgres://postgres.qnscuvjshpjupjxbdvim:UWkL237dEehWN5rA@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
        SECRET_KEY: "Dano_Secretos",
        GOOGLE_CLIENT_ID: "954459036268-ek1eaqqd57mk1at9r09o63466foer3sb.apps.googleusercontent.com",
        JIKAN_BASE_URL: "https://api.jikan.moe/v4",
        SECRET_STRIPE_KEY: "sk_test_51OMTc9LWwKQ3c3gIK1bbWXmfocmvGDVFlWNV1GK98HDxKstZntym4BHvz7sJPWIZlSEpZ1z8RRHYPRaCgtLPbwGw00Qe6P2Ca1"
      },
    },
  ],
};
