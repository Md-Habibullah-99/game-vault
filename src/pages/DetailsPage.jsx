import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import "./DetailsPage.css";

const STATUS_OPTIONS = ["Played", "Playing", "Wishlist"];

function DetailsPage({ game, username, canTrack, onBack, onUpdateGameMeta }) {
    const [reviews, setReviews] = useState(game.reviews || []);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(10);

    const [status, setStatus] = useState(game.status || "Wishlist");
    const [playtime, setPlaytime] = useState(game.playtime || "");
    const [saveNote, setSaveNote] = useState("");

    useEffect(() => {
        setStatus(game.status || "Wishlist");
        setPlaytime(game.playtime || "");
        setSaveNote("");
    }, [game]);

    const platforms = (game.platforms || game.platform || "")
        .toString()
        .split(/\/|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    const genreLabel = (game.genres || [game.genre]).join(" · ");

    const averageUserScore =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
              ).toFixed(1)
            : "—";

    // Distribution of review scores into Negative / Mixed / Positive buckets,
    // used to render the rating bar above the review list.
    const scoreBuckets = { negative: 0, mixed: 0, positive: 0 };
    reviews.forEach((review) => {
        if (review.rating <= 4) scoreBuckets.negative += 1;
        else if (review.rating <= 7) scoreBuckets.mixed += 1;
        else scoreBuckets.positive += 1;
    });
    const totalReviews = reviews.length;
    const pct = (count) =>
        totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

    const recommendationLabel =
        totalReviews === 0
            ? "No reviews yet"
            : pct(scoreBuckets.positive) >= 70
            ? "Mostly Positive"
            : pct(scoreBuckets.negative) >= 50
            ? "Mostly Negative"
            : "Mixed";

    const addReview = () => {
        if (!comment.trim()) return;

        const newReview = {
            id: Date.now(),
            user: username,
            rating: rating,
            comment: comment,
        };

        setReviews([newReview, ...reviews]);
        setComment("");
        setRating(10);
    };

    const savePreferences = () => {
        if (!canTrack) {
            return;
        }

        const cleanedPlaytime = playtime.trim();

        onUpdateGameMeta(game.id, {
            status,
            playtime: cleanedPlaytime
        });

        setSaveNote("Saved");
    };

    return (
        <div className="dp">
            <button onClick={onBack} className="dp-back">
                <svg viewBox="0 0 24 24" className="dp-back-icon" aria-hidden="true">
                    <path
                        d="M15 18l-6-6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back to Library
            </button>

            <section className="dp-hero">
                <img src={game.image} alt="" className="dp-hero-bg" />
                <div className="dp-hero-scrim" />

                <div className="dp-hero-content">
                    <p className="dp-eyebrow">
                        {genreLabel} · {game.year}
                    </p>
                    <h1 className="dp-title">{game.title}</h1>
                    <p className="dp-tagline">{game.description}</p>

                    <div className="dp-tag-row">
                        <span className="dp-tag">ESRB {game.esrb}</span>
                        {platforms.map((platform) => (
                            <span key={platform} className="dp-tag">
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="dp-kpi-strip">
                    <article className="dp-kpi dp-kpi--critic">
                        <p className="dp-kpi-label">Critic score</p>
                        <p className="dp-kpi-value">
                            {game.rating}
                            <span className="dp-kpi-unit">/10</span>
                        </p>
                    </article>
                    <article className="dp-kpi dp-kpi--user">
                        <p className="dp-kpi-label">User score</p>
                        <p className="dp-kpi-value">
                            {averageUserScore}
                            {averageUserScore !== "—" && (
                                <span className="dp-kpi-unit">/10</span>
                            )}
                        </p>
                    </article>
                    <article className="dp-kpi">
                        <p className="dp-kpi-label">Playtime</p>
                        <p className="dp-kpi-value dp-kpi-value--text">
                            {game.playtime}
                        </p>
                    </article>
                    <article className="dp-kpi">
                        <p className="dp-kpi-label">Platforms</p>
                        <p className="dp-kpi-value">{platforms.length}</p>
                    </article>
                </div>
            </section>

            <section className="dp-grid">
                <div className="dp-main">
                    <section className="dp-panel">
                        <h2 className="dp-heading">About this game</h2>
                        <p className="dp-body-text">{game.description}</p>
                    </section>

                    <section className="dp-panel">
                        <h2 className="dp-heading">System requirements</h2>
                        <dl className="dp-req-grid">
                            <div className="dp-req-item">
                                <dt>OS</dt>
                                <dd>{game.reqs.os}</dd>
                            </div>
                            <div className="dp-req-item">
                                <dt>Processor</dt>
                                <dd>{game.reqs.cpu}</dd>
                            </div>
                            <div className="dp-req-item">
                                <dt>Graphics</dt>
                                <dd>{game.reqs.gpu}</dd>
                            </div>
                            <div className="dp-req-item">
                                <dt>Memory</dt>
                                <dd>{game.reqs.ram}</dd>
                            </div>
                            <div className="dp-req-item">
                                <dt>Storage</dt>
                                <dd>{game.reqs.storage}</dd>
                            </div>
                        </dl>
                    </section>
                </div>

                <aside className="dp-rail">
                    <h3 className="dp-rail-heading">Game info</h3>
                    <dl className="dp-info-list">
                        <div>
                            <dt>Developer</dt>
                            <dd>{game.developer}</dd>
                        </div>
                        <div>
                            <dt>Publisher</dt>
                            <dd>{game.publisher}</dd>
                        </div>
                        <div>
                            <dt>Release year</dt>
                            <dd>{game.year}</dd>
                        </div>
                        <div>
                            <dt>Genre</dt>
                            <dd>{genreLabel}</dd>
                        </div>
                        <div>
                            <dt>ESRB rating</dt>
                            <dd>{game.esrb}</dd>
                        </div>
                        <div>
                            <dt>Playtime</dt>
                            <dd>{game.playtime}</dd>
                        </div>
                    </dl>

                    <div className="dp-rail-divider" />

                    <p className="dp-rail-heading">My tracking</p>

                    {canTrack ? (
                        <div className="dp-edit-grid">
                            <label className="dp-edit-label" htmlFor="game-status">
                                Status
                            </label>
                            <select
                                id="game-status"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                className="dp-edit-input"
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>

                            <label className="dp-edit-label" htmlFor="game-playtime">
                                Playtime
                            </label>
                            <input
                                id="game-playtime"
                                type="text"
                                value={playtime}
                                onChange={(event) => setPlaytime(event.target.value)}
                                className="dp-edit-input"
                                placeholder="e.g. 48h"
                            />

                            <button type="button" className="dp-save-btn" onClick={savePreferences}>
                                Save tracking
                            </button>

                            {saveNote && <p className="dp-save-note">{saveNote}</p>}
                        </div>
                    ) : (
                        <p className="dp-track-note">
                            Add this game to your Vault to unlock tracking options.
                        </p>
                    )}

                    <div className="dp-rail-divider" />

                    <p className="dp-rail-heading">Available on</p>
                    <div className="dp-platform-chips">
                        {platforms.length === 0 ? (
                            <span className="dp-platform-chip">No platform set</span>
                        ) : (
                            platforms.map((platform) => (
                                <span key={platform} className="dp-platform-chip">
                                    {platform}
                                </span>
                            ))
                        )}
                    </div>
                </aside>
            </section>

            <section className="dp-reviews">
                <div className="dp-reviews-header">
                    <h2 className="dp-heading">User reviews</h2>
                    {totalReviews > 0 && (
                        <span className="dp-review-count">
                            {totalReviews} review{totalReviews === 1 ? "" : "s"}
                        </span>
                    )}
                </div>

                {totalReviews > 0 && (
                    <div className="dp-rating-summary">
                        <p className="dp-rating-summary-label">
                            {recommendationLabel}
                        </p>
                        <div className="dp-rating-bar">
                            <div
                                className="dp-rating-bar-segment dp-rating-bar-segment--positive"
                                style={{ width: `${pct(scoreBuckets.positive)}%` }}
                            />
                            <div
                                className="dp-rating-bar-segment dp-rating-bar-segment--mixed"
                                style={{ width: `${pct(scoreBuckets.mixed)}%` }}
                            />
                            <div
                                className="dp-rating-bar-segment dp-rating-bar-segment--negative"
                                style={{ width: `${pct(scoreBuckets.negative)}%` }}
                            />
                        </div>
                        <div className="dp-rating-legend">
                            <span>
                                <i className="dp-dot dp-dot--positive" />
                                Positive ({pct(scoreBuckets.positive)}%)
                            </span>
                            <span>
                                <i className="dp-dot dp-dot--mixed" />
                                Mixed ({pct(scoreBuckets.mixed)}%)
                            </span>
                            <span>
                                <i className="dp-dot dp-dot--negative" />
                                Negative ({pct(scoreBuckets.negative)}%)
                            </span>
                        </div>
                    </div>
                )}

                <div className="dp-review-form">
                    <p className="dp-rail-heading">Write a review</p>

                    <div className="dp-review-form-row">
                        <label htmlFor="rating" className="dp-review-label">
                            Your rating
                        </label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="dp-select"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num} / 10
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        placeholder="Share your thoughts about this game..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="dp-textarea"
                    />

                    <button onClick={addReview} className="dp-submit-btn">
                        Post review
                    </button>
                </div>

                <div className="dp-review-list">
                    {totalReviews === 0 ? (
                        <p className="dp-review-empty">
                            No reviews yet — be the first to share your thoughts.
                        </p>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

export default DetailsPage;