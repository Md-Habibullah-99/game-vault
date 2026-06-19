function ReviewCard({
    review
}) {

    return (
        <div className="review-card">

            <div className="review-header">

                <h4>
                    {review.user}
                </h4>

                <span>
                    ⭐ {review.rating}/10
                </span>

            </div>

            <p>
                {review.comment}
            </p>

        </div>
    );
}

export default ReviewCard;