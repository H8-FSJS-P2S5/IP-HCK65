export default function CardContents(props) {
  const { anime, handleShowDetail } = props;
  // console.log(lodging, "SSSSSSSSSSSS");
  return (
    <>
      <div
        className="card card-compact w-72 bg-base-100 shadow-xl"
        style={{ backgroundColor: "#211818" }}
        key={anime.mal_id}
      >
        <figure>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{anime.title}</h2>
          <h2 className="card-title">{anime.title_japanese}</h2>
          <p className="limited-lines">{anime.synopsis}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-info"
              id="btn-detail"
              onClick={handleShowDetail}
              value={anime.mal_id}
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
