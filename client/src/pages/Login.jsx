import LoginBtn from "../buttons/LoginBtn";

export default function Login() {

    const SPOTIFY_CLIENT_ID = 'd86db55895ca45319957a258fac15a79'
    const REDIRECT_URI = "http://localhost:5173/callback"
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'code'
    const SCOPES = [
        'streaming',
        'user-read-private',
        'user-read-email',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-modify',
        'user-library-read',
        'user-follow-modify',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-top-read'
    ].join(' ');

    let scopes_encoded = SCOPES.replace(' ', '%20');

    return (
        <>
        <div className="flex w-screen h-screen justify-center items-center">
            <a href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes_encoded}&show_dialog=true`}><LoginBtn /></a>
        </div>
        </>
    )
}