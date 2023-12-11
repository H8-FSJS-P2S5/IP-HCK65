export default function LoginBtn(props) {
    let url = props.url
    // console.log(url);
    return (
        <>
            <a
                href={url}
                className="group relative inline-block overflow-hidden rounded border border-textLighter bg-primary  px-12 py-3 text-sm font-medium text-textDark hover:text-textDark focus:outline-none focus:ring active:bg-secondary active:text-primary"
            >
                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-secondary transition-all duration-200 group-hover:w-full" />
                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-secondary transition-all duration-200 group-hover:h-full" />
                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-secondary transition-all duration-200 group-hover:w-full" />
                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-secondary transition-all duration-200 group-hover:h-full" />
                Login with Spotify
            </a>
        </>

    )
}